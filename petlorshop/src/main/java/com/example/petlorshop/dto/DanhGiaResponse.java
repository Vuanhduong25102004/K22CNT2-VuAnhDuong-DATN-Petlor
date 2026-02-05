package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DanhGiaResponse {
    private Integer danhGiaId;
    private String tenNguoiDung;
    private String anhDaiDien;
    private Integer soSao;
    private String noiDung;
    private LocalDateTime ngayDanhGia;
    
    private Integer sanPhamId;
    private String tenSanPham;
    private String hinhAnhSanPham;

    private String phanHoi;
    private LocalDateTime ngayPhanHoi;
}
