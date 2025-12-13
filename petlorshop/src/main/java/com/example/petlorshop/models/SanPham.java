package com.example.petlorshop.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "SanPham")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "san_pham_id")
    private Integer sanPhamId;

    @Column(name = "ten_san_pham", nullable = false, length = 255)
    private String tenSanPham;

    @Column(name = "mo_ta_chi_tiet", columnDefinition = "TEXT")
    private String moTaChiTiet;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal gia;

    @Column(name = "so_luong_ton_kho")
    private Integer soLuongTonKho;

    @Column(name = "hinh_anh_url", length = 255)
    private String hinhAnhUrl;

    // --- Relationships ---

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "danh_muc_id")
    private DanhMucSanPham danhMucSanPham;

    @JsonIgnore
    @OneToMany(mappedBy = "sanPham")
    private List<ChiTietDonHang> danhSachChiTietDonHang;
}