package com.example.petlorshop.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ThuCungRequest {
    @NotBlank(message = "Tên thú cưng không được để trống")
    private String tenThuCung;

    private String chungLoai;

    private String giongLoai;

    private LocalDate ngaySinh;

    private String gioiTinh;

    private String ghiChuSucKhoe;

    @NotNull(message = "ID người dùng (chủ sở hữu) là bắt buộc")
    private Integer userId;
}
