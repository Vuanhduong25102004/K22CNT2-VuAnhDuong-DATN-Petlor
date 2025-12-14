package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DonHangResponse {
    private Integer donHangId;
    private LocalDateTime ngayDatHang;
    private BigDecimal tongTien;
    private String trangThaiDonHang;
    private String diaChiGiaoHang;
    private Integer userId;
    private String tenNguoiDung;
    private List<ChiTietDonHangResponse> chiTietDonHangs;
}
