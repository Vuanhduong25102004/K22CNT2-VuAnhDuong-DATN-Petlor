package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThuCungResponse {
    private Integer thuCungId;
    private String tenThuCung;
    private String chungLoai;
    private String giongLoai;
    private LocalDate ngaySinh;
    private String gioiTinh;
    private String ghiChuSucKhoe;
    private String hinhAnh; // Thêm trường hình ảnh
    private Integer userId;
    private String tenChu;
}
