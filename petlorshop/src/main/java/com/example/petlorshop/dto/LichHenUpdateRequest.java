package com.example.petlorshop.dto;

import com.example.petlorshop.models.LichHen;
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
    private LichHen.TrangThai trangThai;
    
    private String ghiChu;
    
    private LichHen.LoaiLichHen loaiLichHen;
}
