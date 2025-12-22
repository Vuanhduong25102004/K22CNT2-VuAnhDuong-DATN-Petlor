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
    private Integer soSao;
    private String noiDung;
    private String hinhAnh;
    private LocalDateTime ngayTao;
    private String phanHoi; // Admin trả lời
}
