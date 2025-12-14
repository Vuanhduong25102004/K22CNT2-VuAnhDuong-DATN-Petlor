package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamResponse {
    private Integer sanPhamId;
    private String tenSanPham;
    private String moTaChiTiet;
    private BigDecimal gia;
    private Integer soLuongTonKho;
    private String hinhAnhUrl;
    private Integer danhMucId;
    private String tenDanhMuc;
}
