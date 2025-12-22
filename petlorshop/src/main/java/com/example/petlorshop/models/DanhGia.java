package com.example.petlorshop.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "danh_gia")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DanhGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "danh_gia_id")
    private Integer danhGiaId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private NguoiDung nguoiDung;

    @ManyToOne
    @JoinColumn(name = "san_pham_id")
    private SanPham sanPham;

    @ManyToOne
    @JoinColumn(name = "dich_vu_id")
    private DichVu dichVu;

    @Column(name = "so_sao", nullable = false)
    private Integer soSao;

    @Column(name = "noi_dung", columnDefinition = "TEXT")
    private String noiDung;

    @Column(name = "hinh_anh", columnDefinition = "TEXT")
    private String hinhAnh;

    @CreationTimestamp
    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;

    // --- Các trường mới cho Admin ---

    @Column(name = "trang_thai")
    private Boolean trangThai = true; // true: Hiện, false: Ẩn

    @Column(name = "phan_hoi", columnDefinition = "TEXT")
    private String phanHoi; // Admin trả lời
}
