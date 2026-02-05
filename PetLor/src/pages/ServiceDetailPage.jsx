import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import productService from "../services/productService";
import { formatCurrency } from "../utils/formatters";
import { SERVER_URL } from "../services/apiClient";

const MOCK_REVIEWS = [
  {
    id: 1,
    user: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    date: "10/01/2026",
    comment: "Dịch vụ rất tốt, bé nhà mình tắm xong thơm phức và rất vui vẻ.",
  },
  {
    id: 2,
    user: "Trần Thị B",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    date: "05/01/2026",
    comment: "Nhân viên nhiệt tình, nhưng thời gian chờ hơi lâu một chút.",
  },
];

const DEFAULT_PROCESS = [
  {
    step: 1,
    title: "Kiểm tra & Tư vấn",
    desc: "Kiểm tra tình trạng da, lông và sức khỏe tổng quát.",
  },
  {
    step: 2,
    title: "Vệ sinh cơ bản",
    desc: "Cắt mài móng, vệ sinh tai và nhổ lông tai.",
  },
  {
    step: 3,
    title: "Tắm massage",
    desc: "Sử dụng sữa tắm chuyên dụng và vắt tuyến hôi.",
  },
  { step: 4, title: "Hoàn thiện", desc: "Sấy khô, chải lông và xịt dưỡng." },
];

const ServiceDetailPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(5);

  const getImageUrl = (imageName) => {
    if (!imageName) return "https://placehold.co/600x600?text=No+Image";
    if (imageName.startsWith("http")) return imageName;
    return `${SERVER_URL}/uploads/${imageName}`;
  };

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        setLoading(true);
        const data = await productService.getServiceById(id);

        const mappedService = {
          ...data,
          id: data.dichVuId || data.id,
          name: data.tenDichVu || data.name,
          price: data.giaDichVu || data.price,
          description: data.moTa || data.description,
          image: data.hinhAnh,
          rating: 4.8,
          reviewsCount: 128,
          bookings: "500+",

          process: data.process || DEFAULT_PROCESS,
        };

        setService(mappedService);
        setMainImage(getImageUrl(mappedService.image));
      } catch (error) {
        console.error("Lỗi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetail();
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true });
  }, [id]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newReview = {
      id: reviews.length + 1,
      user: "Bạn (Khách mới)",
      avatar: "https://placehold.co/150",
      rating: userRating,
      date: new Date().toLocaleDateString("vi-VN"),
      comment: newComment,
    };

    setReviews([newReview, ...reviews]);
    setNewComment("");
    alert("Cảm ơn bạn đã đánh giá!");
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
      </div>
    );
  if (!service)
    return <div className="text-center py-20">Không tìm thấy dịch vụ!</div>;

  return (
    <div className="min-h-screen bg-[#f8faf9] pb-20 pt-24 font-display text-[#0d1b1a]">
      <main className="max-w-[1200px] mx-auto px-4 lg:px-10">
        <div className="flex flex-wrap gap-2 mb-6 text-sm font-medium">
          <Link to="/" className="text-[#4c9a93] hover:underline">
            Trang chủ
          </Link>
          <span className="text-[#4c9a93]">/</span>
          <Link to="/services" className="text-[#4c9a93] hover:underline">
            Dịch vụ
          </Link>
          <span className="text-[#4c9a93]">/</span>
          <span className="text-[#0d1b1a]">{service.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-4" data-aos="fade-right">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#e7f3f2] shadow-sm group">
              <img
                src={mainImage}
                alt={service.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-xl bg-cover bg-center cursor-pointer border-2 transition-all ${
                    mainImage === getImageUrl(service.image)
                      ? "border-primary"
                      : "border-transparent hover:border-primary/50"
                  }`}
                  style={{
                    backgroundImage: `url('${getImageUrl(service.image)}')`,
                  }}
                  onClick={() => setMainImage(getImageUrl(service.image))}
                ></div>
              ))}
            </div>
          </div>

          <div
            className="lg:col-span-5 flex flex-col gap-6"
            data-aos="fade-left"
          >
            <div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3 tracking-wider uppercase">
                Dịch vụ cao cấp
              </span>
              <h1 className="text-3xl font-extrabold leading-tight mb-2">
                {service.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="material-symbols-outlined fill-icon text-lg"
                    >
                      star
                    </span>
                  ))}
                  <span className="ml-1 text-[#0d1b1a] font-bold">
                    {service.rating}
                  </span>
                </div>
                <span className="text-[#4c9a93] text-sm font-medium">
                  {service.reviewsCount} đánh giá
                </span>
                <span className="text-[#4c9a93] text-sm font-medium">•</span>
                <span className="text-[#4c9a93] text-sm font-medium">
                  {service.bookings} lượt đặt
                </span>
              </div>
            </div>

            <div className="py-4 border-y border-[#e7f3f2]">
              <p className="text-sm text-[#4c9a93] font-medium mb-1">
                Giá chỉ từ
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-primary">
                  {formatCurrency(service.price)}
                </span>
                <span className="text-sm text-[#4c9a93] line-through">
                  {formatCurrency(service.price * 1.25)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <span className="material-symbols-outlined text-primary">
                  schedule
                </span>
                Thời gian thực hiện: 60 - 90 phút
              </div>
              <p className="text-[#4c9a93] text-sm leading-relaxed line-clamp-3">
                {service.description}
              </p>
            </div>

            <div className="space-y-3">
              <p className="font-bold">Cân nặng thú cưng</p>
              <div className="grid grid-cols-3 gap-3">
                {["Nhỏ (<5kg)", "Vừa (5-10kg)", "Lớn (>10kg)"].map(
                  (label, idx) => (
                    <button
                      key={idx}
                      className="flex flex-col items-center justify-center p-3 rounded-xl border border-[#e7f3f2] hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium text-[#4c9a93] hover:text-primary"
                    >
                      {label}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined fill-icon">
                  calendar_month
                </span>
                Đặt lịch ngay
              </button>
            </div>

            <div className="flex items-center justify-around p-4 rounded-xl bg-white border border-[#e7f3f2] mt-2">
              {[
                { icon: "verified_user", text: "An toàn tuyệt đối" },
                { icon: "health_and_safety", text: "Dụng cụ vô trùng" },
                { icon: "support_agent", text: "Hỗ trợ 24/7" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-primary">
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-[#4c9a93]">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10"
          data-aos="fade-up"
        >
          <div className="bg-white rounded-2xl p-8 border border-[#e7f3f2]">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                assignment
              </span>
              Quy trình thực hiện
            </h3>
            <div className="space-y-6">
              {service.process.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  <div>
                    <p className="font-bold text-[#0d1b1a]">{step.title}</p>
                    <p className="text-sm text-[#4c9a93]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#e7f3f2]">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                info
              </span>
              Lưu ý cho chủ nuôi
            </h3>
            <ul className="space-y-4">
              {[
                "Vui lòng mang theo sổ tiêm chủng của bé.",
                "Thông báo cho nhân viên nếu bé có tiền sử dị ứng.",
                "Không nên cho bé ăn quá no trước khi làm dịch vụ 2 tiếng.",
                "PetLor có quyền từ chối bé đang có bệnh truyền nhiễm.",
                "Đến trước lịch hẹn 10-15 phút để bé làm quen môi trường.",
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5 text-lg">
                    check_circle
                  </span>
                  <p className="text-sm text-[#4c9a93] leading-relaxed">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-16 bg-white rounded-2xl border border-[#e7f3f2] overflow-hidden"
          data-aos="fade-up"
        >
          <div className="p-8 border-b border-[#e7f3f2]">
            <h3 className="text-xl font-bold">Đánh giá từ khách hàng</h3>
          </div>

          <div className="flex flex-col md:flex-row gap-x-12 gap-y-8 p-8 border-b border-[#e7f3f2]">
            <div className="flex flex-col gap-2 items-center md:items-start">
              <p className="text-[#0d1b1a] text-5xl font-black leading-tight">
                4.8
              </p>
              <div className="flex gap-1 text-primary">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="material-symbols-outlined fill-icon">
                    star
                  </span>
                ))}
              </div>
              <p className="text-[#4c9a93] text-sm font-medium uppercase tracking-widest mt-1">
                128 Reviews
              </p>
            </div>

            <div className="flex-1 space-y-3 min-w-[300px]">
              {[5, 4, 3, 2, 1].map((star) => (
                <div
                  key={star}
                  className="grid grid-cols-[30px_1fr_50px] items-center gap-3"
                >
                  <span className="text-sm font-bold text-right">{star}</span>
                  <div className="h-2.5 w-full bg-[#cfe7e5] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: star === 5 ? "85%" : star === 4 ? "10%" : "2%",
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-[#4c9a93] text-right">
                    {star === 5 ? "85%" : star === 4 ? "10%" : "2%"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 space-y-8">
            {reviews.map((review) => (
              <div key={review.id} className="flex gap-4">
                <img
                  src={review.avatar}
                  alt={review.user}
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-[#0d1b1a]">
                        {review.user}
                      </h4>
                      <p className="text-xs text-[#4c9a93]">{review.date}</p>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`material-symbols-outlined text-sm ${
                            i < review.rating ? "fill-icon" : ""
                          }`}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 bg-gray-50 border-t border-[#e7f3f2]">
            <h4 className="font-bold mb-4">Viết đánh giá của bạn</h4>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Chọn số sao:</span>
                <div className="flex gap-1 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setUserRating(star)}
                      className={`material-symbols-outlined text-2xl transition-colors ${
                        star <= userRating
                          ? "text-yellow-400 fill-icon"
                          : "text-gray-300"
                      }`}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ này..."
                className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary min-h-[100px] bg-white"
                required
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md"
                >
                  Gửi đánh giá
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceDetailPage;
