import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import postService from "../../../services/postService";
import { formatDate } from "../../admin/components/utils";

const CustomToast = ({ closeToast, title, message, type }) => {
  const isSuccess = type === "success";
  const icon = isSuccess ? "check_circle" : "error";
  const iconColor = isSuccess ? "text-[#2a9d90]" : "text-red-500";
  const titleColor = isSuccess ? "text-[#2a9d90]" : "text-red-600";
  const bgColor = isSuccess ? "bg-[#2a9d90]/5" : "bg-red-50";

  return (
    <div className="flex items-start gap-4 w-full">
      <div
        className={`shrink-0 size-10 rounded-full flex items-center justify-center ${bgColor}`}
      >
        <span className={`material-symbols-outlined text-[24px] ${iconColor}`}>
          {icon}
        </span>
      </div>
      <div className="flex-1 pt-1">
        <h4 className={`text-sm font-extrabold ${titleColor} mb-1`}>{title}</h4>
        <p className="text-xs font-bold text-[#101918]/80 leading-relaxed">
          {message}
        </p>
      </div>
      <button
        onClick={closeToast}
        className="text-gray-400 hover:text-gray-600 transition-colors pt-1"
      >
        <span className="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>
  );
};

const ToastConfirm = ({ message, onConfirm, closeToast }) => (
  <div className="flex flex-col w-full">
    <div className="flex items-start gap-4 mb-3">
      <div className="shrink-0 size-10 rounded-full flex items-center justify-center bg-[#2a9d90]/5">
        <span className="material-symbols-outlined text-[24px] text-[#2a9d90]">
          help
        </span>
      </div>
      <div className="flex-1 pt-1">
        <h4 className="text-sm font-extrabold text-[#2a9d90] mb-1">Xác nhận</h4>
        <p className="text-xs font-bold text-[#101918]/80 leading-relaxed">
          {message}
        </p>
      </div>
    </div>
    <div className="flex justify-end gap-2 pl-14">
      <button
        onClick={closeToast}
        className="px-3 py-1.5 text-xs font-bold text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Hủy bỏ
      </button>
      <button
        onClick={() => {
          onConfirm();
          closeToast();
        }}
        className="px-3 py-1.5 text-xs font-bold text-white bg-[#2a9d90] rounded-lg hover:bg-[#238b7e] transition-colors shadow-sm shadow-[#2a9d90]/20"
      >
        Đồng ý
      </button>
    </div>
  </div>
);

const showToast = (message, type = "success") => {
  toast(
    <CustomToast
      title={type === "success" ? "Thành công" : "Thất bại"}
      message={message}
      type={type}
    />,
    {
      type: type,
      icon: false,
      closeButton: false,
      style: {
        borderRadius: "16px",
        background: "white",
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
        padding: "16px",
        border: "1px solid #e9f1f0",
      },
    },
  );
};

const showConfirmToast = (message, onConfirm) => {
  toast(<ToastConfirm message={message} onConfirm={onConfirm} />, {
    autoClose: false,
    closeOnClick: false,
    draggable: false,
    closeButton: false,
    icon: false,
    position: "top-center",
    style: {
      borderRadius: "16px",
      background: "white",
      boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.15)",
      padding: "16px",
      border: "1px solid #2a9d90",
      minWidth: "350px",
    },
  });
};

const ReceptionistPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;
  const IMAGE_BASE_URL = "http://localhost:8080/uploads/";

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // Logic cũ: Gọi API lấy dữ liệu
      const response = await postService.getAllPosts();

      // Giữ nguyên logic xử lý data cũ nhưng lưu vào mảng tổng
      const content = Array.isArray(response)
        ? response
        : response.content || [];
      setAllPosts(content);
    } catch (error) {
      console.error(error);
      showToast("Không thể tải danh sách bài viết", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // --- LOGIC PHÂN TRANG MỚI ---
  const totalElements = allPosts.length;
  const totalPages = Math.ceil(totalElements / ITEMS_PER_PAGE);

  // Tính toán vị trí bắt đầu và kết thúc để cắt mảng (slice)
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentPosts = allPosts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  // ----------------------------

  // Giữ nguyên logic xóa cũ
  const handleDelete = (id) => {
    const executeDelete = async () => {
      try {
        await postService.deletePost(id);
        showToast("Đã xóa bài viết thành công", "success");
        fetchPosts();
      } catch (error) {
        showToast("Xóa bài viết thất bại", "error");
      }
    };
    showConfirmToast("Bạn có chắc muốn xóa bài viết này?", executeDelete);
  };

  // Giữ nguyên statsUI cũ
  const statsUI = [
    {
      label: "Tổng bài viết",
      value: allPosts.length,
      icon: "article",
      colorClass: "bg-[#2a9d90]/10 text-[#2a9d90]",
    },
    {
      label: "Đang hiển thị",
      value: allPosts.filter((p) => p.trangThai === "CONG_KHAI").length,
      icon: "visibility",
      colorClass: "bg-green-50 text-green-500",
    },
    {
      label: "Lượt xem tháng này",
      value: "24.5K",
      icon: "trending_up",
      colorClass: "bg-blue-50 text-blue-500",
    },
  ];

  return (
    <main className="w-full bg-[#fbfcfc] font-sans text-[#101918] min-h-screen p-8 lg:p-12 relative">
      <ToastContainer transition={Slide} />

      <div className="max-w-[1600px] mx-auto space-y-10">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsUI.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-[32px] border border-[#e9f1f0] shadow-xl shadow-gray-200/50 flex items-center gap-6 transition-transform hover:-translate-y-1 duration-300"
            >
              <div
                className={`size-16 rounded-2xl flex items-center justify-center shrink-0 ${item.colorClass}`}
              >
                <span className="material-symbols-outlined text-[32px]">
                  {item.icon}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#588d87] uppercase tracking-widest mb-1">
                  {item.label}
                </p>
                <h3 className="text-4xl font-extrabold text-[#101918]">
                  {item.value}
                </h3>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-[40px] border border-[#e9f1f0] shadow-xl shadow-gray-200/50 overflow-hidden">
          <div className="p-8 border-b border-[#e9f1f0] flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-extrabold text-[#101918] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2a9d90]">
                list_alt
              </span>{" "}
              Danh sách bài đăng
            </h3>
            <div className="flex gap-3">
              <Link to="/staff/receptionist/posts/create">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-[#2a9d90] text-white text-sm font-bold rounded-xl hover:bg-[#2a9d90]/90 transition-colors shadow-lg shadow-[#2a9d90]/20">
                  <span className="material-symbols-outlined text-[20px]">
                    add
                  </span>{" "}
                  Viết bài mới
                </button>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f9fbfb] border-b border-[#e9f1f0]">
                  <th className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest">
                    Bài viết
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest">
                    Chuyên mục
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest">
                    Tác giả
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest">
                    Ngày đăng
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest">
                    Trạng thái
                  </th>
                  <th className="px-8 py-6 text-xs font-black text-[#588d87] uppercase tracking-widest text-right">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e9f1f0]">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      Đang tải dữ liệu...
                    </td>
                  </tr>
                ) : currentPosts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      Chưa có bài viết nào.
                    </td>
                  </tr>
                ) : (
                  currentPosts.map((post) => (
                    <tr
                      key={post.baiVietId}
                      className="hover:bg-[#f9fbfb] transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-5">
                          <img
                            className="w-20 h-14 rounded-xl object-cover border border-[#e9f1f0]"
                            src={`${IMAGE_BASE_URL}${post.anhBia}`}
                            alt="thumb"
                          />
                          <div className="max-w-[280px]">
                            <p className="text-base font-bold text-[#101918] truncate group-hover:text-[#2a9d90] transition-colors">
                              {post.tieuDe}
                            </p>
                            <p className="text-xs text-[#588d87] font-medium mt-1">
                              ID: #{post.baiVietId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1.5 text-[11px] font-black uppercase rounded-lg tracking-wide bg-blue-50 text-blue-600">
                          {post.tenDanhMuc}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-[#101918]">
                        {post.tenTacGia}
                      </td>
                      <td className="px-8 py-6 text-sm font-medium text-[#588d87]">
                        {post.ngayDang.split("T")[0]}
                      </td>
                      <td className="px-8 py-6">
                        <div
                          className={`flex items-center gap-2 ${post.trangThai === "CONG_KHAI" ? "text-[#2a9d90]" : "text-gray-400"}`}
                        >
                          <span
                            className={`size-2.5 rounded-full ${post.trangThai === "CONG_KHAI" ? "bg-[#2a9d90] animate-pulse" : "bg-gray-300"}`}
                          ></span>
                          <span className="text-sm font-bold">
                            {post.trangThai === "CONG_KHAI"
                              ? "Công khai"
                              : "Nháp"}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        {/* Giữ nguyên các nút Edit/Delete cũ */}
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleDelete(post.baiVietId)}
                            className="size-9 flex items-center justify-center text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER PHÂN TRANG - GIỮ NGUYÊN CSS CŨ */}
          <div className="px-8 py-6 bg-[#f9fbfb] border-t border-[#e9f1f0] flex items-center justify-between">
            <p className="text-sm text-[#588d87] font-medium">
              Hiển thị{" "}
              <span className="font-bold text-[#101918]">
                {totalElements > 0 ? indexOfFirstItem + 1 : 0} -{" "}
                {Math.min(indexOfLastItem, totalElements)}
              </span>{" "}
              trên{" "}
              <span className="font-bold text-[#101918]">{totalElements}</span>{" "}
              bài viết
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="size-10 rounded-xl border border-[#e9f1f0] bg-white text-[#588d87] hover:bg-gray-50 flex items-center justify-center disabled:opacity-50 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chevron_left
                </span>
              </button>

              {/* Hiển thị số trang hiện tại */}
              <button className="size-10 rounded-xl bg-[#2a9d90] text-white text-sm font-bold shadow-md shadow-[#2a9d90]/20">
                {currentPage}
              </button>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="size-10 rounded-xl border border-[#e9f1f0] bg-white text-[#588d87] hover:bg-gray-50 flex items-center justify-center disabled:opacity-50 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ReceptionistPosts;
