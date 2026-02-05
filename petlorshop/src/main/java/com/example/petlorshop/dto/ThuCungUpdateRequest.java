package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
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
    private BigDecimal canNang;
    private String ghiChuSucKhoe;
    
    private Integer userId; 
    private String tenChuSoHuu;
    private String soDienThoaiChuSoHuu;
}
