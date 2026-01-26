package com.example.petlorshop.dto;

import com.example.petlorshop.models.BaiViet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaiVietResponse {
    private Integer baiVietId;
    private String tieuDe;
    private String slug;
    private String noiDung;
    private String anhBia;
    private LocalDateTime ngayDang;
    private String tenTacGia;
    private String anhTacGia; // Thêm trường này
    private String tenDanhMuc;
    private BaiViet.TrangThaiBaiViet trangThai;
}
