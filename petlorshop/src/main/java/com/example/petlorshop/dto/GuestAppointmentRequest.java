package com.example.petlorshop.dto;

import com.example.petlorshop.models.LichHen;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GuestAppointmentRequest {
    private String tenKhachHang;
    private String soDienThoaiKhachHang;
    private String emailKhachHang;
    
    private String tenThuCung;
    private String chungLoai;
    
    private Integer dichVuId;
    private Integer nhanVienId;
    private LocalDateTime thoiGianBatDau;
    private String ghiChu;
    
    private LichHen.LoaiLichHen loaiLichHen;
}
