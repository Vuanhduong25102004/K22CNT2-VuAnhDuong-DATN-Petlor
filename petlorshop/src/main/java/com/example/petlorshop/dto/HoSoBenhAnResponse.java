package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HoSoBenhAnResponse {
    private Integer thuCungId;
    private String tenThuCung;
    private String chungLoai;
    private String giongLoai;
    private LocalDate ngaySinh;
    private String gioiTinh;
    private BigDecimal canNang;
    private String ghiChuSucKhoe;
    private String hinhAnh;

    private List<LichSuKham> lichSuKham;
    private List<LichSuTiemChung> lichSuTiemChung;
    private List<LichSuDonThuoc> lichSuDonThuoc; // Thêm danh sách đơn thuốc

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LichSuKham {
        private Integer lichHenId;
        private LocalDateTime ngayKham;
        private String dichVu;
        private String bacSi;
        private String chanDoan;
        private String ketLuan;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LichSuTiemChung {
        private Integer tiemChungId;
        private String tenVacXin;
        private LocalDate ngayTiem;
        private LocalDate ngayTaiChung;
        private String bacSi;
        private String ghiChu;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LichSuDonThuoc {
        private Integer donThuocId;
        private LocalDateTime ngayKe;
        private String bacSi;
        private String chanDoan;
        private String loiDan;
        private List<ChiTietThuoc> danhSachThuoc;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChiTietThuoc {
        private String tenThuoc;
        private Integer soLuong;
        private String lieuDung;
    }
}
