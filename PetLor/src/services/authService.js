import apiClient from './apiClient';

// Hàm phụ: Giải mã JWT Token để lấy thông tin ẩn bên trong (như userId)
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

const authService = {
  register: (userData) => apiClient.post('/auth/register', userData),
  
  login: async (credentials) => {
    const data = await apiClient.post('/auth/login', credentials);
    
    if (data && data.accessToken) {
 
      localStorage.setItem('accessToken', data.accessToken);

      let userId = null;

      if (data.userId) userId = data.userId;
      else if (data.id) userId = data.id;
      else if (data.user && data.user.id) userId = data.user.id;

      if (!userId) {
        const decoded = parseJwt(data.accessToken);
        if (decoded) {
    
          userId = decoded.userId || decoded.id || decoded.sub;
        }
      }

      if (userId) {
        localStorage.setItem('userId', userId);
      } else {
        console.warn("Không tìm thấy UserID trong phản hồi đăng nhập");
      }
    }
    return data;
  },
  
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId'); // Xóa luôn userId khi đăng xuất
  },

  getAuthHeader: () => {
    const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
  
  // Hàm tiện ích để lấy userId hiện tại bất cứ lúc nào
  getCurrentUserId: () => {
    return localStorage.getItem('userId');
  }
};

export default authService;