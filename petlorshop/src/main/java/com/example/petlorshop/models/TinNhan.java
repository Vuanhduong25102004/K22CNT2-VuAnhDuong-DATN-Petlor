package com.example.petlorshop.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "tin_nhan")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TinNhan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tin_nhan_id")
    private Integer tinNhanId;

    @ManyToOne
    @JoinColumn(name = "phong_chat_id", nullable = false)
    private PhongChat phongChat;

    @Column(name = "nguoi_gui_id", nullable = false)
    private Integer nguoiGuiId;

    @Enumerated(EnumType.STRING)
    @Column(name = "loai_nguoi_gui", nullable = false)
    private LoaiNguoiGui loaiNguoiGui;

    @Column(name = "noi_dung", nullable = false, columnDefinition = "TEXT")
    private String noiDung;

    @CreationTimestamp
    @Column(name = "thoi_gian")
    private LocalDateTime thoiGian;

    @Column(name = "da_xem")
    private Boolean daXem = false;

    public enum LoaiNguoiGui {
        KHACH, NHAN_VIEN
    }
}
