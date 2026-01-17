package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamResponse {
    private Integer sanPhamId;
    private String tenSanPham;
    private String moTaChiTiet;
    private BigDecimal gia;
    private BigDecimal giaGiam;
    private Integer soLuongTonKho;
    private String hinhAnh;
    private Integer trongLuong;
    private Integer danhMucId;
    private String tenDanhMuc;
    
    // Thuốc
    private LocalDate hanSuDung;
    private String soLo;
    private String donViTinh;
    private String thanhPhan;
    private String chiDinh;
}
