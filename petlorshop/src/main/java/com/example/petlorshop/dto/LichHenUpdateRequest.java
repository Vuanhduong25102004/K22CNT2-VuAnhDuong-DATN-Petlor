package com.example.petlorshop.dto;

import com.example.petlorshop.models.LichHen; // Sửa import
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
    
    @JsonProperty("trangThai")
    private LichHen.TrangThai trangThai; // Sửa kiểu dữ liệu
    
    private String ghiChu; // Sửa tên trường
}
