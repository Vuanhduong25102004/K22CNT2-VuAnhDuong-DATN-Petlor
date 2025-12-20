package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThuCungUpdateRequest {
    private String tenThuCung;
    private String chungLoai;
    private String giongLoai;
    private LocalDate ngaySinh;
    private String gioiTinh;
    private String ghiChuSucKhoe;
    
    // Thông tin đổi chủ
    private Integer userId; 
    private String tenChuSoHuu;
    private String soDienThoaiChuSoHuu;
}
