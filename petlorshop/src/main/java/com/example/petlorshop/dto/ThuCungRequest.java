package com.example.petlorshop.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ThuCungRequest {
    @NotBlank(message = "Tên thú cưng không được để trống")
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
