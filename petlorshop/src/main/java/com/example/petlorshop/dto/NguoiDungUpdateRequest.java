package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NguoiDungUpdateRequest {
    private String hoTen;
    private String email;
    private String password;
    private String soDienThoai;
    private String diaChi;
    private String role;
}
