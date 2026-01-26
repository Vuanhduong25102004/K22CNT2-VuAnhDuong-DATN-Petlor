package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DonThuocResponse {
    private Integer donThuocId;
    private Integer lichHenId;
    private String tenBacSi;
    private String anhBacSi; // Thêm trường này
    private String tenKhachHang;
    private String sdtKhachHang;
    private String tenThuCung;
    private String anhThuCung;
    private String chanDoan;
    private String loiDan;
    private LocalDateTime ngayKe;
    private String trangThai;
    private List<ChiTietDonThuocResponse> danhSachThuoc;
    private BigDecimal tongTienThuoc;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChiTietDonThuocResponse {
        private Integer thuocId;
        private String tenThuoc;
        private String donViTinh;
        private Integer soLuong;
        private String lieuDung;
        private BigDecimal donGia;
        private BigDecimal thanhTien;
    }
}
