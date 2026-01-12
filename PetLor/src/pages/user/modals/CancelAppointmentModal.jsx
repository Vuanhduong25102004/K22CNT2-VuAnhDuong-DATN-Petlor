import React from "react";

const CancelAppointmentModal = ({
  isOpen,
  onClose,
  reasons,
  selectedReason,
  onSelectReason,
  onConfirm,
  isSubmitting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-[40px] w-full max-w-md overflow-hidden shadow-2xl"
        data-aos="fade-up"
        data-aos-duration="400"
      >
        <div className="p-10 pb-4 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-red-500">
            <span className="material-icons-outlined text-4xl">event_busy</span>
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-2">
            Hủy lịch hẹn?
          </h3>
          <p className="text-gray-500">
            Chúng tôi rất tiếc khi bạn không thể tham gia. Hãy chọn lý do hủy
            lịch nhé.
          </p>
        </div>

        <div className="p-10 pt-4 space-y-3">
          {reasons.map((reason, index) => (
            <button
              key={index}
              onClick={() => onSelectReason(reason)}
              className={`w-full text-left p-5 rounded-2xl border-2 font-bold transition-all duration-300 flex items-center justify-between ${
                selectedReason === reason
                  ? "border-red-500 bg-red-50 text-red-700 shadow-sm"
                  : "border-gray-50 text-gray-500 hover:border-gray-100 hover:bg-gray-50"
              }`}
            >
              {reason}
              {selectedReason === reason && (
                <span className="material-icons text-red-500">
                  check_circle
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-10 pt-0 flex gap-4">
          <button
            disabled={isSubmitting}
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-colors"
          >
            Quay lại
          </button>
          <button
            disabled={isSubmitting || !selectedReason}
            onClick={onConfirm}
            className={`flex-[2] py-4 rounded-2xl font-bold text-white shadow-xl transition-all ${
              !selectedReason || isSubmitting
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 hover:-translate-y-1 active:scale-95 shadow-red-200"
            }`}
          >
            {isSubmitting ? "Đang xử lý..." : "Xác nhận hủy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelAppointmentModal;
