package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {
    private BigDecimal doanhThuThangNay;
    private Long tongDonHang;
    private Long khachHangMoi;
    private Long dichVuDangChay;

    private List<StaffDto> danhSachNhanVien;

    private List<RevenueChartData> bieuDoDoanhThu;
    private List<TopProductDto> sanPhamBanChay;
    private List<TopServiceDto> dichVuPhoBien;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RevenueChartData {
        private Integer thang;
        private BigDecimal doanhThu;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TopProductDto {
        private String tenSanPham;
        private Long daBan;
        private BigDecimal doanhThu;
        private String hinhAnh;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TopServiceDto {
        private String tenDichVu;
        private Long luotSuDung;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class StaffDto {
        private String hoTen;
        private String chucVu;
        private String anhDaiDien;
    }
}
