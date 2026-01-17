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
    private String chungLoai; // Chó, Mèo...
    
    private Integer dichVuId;
    private Integer nhanVienId; // Optional
    private LocalDateTime thoiGianBatDau;
    private String ghiChu;
    
    private LichHen.LoaiLichHen loaiLichHen; // Thêm trường này
}
