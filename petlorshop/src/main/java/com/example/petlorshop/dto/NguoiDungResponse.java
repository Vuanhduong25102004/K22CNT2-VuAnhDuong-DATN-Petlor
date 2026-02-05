package com.example.petlorshop.dto;

import com.example.petlorshop.models.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NguoiDungResponse {
    private Integer userId;
    private String hoTen;
    private String email;
    private String soDienThoai;
    private String diaChi;
    private String anhDaiDien;
    private LocalDateTime ngayTao;
    private Role role;
    private Integer nhanVienId;
}
