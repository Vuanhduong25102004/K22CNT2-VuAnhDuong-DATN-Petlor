package com.example.petlorshop.dto;

import lombok.Data;

import java.util.List;

@Data
public class DonHangRequest {
    private Integer userId;
    private String diaChiGiaoHang;
    private List<ChiTietDonHangRequest> chiTietDonHangs;
}
