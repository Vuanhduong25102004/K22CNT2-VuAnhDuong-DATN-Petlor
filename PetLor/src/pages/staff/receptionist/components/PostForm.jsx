import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import postService from "../../../../services/postService";
import {
  getImageUrl,
  createPostFormData,
  generateSlug,
} from "../../../admin/components/utils";

const PostForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Xác định chế độ: Nếu có id trên URL thì là Edit, ngược lại là Create
  const isEdit = !!id;

  const storedUserId = localStorage.getItem("userId");

  // --- STATE ---
  const [formData, setFormData] = useState({
    tieuDe: "",
    slug: "",
    danhMucBvId: "",
    noiDung: "",
    trangThai: "CONG_KHAI",
    userId: storedUserId ? Number(storedUserId) : 1,
  });

  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modules Quill
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "blockquote"],
      ["clean"],
    ],
  };

  // =========================================================================
  // --- LOAD DATA (ĐOẠN CODE ĐÃ SỬA NẰM Ở ĐÂY) ---
  // =========================================================================
  useEffect(() => {
    const loadData = async () => {
      // 1. Khai báo biến lưu danh mục tạm
      let fetchedCategories = [];

      // --- BƯỚC A: Lấy danh sách chuyên mục trước ---
      try {
        const resCats = await postService.getAllPostCategories();
        fetchedCategories = Array.isArray(resCats)
          ? resCats
          : resCats.content || [];
        setCategories(fetchedCategories);
      } catch (err) {
        console.error("Lỗi danh mục:", err);
        return;
      }
      if (isEdit) {
        try {
          const resPost = await postService.getPostById(id);
          const foundCat = fetchedCategories.find(
            (cat) => cat.tenDanhMuc === resPost.tenDanhMuc,
          );

          // Lấy ID tìm được, nếu không thấy thì để rỗng
          const foundCatId = foundCat
            ? foundCat.danhMucBvId || foundCat.id
            : "";
          setFormData({
            tieuDe: resPost.tieuDe || "",
            slug: resPost.slug || "",

            // Điền ID đã tìm được vào đây
            danhMucBvId: foundCatId,

            noiDung: resPost.noiDung || "",
            trangThai: resPost.trangThai || "CONG_KHAI",

            // Xử lý ID nhân viên (Backend bạn đang thiếu trường này trả về, tạm lấy userId cũ)
            userId:
              resPost.nhanVienId ||
              resPost.userId ||
              (storedUserId ? Number(storedUserId) : 1),
          });

          // Hiển thị ảnh bìa cũ
          if (resPost.anhBia) {
            setPreviewUrl(getImageUrl(resPost.anhBia));
          }
        } catch (err) {
          console.error(err);
          toast.error("Không tìm thấy bài viết");
          navigate("/staff/receptionist/posts");
        }
      }
    };

    loadData();
  }, [isEdit, id, navigate, storedUserId]);
  // =========================================================================

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tieuDe" && !isEdit) {
      setFormData((prev) => ({
        ...prev,
        tieuDe: value,
        slug: generateSlug(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, noiDung: content }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!formData.tieuDe || !formData.noiDung || !formData.danhMucBvId) {
      toast.warning("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setIsSubmitting(true);
    try {
      const currentUserId = localStorage.getItem("userId");

      const dataToSubmit = {
        ...formData,
        userId: Number(currentUserId) || Number(formData.userId) || 1,
        danhMucBvId: Number(formData.danhMucBvId),
      };

      const payload = createPostFormData(dataToSubmit, imageFile);

      if (isEdit) {
        await postService.updatePost(id, payload);
        toast.success("Cập nhật bài viết thành công!");
      } else {
        await postService.createPost(payload);
        toast.success("Đăng bài viết mới thành công!");
      }

      navigate("/staff/receptionist/posts");
    } catch (error) {
      console.error("Lỗi submit:", error);
      const msg = error.response?.data?.message || "Lỗi xử lý!";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-8 lg:p-12 pb-24 custom-scrollbar bg-[#fbfcfc] min-h-screen font-sans text-[#101918]">
      <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row gap-10">
        {/* CỘT TRÁI */}
        <div className="flex-1 space-y-8">
          <div className="space-y-3">
            <label className="text-base font-extrabold text-[#101918] ml-2">
              Tiêu đề bài viết
            </label>
            <input
              name="tieuDe"
              value={formData.tieuDe}
              onChange={handleChange}
              className="w-full bg-white border border-[#e9f1f0] rounded-[24px] px-6 py-5 text-xl font-bold focus:ring-4 focus:ring-[#2a9d90]/10 focus:border-[#2a9d90] placeholder:text-gray-300 shadow-sm transition-all outline-none"
              placeholder="Nhập tiêu đề hấp dẫn..."
              type="text"
            />
          </div>

          {/* Input Slug */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 ml-2">
              Slug (URL)
            </label>
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-[#e9f1f0] rounded-[16px] px-4 py-3 text-sm text-gray-600 focus:outline-none"
              placeholder="duong-dan-bai-viet"
            />
          </div>

          <div className="space-y-3">
            <label className="text-base font-extrabold text-[#101918] ml-2">
              Nội dung chi tiết
            </label>
            <div className="bg-white border border-[#e9f1f0] rounded-[32px] overflow-hidden min-h-[600px] flex flex-col shadow-xl shadow-gray-200/50">
              <ReactQuill
                theme="snow"
                value={formData.noiDung}
                onChange={handleEditorChange}
                modules={modules}
                className="flex-1 h-full border-none"
                placeholder="Bắt đầu viết câu chuyện của bạn..."
              />
            </div>
          </div>
        </div>

        {/* CỘT PHẢI (SIDEBAR) */}
        <div className="w-full xl:w-[400px] space-y-8 h-fit xl:sticky xl:top-8">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/staff/receptionist/posts")}
              className="py-4 bg-white border border-[#e9f1f0] text-[#588d87] text-sm font-bold rounded-[20px] hover:bg-[#f9fbfb] hover:text-[#2a9d90] transition-colors shadow-sm"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="py-4 bg-[#2a9d90] text-white text-sm font-bold rounded-[20px] hover:bg-[#2a9d90]/90 transition-all shadow-lg shadow-[#2a9d90]/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  progress_activity
                </span>
              ) : (
                <span className="material-symbols-outlined text-[20px]">
                  {isEdit ? "save" : "send"}
                </span>
              )}
              {isEdit ? "Cập nhật" : "Đăng bài"}
            </button>
          </div>

          {/* Ảnh bìa */}
          <div className="bg-white p-6 rounded-[32px] border border-[#e9f1f0] shadow-xl shadow-gray-200/50 space-y-4">
            <p className="text-base font-extrabold text-[#101918]">
              Ảnh đại diện
            </p>
            <label
              htmlFor="sidebar-upload"
              className="aspect-video bg-[#f9fbfb] rounded-[24px] overflow-hidden flex flex-col items-center justify-center border-2 border-dashed border-[#e9f1f0] hover:border-[#2a9d90]/30 cursor-pointer group transition-all relative"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <span className="material-symbols-outlined text-4xl text-[#588d87] group-hover:scale-110 transition-transform">
                    image
                  </span>
                  <span className="text-sm font-bold text-[#588d87] mt-2">
                    Chọn ảnh bìa
                  </span>
                </>
              )}
              <input
                id="sidebar-upload"
                type="file"
                hidden
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
          </div>

          {/* Cấu hình */}
          <div className="bg-white p-6 rounded-[32px] border border-[#e9f1f0] shadow-xl shadow-gray-200/50 space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-black text-[#588d87] uppercase tracking-widest ml-1">
                Chuyên mục
              </label>
              <div className="relative">
                <select
                  name="danhMucBvId"
                  value={formData.danhMucBvId}
                  onChange={handleChange}
                  className="w-full appearance-none bg-[#f9fbfb] border border-[#e9f1f0] rounded-[20px] px-5 py-4 text-sm font-bold text-[#101918] focus:ring-2 focus:ring-[#2a9d90]/20 focus:border-[#2a9d90] outline-none cursor-pointer"
                >
                  <option value="">-- Chọn chuyên mục --</option>
                  {categories.map((cat) => (
                    <option
                      key={cat.danhMucBvId || cat.id}
                      value={cat.danhMucBvId || cat.id}
                    >
                      {cat.tenDanhMuc}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#e9f1f0]"></div>

            <div className="space-y-3">
              <label className="text-xs font-black text-[#588d87] uppercase tracking-widest ml-1">
                Trạng thái hiển thị
              </label>
              <div className="flex flex-col gap-3">
                <label
                  className={`flex items-center gap-4 cursor-pointer group p-3 rounded-2xl border transition-all ${formData.trangThai === "CONG_KHAI" ? "border-[#2a9d90] bg-[#f9fbfb]" : "border-transparent hover:border-[#e9f1f0]"}`}
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      className="peer appearance-none size-5 border-2 border-gray-300 rounded-full checked:border-[#2a9d90] checked:bg-[#2a9d90]"
                      type="radio"
                      name="trangThai"
                      value="CONG_KHAI"
                      checked={formData.trangThai === "CONG_KHAI"}
                      onChange={handleChange}
                    />
                    <span className="material-symbols-outlined text-white text-[14px] absolute opacity-0 peer-checked:opacity-100 pointer-events-none transform scale-0 peer-checked:scale-100 transition-transform">
                      check
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#101918]">
                      Công khai
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-4 cursor-pointer group p-3 rounded-2xl border transition-all ${formData.trangThai === "NHAP" ? "border-[#2a9d90] bg-[#f9fbfb]" : "border-transparent hover:border-[#e9f1f0]"}`}
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      className="peer appearance-none size-5 border-2 border-gray-300 rounded-full checked:border-[#2a9d90] checked:bg-[#2a9d90]"
                      type="radio"
                      name="trangThai"
                      value="NHAP"
                      checked={formData.trangThai === "NHAP"}
                      onChange={handleChange}
                    />
                    <span className="material-symbols-outlined text-white text-[14px] absolute opacity-0 peer-checked:opacity-100 pointer-events-none transform scale-0 peer-checked:scale-100 transition-transform">
                      check
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#101918]">
                      Bản nháp
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostForm;
