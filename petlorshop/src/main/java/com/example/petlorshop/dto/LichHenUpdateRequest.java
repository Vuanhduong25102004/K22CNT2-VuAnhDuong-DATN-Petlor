package com.example.petlorshop.dto;

import com.example.petlorshop.models.TrangThaiLichHen;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LichHenUpdateRequest {
    private LocalDateTime thoiGianBatDau;
    private LocalDateTime thoiGianKetThuc;
    
    @JsonProperty("trangThaiLichHen") // Giữ tên JSON là "trangThaiLichHen" cho Frontend
    private TrangThaiLichHen status;
    
    private String ghiChuKhachHang;
}
