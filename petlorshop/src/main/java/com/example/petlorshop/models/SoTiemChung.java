package com.example.petlorshop.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "so_tiem_chung")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SoTiemChung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tiem_chung_id")
    private Integer tiemChungId;

    @ManyToOne
    @JoinColumn(name = "thu_cung_id", nullable = false)
    private ThuCung thuCung;

    @Column(name = "ten_vac_xin", nullable = false)
    private String tenVacXin;

    @Column(name = "ngay_tiem", nullable = false)
    private LocalDate ngayTiem;

    @Column(name = "ngay_tai_chung")
    private LocalDate ngayTaiChung;

    @ManyToOne
    @JoinColumn(name = "nhan_vien_id")
    private NhanVien nhanVien;

    // Thêm liên kết với Lịch Hẹn
    @OneToOne
    @JoinColumn(name = "lich_hen_id")
    private LichHen lichHen;

    @Column(name = "ghi_chu", columnDefinition = "TEXT")
    private String ghiChu;
}
