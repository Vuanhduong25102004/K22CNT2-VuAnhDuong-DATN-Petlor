import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { toast } from 'react-toastify';

const useWebSocket = (user) => {
    const token = user?.token;
    const role = user?.role;
    
    useEffect(() => {
        if (!token) return;

        const SOCKET_URL = 'http://localhost:8080/ws'; 
        const socket = new SockJS(SOCKET_URL);
        const stompClient = Stomp.over(socket);
        
        stompClient.debug = null;

        const onConnected = () => {
     

            if (role === 'ADMIN' || role === 'RECEPTIONIST') {
                stompClient.subscribe('/topic/admin-notifications', (payload) => {
                    const data = JSON.parse(payload.body);
                    toast.info(`🔔 ${data.tieuDe}: ${data.noiDung}`, { 
                        toastId: data.thongBaoId || data.noiDung 
                    });
                });
            }

            if (role === 'USER') {
                stompClient.subscribe('/user/queue/notifications', (payload) => {
                    const data = JSON.parse(payload.body);
                    toast.success(`📦 ${data.tieuDe}: ${data.noiDung}`, { 
                        toastId: data.thongBaoId || data.noiDung
                    });
                });
            }

            if (role === 'DOCTOR' || role === 'SPA') {
                stompClient.subscribe('/user/queue/doctor-notifications', (payload) => {
                    const data = JSON.parse(payload.body);
                    toast.warning(`🩺 ${data.tieuDe}: ${data.noiDung}`, { 
                        toastId: data.thongBaoId || data.noiDung
                    });
                });
            }
        };

        const onError = (error) => {
            console.error('Lỗi kết nối WebSocket:', error);
        };

        stompClient.connect({ Authorization: `Bearer ${token}` }, onConnected, onError);

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.disconnect(() => {
                    console.log('Đã ngắt kết nối WebSocket cũ');
                });
            }
        };
    }, [token, role]); 
};

export default useWebSocket;