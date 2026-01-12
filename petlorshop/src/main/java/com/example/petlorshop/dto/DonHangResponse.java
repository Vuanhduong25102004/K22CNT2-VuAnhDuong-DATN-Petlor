package com.example.petlorshop.dto;

import com.example.petlorshop.models.DonHang;
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
    private BigDecimal tongTienHang;
    private BigDecimal soTienGiam;
    private BigDecimal tongThanhToan;
    private String trangThai; // Sửa thành String
    private DonHang.PhuongThucThanhToan phuongThucThanhToan;
    private String diaChiGiaoHang;
    private String soDienThoaiNhan;
    private String lyDoHuy;
    private Integer userId;
    private String tenNguoiDung;
    private String maKhuyenMai;
    private List<ChiTietDonHangResponse> chiTietDonHangs;
}
