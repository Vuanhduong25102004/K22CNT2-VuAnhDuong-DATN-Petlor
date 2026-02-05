import apiClient from './apiClient';

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
    const response = await apiClient.post('/auth/login', credentials);

    const data = response.data ? response.data : response;
    const token = data.accessToken || data.token; 

    if (token) {
      localStorage.setItem('accessToken', token); 
      localStorage.setItem('token', token); 
     
      let userId = data.userId || data.id || (data.user && data.user.id);

      let nhanVienId = data.nhanVienId || 
                       (data.user && data.user.nhanVienId) || 
                       (data.user && data.user.nhanVien && data.user.nhanVien.id) ||
                       (data.nhanVien && data.nhanVien.id);
      if (!userId || !nhanVienId) {
        const decoded = parseJwt(token);
        if (decoded) {
          if (!userId) userId = decoded.userId || decoded.id || decoded.sub;
          
          if (!nhanVienId) {
             nhanVienId = decoded.nhanVienId || decoded.employeeId || decoded.staffId;
          }
        }
      }

      if (userId) {
        localStorage.setItem('userId', userId);
      }

      if (nhanVienId) {
        localStorage.setItem('nhanVienId', nhanVienId);
        console.log("Đã lưu nhanVienId:", nhanVienId);
      } else {
        console.warn("Không tìm thấy nhanVienId trong response đăng nhập!");
      }
    } 

    return data;
  },
  
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); 
    localStorage.removeItem('nhanVienId'); 
  },

  getAuthHeader: () => {
    const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
  
  getCurrentUserId: () => {
    return localStorage.getItem('userId');
  },

  getCurrentNhanVienId: () => {
    return localStorage.getItem('nhanVienId');
  }
};

export default authService;