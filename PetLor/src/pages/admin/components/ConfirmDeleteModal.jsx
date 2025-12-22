import { motion, AnimatePresence } from "framer-motion";
import useEscapeKey from "../../../hooks/useEscapeKey";

/**
 * Modal xác nhận xóa dùng chung.
 * * @param {boolean} isOpen - Trạng thái mở modal
 * @param {function} onClose - Hàm đóng modal (Hủy)
 * @param {function} onConfirm - Hàm thực hiện xóa (Xác nhận)
 * @param {string} [title="Xác nhận xóa"] - Tiêu đề modal (Tùy chọn)
 * @param {string} [message] - Nội dung cảnh báo (Tùy chọn)
 * @param {string} [confirmText="Xóa"] - Chữ trên nút xóa (Tùy chọn)
 * @param {string} [cancelText="Hủy"] - Chữ trên nút hủy (Tùy chọn)
 */
const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Xác nhận xóa",
  message = "Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác.",
  confirmText = "Xóa",
  cancelText = "Hủy",
}) => {
  // Sử dụng custom hook để đóng modal khi nhấn phím Escape
  useEscapeKey(onClose, isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          // z-[60] để đảm bảo nó nằm trên các modal khác nếu có
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4"
          >
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <span className="material-symbols-outlined text-red-600 text-3xl">
                  warning
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{message}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition-colors"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDeleteModal;
