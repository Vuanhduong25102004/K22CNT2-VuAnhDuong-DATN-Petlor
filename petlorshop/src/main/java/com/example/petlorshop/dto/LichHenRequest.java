package com.example.petlorshop.dto;

import com.example.petlorshop.models.LichHen;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LichHenRequest {
    private Integer userId;
    private Integer thuCungId;
    private String tenThuCung;
    private String chungLoai;
    private String giongLoai;
    private java.time.LocalDate ngaySinh;
    private String gioiTinh;
    
    private String tenKhachHang;
    private String soDienThoaiKhachHang;

    private Integer dichVuId;
    private Integer nhanVienId;
    private LocalDateTime thoiGianBatDau;
    private String ghiChuKhachHang;
    
    private LichHen.LoaiLichHen loaiLichHen;
}
