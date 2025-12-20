package com.example.petlorshop.dto;

import com.example.petlorshop.models.DonHang;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DonHangUpdateRequest {
    private DonHang.TrangThaiDonHang trangThai;
    private String diaChiGiaoHang;
}
