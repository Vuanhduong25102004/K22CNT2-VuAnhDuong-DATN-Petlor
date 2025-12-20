package com.example.petlorshop.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "khuyen_mai")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KhuyenMai {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "khuyen_mai_id")
    private Integer khuyenMaiId;

    @Column(name = "ma_code", nullable = false, unique = true, length = 50)
    private String maCode;

    @Column(name = "mo_ta", columnDefinition = "TEXT")
    private String moTa;

    @Enumerated(EnumType.STRING)
    @Column(name = "loai_giam_gia", nullable = false)
    private LoaiGiamGia loaiGiamGia;

    @Column(name = "gia_tri_giam", nullable = false, precision = 10, scale = 2)
    private BigDecimal giaTriGiam;

    @Column(name = "ngay_bat_dau", nullable = false)
    private LocalDateTime ngayBatDau;

    @Column(name = "ngay_ket_thuc", nullable = false)
    private LocalDateTime ngayKetThuc;

    @Column(name = "so_luong_gioi_han")
    private Integer soLuongGioiHan;

    @Column(name = "don_toi_thieu", precision = 10, scale = 2)
    private BigDecimal donToiThieu;

    @Column(name = "trang_thai")
    private Boolean trangThai = true;

    public enum LoaiGiamGia {
        PHAN_TRAM, SO_TIEN
    }
}
