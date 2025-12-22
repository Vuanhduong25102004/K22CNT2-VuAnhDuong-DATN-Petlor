import React, { useState, useEffect } from "react";
import useEscapeKey from "../../../../../hooks/useEscapeKey";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency } from "../../../../../utils/formatters";

const ImportFormModal = ({
  isOpen,
  onClose,
  suppliersList,
  productsList,
  categoriesList,
  onSubmit,
}) => {
  // --- State ---
  const [formData, setFormData] = useState({ nccId: "", ghiChu: "" });
  const [importDetails, setImportDetails] = useState([]);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // State dòng nhập liệu hiện tại
  const [currentLine, setCurrentLine] = useState({
    sanPhamId: "",
    tenSanPham: "",
    danhMucId: "",
    giaBan: 0,
    moTaChiTiet: "",
    soLuong: 1,
    giaNhap: 0,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({ nccId: "", ghiChu: "" });
      setImportDetails([]);
      resetCurrentLine();
    }
  }, [isOpen]);

  const resetCurrentLine = () => {
    setCurrentLine({
      sanPhamId: "",
      tenSanPham: "",
      danhMucId: "",
      giaBan: 0,
      moTaChiTiet: "",
      soLuong: 1,
      giaNhap: 0,
    });
    setIsNewProduct(false);
  };

  const handleMasterChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLineChange = (e) => {
    const { name, value } = e.target;
    if (name === "sanPhamId" && !isNewProduct) {
      const selected = productsList.find(
        (p) => p.sanPhamId === parseInt(value)
      );
      setCurrentLine((prev) => ({
        ...prev,
        sanPhamId: value,
        tenSanPham: selected ? selected.tenSanPham : "",
      }));
    } else {
      setCurrentLine((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddLine = () => {
    if (currentLine.soLuong <= 0 || currentLine.giaNhap <= 0) {
      alert("Số lượng và Giá nhập phải lớn hơn 0");
      return;
    }

    let newLineItem = {};
    if (isNewProduct) {
      if (
        !currentLine.tenSanPham ||
        !currentLine.danhMucId ||
        !currentLine.giaBan
      ) {
        alert("Vui lòng nhập đủ Tên, Danh mục và Giá bán cho SP mới");
        return;
      }
      newLineItem = {
        sanPhamId: null,
        isNew: true,
        tenSanPham: currentLine.tenSanPham,
        danhMucId: parseInt(currentLine.danhMucId),
        giaBan: parseFloat(currentLine.giaBan),
        moTaChiTiet: currentLine.moTaChiTiet,
        soLuong: parseInt(currentLine.soLuong),
        giaNhap: parseFloat(currentLine.giaNhap),
        thanhTien:
          parseInt(currentLine.soLuong) * parseFloat(currentLine.giaNhap),
      };
    } else {
      if (!currentLine.sanPhamId) {
        alert("Vui lòng chọn sản phẩm");
        return;
      }
      newLineItem = {
        sanPhamId: parseInt(currentLine.sanPhamId),
        isNew: false,
        tenSanPham: currentLine.tenSanPham,
        soLuong: parseInt(currentLine.soLuong),
        giaNhap: parseFloat(currentLine.giaNhap),
        thanhTien:
          parseInt(currentLine.soLuong) * parseFloat(currentLine.giaNhap),
      };
    }
    setImportDetails([...importDetails, newLineItem]);
    resetCurrentLine();
  };

  const handleRemoveLine = (index) => {
    const newDetails = [...importDetails];
    newDetails.splice(index, 1);
    setImportDetails(newDetails);
  };

  const handleSubmit = () => {
    if (!formData.nccId || importDetails.length === 0) {
      alert("Vui lòng chọn NCC và thêm ít nhất 1 sản phẩm");
      return;
    }
    const payload = {
      nccId: parseInt(formData.nccId),
      nhanVienId: 1, // Hardcode tạm hoặc lấy từ context
      ghiChu: formData.ghiChu,
      chiTietList: importDetails,
    };
    onSubmit(payload);
  };

  const totalAmount = importDetails.reduce(
    (sum, item) => sum + item.thanhTien,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="w-full max-w-6xl bg-white rounded-2xl shadow-modal flex flex-col max-h-[95vh] relative overflow-hidden font-body mx-auto my-8"
          >
            {/* Header (Giống AdminAppointments) */}
            <div className="px-10 py-6 border-b border-border-light/50 flex justify-between items-center bg-white sticky top-0 z-20">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-surface border border-border-light flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">
                    move_to_inbox
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-text-heading">
                    Tạo Phiếu Nhập Hàng
                  </h1>
                  <p className="text-sm text-text-body/70 mt-1 font-light">
                    Nhập hàng vào kho từ nhà cung cấp
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:bg-surface transition-all"
              >
                <span className="material-symbols-outlined font-light">
                  close
                </span>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-8 md:p-10 bg-white overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Cột Trái: Form Nhập */}
                <div className="lg:col-span-4 space-y-8">
                  {/* Panel NCC */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-xl">
                        store
                      </span>
                      <h3 className="text-md font-semibold text-text-heading">
                        Thông tin chung
                      </h3>
                    </div>
                    <div className="input-group">
                      <label className="form-label block text-sm font-medium text-text-heading mb-2">
                        Nhà cung cấp <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="nccId"
                        value={formData.nccId}
                        onChange={handleMasterChange}
                        className="form-control w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      >
                        <option value="">-- Chọn NCC --</option>
                        {suppliersList.map((ncc) => (
                          <option key={ncc.nccId} value={ncc.nccId}>
                            {ncc.tenNcc}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="input-group">
                      <label className="form-label block text-sm font-medium text-text-heading mb-2">
                        Ghi chú
                      </label>
                      <textarea
                        name="ghiChu"
                        value={formData.ghiChu}
                        onChange={handleMasterChange}
                        className="form-control w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg h-20"
                        placeholder="Ghi chú phiếu nhập..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 my-4"></div>

                  {/* Panel Sản phẩm */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-orange-500 text-xl">
                          inventory_2
                        </span>
                        <h3 className="text-md font-semibold text-text-heading">
                          Sản phẩm
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          setIsNewProduct(!isNewProduct);
                          resetCurrentLine();
                        }}
                        className={`text-xs px-3 py-1 rounded-full font-medium transition-colors border ${
                          isNewProduct
                            ? "bg-blue-50 text-blue-600 border-blue-200"
                            : "bg-gray-50 text-gray-600 border-gray-200"
                        }`}
                      >
                        {isNewProduct ? "Quay lại" : "+ SP Mới"}
                      </button>
                    </div>

                    {/* Form SP */}
                    <div className="p-4 rounded-xl bg-surface border border-border-light space-y-3">
                      {!isNewProduct ? (
                        <div>
                          <label className="text-xs font-medium text-text-heading mb-1 block">
                            Chọn SP có sẵn
                          </label>
                          <select
                            name="sanPhamId"
                            value={currentLine.sanPhamId}
                            onChange={handleLineChange}
                            className="w-full p-2 text-sm border rounded-lg"
                          >
                            <option value="">-- Tìm kiếm --</option>
                            {productsList.map((p) => (
                              <option key={p.sanPhamId} value={p.sanPhamId}>
                                {p.tenSanPham}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="space-y-2 animate-fadeIn">
                          <input
                            type="text"
                            name="tenSanPham"
                            value={currentLine.tenSanPham}
                            onChange={handleLineChange}
                            placeholder="Tên sản phẩm mới *"
                            className="w-full p-2 text-sm border rounded-lg"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <select
                              name="danhMucId"
                              value={currentLine.danhMucId}
                              onChange={handleLineChange}
                              className="w-full p-2 text-sm border rounded-lg"
                            >
                              <option value="">Danh mục *</option>
                              {categoriesList.map((c) => (
                                <option
                                  key={c.danhMucId || c.id}
                                  value={c.danhMucId || c.id}
                                >
                                  {c.tenDanhMuc}
                                </option>
                              ))}
                            </select>
                            <input
                              type="number"
                              name="giaBan"
                              value={currentLine.giaBan}
                              onChange={handleLineChange}
                              placeholder="Giá bán *"
                              className="w-full p-2 text-sm border rounded-lg"
                            />
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-text-heading mb-1 block">
                            Số lượng
                          </label>
                          <input
                            type="number"
                            name="soLuong"
                            min="1"
                            value={currentLine.soLuong}
                            onChange={handleLineChange}
                            className="w-full p-2 text-sm border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-text-heading mb-1 block">
                            Giá nhập
                          </label>
                          <input
                            type="number"
                            name="giaNhap"
                            min="0"
                            value={currentLine.giaNhap}
                            onChange={handleLineChange}
                            className="w-full p-2 text-sm border rounded-lg"
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleAddLine}
                        className="w-full py-2 bg-white border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-all shadow-sm"
                      >
                        Thêm vào danh sách
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cột Phải: Bảng Preview */}
                <div className="lg:col-span-8 flex flex-col h-full bg-surface/30 rounded-xl border border-border-light overflow-hidden">
                  <div className="p-4 border-b border-border-light bg-white flex justify-between items-center">
                    <span className="font-semibold text-text-heading text-sm">
                      Danh sách ({importDetails.length})
                    </span>
                    <span className="text-primary font-bold text-lg">
                      {formatCurrency(totalAmount)}
                    </span>
                  </div>
                  <div className="flex-1 overflow-auto bg-white">
                    <table className="w-full text-left">
                      <thead className="bg-surface sticky top-0 z-10 text-xs text-text-body uppercase font-medium">
                        <tr>
                          <th className="p-3">Sản phẩm</th>
                          <th className="p-3 text-center">SL</th>
                          <th className="p-3 text-right">Giá nhập</th>
                          <th className="p-3 text-right">Thành tiền</th>
                          <th className="p-3 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {importDetails.map((item, index) => (
                          <tr
                            key={index}
                            className="hover:bg-surface transition-colors"
                          >
                            <td className="p-3 text-sm font-medium text-text-heading">
                              {item.tenSanPham}
                              {item.isNew && (
                                <span className="ml-2 text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded border border-blue-200">
                                  Mới
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-sm text-center">
                              {item.soLuong}
                            </td>
                            <td className="p-3 text-sm text-right text-text-body">
                              {formatCurrency(item.giaNhap)}
                            </td>
                            <td className="p-3 text-sm text-right font-medium text-primary">
                              {formatCurrency(item.thanhTien)}
                            </td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => handleRemoveLine(index)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <span className="material-symbols-outlined text-lg">
                                  delete
                                </span>
                              </button>
                            </td>
                          </tr>
                        ))}
                        {importDetails.length === 0 && (
                          <tr>
                            <td
                              colSpan="5"
                              className="p-8 text-center text-gray-400 text-sm"
                            >
                              Chưa có sản phẩm nào.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-10 py-6 bg-white border-t border-border-light/50 flex justify-end gap-4 sticky bottom-0 z-20">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-text-body hover:bg-surface border border-transparent hover:border-border-light transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-2.5 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-hover shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-[18px]">
                  check
                </span>{" "}
                Hoàn tất nhập hàng
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImportFormModal;
