package com.example.petlorshop.dto;

import com.example.petlorshop.models.GiaoDichThanhToan;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GiaoDichThanhToanResponse {
    private Integer giaoDichId;
    private Integer donHangId;
    private String maGiaoDich;
    private BigDecimal soTien;
    private LocalDateTime ngayTao;
    private GiaoDichThanhToan.TrangThaiGiaoDich trangThai;
    private String noiDungLoi;
}
