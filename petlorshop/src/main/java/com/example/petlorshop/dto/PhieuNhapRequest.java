package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhieuNhapRequest {
    private Integer nccId;
    private Integer nhanVienId;
    private String ghiChu;
    private List<ChiTietPhieuNhapDto> chiTietList;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChiTietPhieuNhapDto {
        private Integer sanPhamId;
        
        private String tenSanPham;
        private String moTaChiTiet;
        private BigDecimal giaBan;
        private Integer danhMucId;
        private String hinhAnh;

        private Integer soLuong;
        private BigDecimal giaNhap;
    }
}
