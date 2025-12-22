package com.example.petlorshop.dto;

import com.example.petlorshop.models.GiaoDichThanhToan;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GiaoDichThanhToanRequest {
    private Integer donHangId;
    private String maGiaoDich;
    private BigDecimal soTien;
    private GiaoDichThanhToan.TrangThaiGiaoDich trangThai;
    private String noiDungLoi;
}
