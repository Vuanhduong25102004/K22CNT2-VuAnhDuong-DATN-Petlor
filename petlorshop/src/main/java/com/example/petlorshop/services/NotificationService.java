package com.example.petlorshop.services;

import com.example.petlorshop.dto.ThongBaoResponse;
import com.example.petlorshop.models.ThongBao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NotificationService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendGlobalNotification(String message) {
        ThongBaoResponse notification = new ThongBaoResponse();
        notification.setTieuDe("Thông báo hệ thống");
        notification.setNoiDung(message);
        notification.setNgayTao(LocalDateTime.now());
        notification.setLoaiThongBao(ThongBao.LoaiThongBao.HE_THONG);

        messagingTemplate.convertAndSend("/topic/admin-notifications", notification);
    }

    public void sendPrivateNotification(String userId, String message) {
        ThongBaoResponse notification = new ThongBaoResponse();
        notification.setTieuDe("Thông báo cá nhân");
        notification.setNoiDung(message);
        notification.setNgayTao(LocalDateTime.now());
        notification.setLoaiThongBao(ThongBao.LoaiThongBao.DON_HANG);

        messagingTemplate.convertAndSendToUser(userId, "/queue/notifications", notification);
    }

    public void sendDoctorNotification(String doctorEmail, String message) {
        ThongBaoResponse notification = new ThongBaoResponse();
        notification.setTieuDe("Lịch hẹn mới");
        notification.setNoiDung(message);
        notification.setNgayTao(LocalDateTime.now());
        notification.setLoaiThongBao(ThongBao.LoaiThongBao.LICH_HEN);

        messagingTemplate.convertAndSendToUser(doctorEmail, "/queue/doctor-notifications", notification);
    }
}
