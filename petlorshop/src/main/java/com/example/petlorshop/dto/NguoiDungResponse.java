package com.example.petlorshop.dto;

import com.example.petlorshop.models.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NguoiDungResponse {
    private Integer userId;
    private String hoTen;
    private String email;
    private String soDienThoai;
    private String diaChi;
    private LocalDateTime ngayTao;
    private Role role;
}
