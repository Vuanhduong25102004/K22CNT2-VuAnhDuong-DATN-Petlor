package com.example.petlorshop.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class LichHenResponse {
    private Integer lichHenId;
    private LocalDateTime thoiGianBatDau;
    private LocalDateTime thoiGianKetThuc;
    
    @JsonProperty("trangThaiLichHen")
    private String status;
    
    private String ghiChuKhachHang;
    
    // Thông tin khách hàng
    private Integer userId;
    private String tenKhachHang;
    private String soDienThoaiKhachHang;

    // Thông tin thú cưng
    private Integer thuCungId;
    private String tenThuCung;

    // Thông tin dịch vụ
    private Integer dichVuId;
    private String tenDichVu;

    // Thông tin nhân viên (có thể null nếu chưa phân công)
    private Integer nhanVienId;
    private String tenNhanVien;

    public LichHenResponse(Integer lichHenId, LocalDateTime thoiGianBatDau, LocalDateTime thoiGianKetThuc, String status, String ghiChuKhachHang, Integer userId, String tenKhachHang, String soDienThoaiKhachHang, Integer thuCungId, String tenThuCung, Integer dichVuId, String tenDichVu, Integer nhanVienId, String tenNhanVien) {
        this.lichHenId = lichHenId;
        this.thoiGianBatDau = thoiGianBatDau;
        this.thoiGianKetThuc = thoiGianKetThuc;
        this.status = status;
        this.ghiChuKhachHang = ghiChuKhachHang;
        this.userId = userId;
        this.tenKhachHang = tenKhachHang;
        this.soDienThoaiKhachHang = soDienThoaiKhachHang;
        this.thuCungId = thuCungId;
        this.tenThuCung = tenThuCung;
        this.dichVuId = dichVuId;
        this.tenDichVu = tenDichVu;
        this.nhanVienId = nhanVienId;
        this.tenNhanVien = tenNhanVien;
    }
}
