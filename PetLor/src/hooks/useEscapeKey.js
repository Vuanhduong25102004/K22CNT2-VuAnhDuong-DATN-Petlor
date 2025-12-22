import { useEffect } from "react";

/**
 * Custom hook để xử lý việc đóng một component (ví dụ: modal) khi nhấn phím Escape.
 * @param {function} onEscape - Hàm callback sẽ được thực thi khi nhấn phím Escape.
 * @param {boolean} active - Hook chỉ hoạt động khi giá trị này là true (ví dụ: khi modal đang mở).
 */
const useEscapeKey = (onEscape, active = true) => {
  useEffect(() => {
    // Nếu không active, không làm gì cả
    if (!active) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onEscape();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Hàm dọn dẹp để gỡ bỏ event listener
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onEscape, active]); // Chạy lại effect nếu hàm callback hoặc trạng thái active thay đổi
};

export default useEscapeKey;

