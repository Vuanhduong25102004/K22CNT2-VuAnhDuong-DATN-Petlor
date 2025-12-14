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
public class ChiTietDonHangResponse {
    private Integer chiTietId;
    private Integer soLuong;
    private BigDecimal donGiaLucMua;
    private Integer sanPhamId;
    private String tenSanPham;
    private String hinhAnhUrl;
}
