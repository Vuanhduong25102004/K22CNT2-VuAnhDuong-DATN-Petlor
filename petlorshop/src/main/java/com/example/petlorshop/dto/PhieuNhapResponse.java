package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhieuNhapResponse {
    private Integer phieuNhapId;
    private String tenNhaCungCap;
    private String tenNhanVien;
    private LocalDateTime ngayNhap;
    private BigDecimal tongTien;
    private String ghiChu;
    private List<ChiTietPhieuNhapResponse> chiTietList;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChiTietPhieuNhapResponse {
        private Integer sanPhamId;
        private String tenSanPham;
        private Integer soLuong;
        private BigDecimal giaNhap;
    }
}
