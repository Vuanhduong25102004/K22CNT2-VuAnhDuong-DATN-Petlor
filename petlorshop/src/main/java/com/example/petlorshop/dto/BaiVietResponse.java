package com.example.petlorshop.dto;

import com.example.petlorshop.models.BaiViet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BaiVietResponse {
    private Integer baiVietId;
    private String tieuDe;
    private String slug;
    private String noiDung;
    private String anhBia;
    private LocalDateTime ngayDang;
    private String tenTacGia;
    private String tenDanhMuc;
    private BaiViet.TrangThaiBaiViet trangThai;
}
