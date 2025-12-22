package com.example.petlorshop.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "phong_chat")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhongChat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "phong_chat_id")
    private Integer phongChatId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private NguoiDung nguoiDung;

    @ManyToOne
    @JoinColumn(name = "nhan_vien_id")
    private NhanVien nhanVien;

    @Column(name = "tieu_de")
    private String tieuDe;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThaiPhongChat trangThai = TrangThaiPhongChat.MO;

    @CreationTimestamp
    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;

    public enum TrangThaiPhongChat {
        MO, DONG
    }
}
