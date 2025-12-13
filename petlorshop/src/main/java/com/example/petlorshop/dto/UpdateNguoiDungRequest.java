package com.example.petlorshop.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateNguoiDungRequest {

    @NotBlank(message = "Họ tên không được để trống")
    private String hoTen;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;

    // Password can be optional. If it's null or empty, it won't be updated.
    private String password;

    private String soDienThoai;

    private String diaChi;
}
