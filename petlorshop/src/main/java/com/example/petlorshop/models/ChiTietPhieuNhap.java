package com.example.petlorshop.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "chi_tiet_phieu_nhap")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietPhieuNhap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ctpn_id")
    private Integer ctpnId;

    @ManyToOne
    @JoinColumn(name = "phieu_nhap_id", nullable = false)
    private PhieuNhap phieuNhap;

    @ManyToOne
    @JoinColumn(name = "san_pham_id", nullable = false)
    private SanPham sanPham;

    @Column(name = "so_luong", nullable = false)
    private Integer soLuong;

    @Column(name = "gia_nhap", nullable = false)
    private BigDecimal giaNhap;
}
