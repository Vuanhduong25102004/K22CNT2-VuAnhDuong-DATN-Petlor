import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// Services & Utils
import postService from "../../../services/postService";
import { getImageUrl } from "../../admin/components/utils";

const ReceptionistPostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // --- STATE ---
  // Chỉ lưu dữ liệu để hiển thị
  const [postData, setPostData] = useState({
    tieuDe: "",
    slug: "",
    tenDanhMuc: "", // Lưu thẳng tên danh mục để hiển thị
    noiDung: "",
    trangThai: "",
    anhBia: "",
    tacGia: "",
    anhTacGia: "", // <--- THÊM TRƯỜNG NÀY
    ngayDang: "",
  });

  // Quill Modules: Tắt toolbar vì chỉ xem
  const modules = {
    toolbar: false,
  };

  // --- LOAD DATA ---
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await postService.getPostById(id);

        // Map dữ liệu từ API vào State hiển thị
        setPostData({
          tieuDe: res.tieuDe,
          slug: res.slug,
          // Logic lấy tên danh mục: Ưu tiên lấy từ object danhMuc, nếu không có thì lấy string tenDanhMuc
          tenDanhMuc:
            res.danhMuc?.tenDanhMuc || res.tenDanhMuc || "Chưa phân loại",
          noiDung: res.noiDung,
          trangThai: res.trangThai,
          anhBia: res.anhBia,
          tacGia: res.tenTacGia || "Admin",
          anhTacGia: res.anhTacGia, // <--- LẤY ẢNH TÁC GIẢ TỪ API
          ngayDang: res.ngayDang,
        });
      } catch (err) {
        console.error(err);
        toast.error("Không tìm thấy bài viết");
        navigate("/staff/receptionist/posts");
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id, navigate]);

  return (
    <main className="flex-1 overflow-y-auto p-8 lg:p-12 pb-24 custom-scrollbar bg-[#fbfcfc] min-h-screen font-sans text-[#101918]">
      {/* Header Breadcrumb / Back Button */}
      <div className="max-w-[1600px] mx-auto mb-6">
        <button
          onClick={() => navigate("/staff/receptionist/posts")}
          className="flex items-center gap-2 text-[#588d87] hover:text-[#2a9d90] font-bold transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Quay lại danh sách
        </button>
      </div>

      <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row gap-10">
        {/* --- CỘT TRÁI (NỘI DUNG CHÍNH) --- */}
        <div className="flex-1 space-y-8">
          {/* Tiêu đề */}
          <div className="space-y-3">
            <label className="text-base font-extrabold text-[#101918] ml-2">
              Tiêu đề bài viết
            </label>
            <div className="w-full bg-gray-50 border border-[#e9f1f0] rounded-[24px] px-6 py-5 text-xl font-bold text-[#101918]">
              {postData.tieuDe || "Đang tải..."}
            </div>
          </div>

          {/* Slug */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 ml-2">
              Slug (URL)
            </label>
            <div className="w-full bg-gray-50 border border-[#e9f1f0] rounded-[16px] px-4 py-3 text-sm text-gray-600">
              {postData.slug || "---"}
            </div>
          </div>

          {/* Nội dung Editor (Read Only) */}
          <div className="space-y-3">
            <label className="text-base font-extrabold text-[#101918] ml-2">
              Nội dung chi tiết
            </label>
            {/* Thêm class 'react-quill-readonly' để custom css nếu cần ẩn viền/nền */}
            <div className="bg-white border border-[#e9f1f0] rounded-[32px] overflow-hidden min-h-[600px] flex flex-col shadow-xl shadow-gray-200/50">
              <ReactQuill
                theme="snow"
                value={postData.noiDung}
                readOnly={true} // Bắt buộc
                modules={modules} // Tắt toolbar
                className="flex-1 h-full border-none react-quill-readonly"
              />
            </div>
          </div>
        </div>

        {/* --- CỘT PHẢI (SIDEBAR THÔNG TIN) --- */}
        <div className="w-full xl:w-[400px] space-y-8 h-fit xl:sticky xl:top-8">
          {/* Ảnh bìa */}
          <div className="bg-white p-6 rounded-[32px] border border-[#e9f1f0] shadow-xl shadow-gray-200/50 space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-base font-extrabold text-[#101918]">
                Ảnh đại diện
              </p>
            </div>

            <div className="aspect-video bg-[#f9fbfb] rounded-[24px] overflow-hidden flex flex-col items-center justify-center border border-[#e9f1f0]">
              {postData.anhBia ? (
                <img
                  src={getImageUrl(postData.anhBia)}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <span className="material-symbols-outlined text-4xl">
                    image_not_supported
                  </span>
                  <span className="text-sm font-bold">Không có ảnh</span>
                </div>
              )}
            </div>
          </div>

          {/* Thông tin chi tiết */}
          <div className="bg-white p-6 rounded-[32px] border border-[#e9f1f0] shadow-xl shadow-gray-200/50 space-y-6">
            {/* Chuyên mục */}
            <div className="space-y-3">
              <label className="text-xs font-black text-[#588d87] uppercase tracking-widest ml-1">
                Chuyên mục
              </label>
              <div className="w-full bg-gray-50 border border-[#e9f1f0] rounded-[20px] px-5 py-4 text-sm font-bold text-[#101918]">
                {postData.tenDanhMuc}
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#e9f1f0]"></div>

            {/* Tác giả & Ngày đăng */}
            <div className="grid grid-cols-2 gap-4">
              {/* CẬP NHẬT: Hiển thị Avatar Tác giả */}
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-xs font-black text-[#588d87] uppercase tracking-widest ml-1">
                  Tác giả
                </label>
                <div className="flex items-center gap-2 px-2">
                  <div className="size-8 rounded-full overflow-hidden border border-[#e9f1f0] bg-gray-100 flex items-center justify-center shrink-0">
                    {postData.anhTacGia ? (
                      <img
                        src={getImageUrl(postData.anhTacGia)}
                        alt={postData.tacGia}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none"; // Ẩn ảnh lỗi
                          e.target.nextSibling.style.display = "block"; // Hiện icon fallback
                        }}
                      />
                    ) : null}
                    {/* Icon fallback (hiện khi không có ảnh hoặc ảnh lỗi) */}
                    <span
                      className="material-symbols-outlined text-gray-400 text-[18px]"
                      style={{ display: postData.anhTacGia ? "none" : "block" }}
                    >
                      person
                    </span>
                  </div>
                  <div className="text-sm font-bold text-[#101918] truncate">
                    {postData.tacGia}
                  </div>
                </div>
              </div>

              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-xs font-black text-[#588d87] uppercase tracking-widest ml-1">
                  Ngày đăng
                </label>
                <div className="text-sm font-bold text-[#101918] px-2 flex items-center h-8">
                  {postData.ngayDang
                    ? new Date(postData.ngayDang).toLocaleDateString("vi-VN")
                    : "---"}
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#e9f1f0]"></div>

            {/* Trạng thái */}
            <div className="space-y-3">
              <label className="text-xs font-black text-[#588d87] uppercase tracking-widest ml-1">
                Trạng thái hiển thị
              </label>
              <div
                className={`flex items-center gap-3 px-5 py-4 rounded-[20px] border 
                  ${
                    postData.trangThai === "CONG_KHAI"
                      ? "bg-green-50 border-green-100 text-green-700"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {postData.trangThai === "CONG_KHAI"
                    ? "check_circle"
                    : "edit_document"}
                </span>
                <span className="text-sm font-bold">
                  {postData.trangThai === "CONG_KHAI"
                    ? "Đang công khai"
                    : "Bản nháp / Ẩn"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReceptionistPostDetail;
