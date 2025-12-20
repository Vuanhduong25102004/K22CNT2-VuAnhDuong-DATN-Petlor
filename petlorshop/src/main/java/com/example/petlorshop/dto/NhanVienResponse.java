package com.example.petlorshop.dto;

import com.example.petlorshop.models.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NhanVienResponse {
    private Integer nhanVienId;
    private String hoTen;
    private String chucVu;
    private String soDienThoai;
    private String email;
    private String chuyenKhoa;
    private String kinhNghiem;
    private String anhDaiDien;
    private Role role; // Đã đổi từ String sang Role
    private Integer userId;
}
