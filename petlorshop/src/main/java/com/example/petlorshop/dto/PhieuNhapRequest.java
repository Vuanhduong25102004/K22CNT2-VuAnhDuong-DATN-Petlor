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
        // Nếu có ID thì là nhập thêm hàng cũ, nếu null thì là tạo mới
        private Integer sanPhamId;
        
        // Các trường này bắt buộc nếu sanPhamId là null (tạo mới)
        private String tenSanPham;
        private String moTaChiTiet;
        private BigDecimal giaBan; // Giá bán ra
        private Integer danhMucId;
        private String hinhAnh;

        // Thông tin nhập hàng
        private Integer soLuong;
        private BigDecimal giaNhap;
    }
}
