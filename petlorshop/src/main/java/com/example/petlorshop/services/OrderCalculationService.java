package com.example.petlorshop.services;

import com.example.petlorshop.dto.ChiTietDonHangRequest;
import com.example.petlorshop.dto.OrderCalculationResult;
import com.example.petlorshop.models.ChiTietDonHang;
import com.example.petlorshop.models.KhuyenMai;
import com.example.petlorshop.models.SanPham;
import com.example.petlorshop.repositories.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderCalculationService {

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Autowired
    private KhuyenMaiService khuyenMaiService;
    
    @Autowired
    private GhtkService ghtkService;

    public OrderCalculationResult calculateOrder(
            List<ChiTietDonHangRequest> items, 
            String maKhuyenMai,
            String tinhThanh,
            String quanHuyen,
            String phuongXa,
            String diaChiChiTiet
    ) {
        BigDecimal tongTienHang = BigDecimal.ZERO;
        List<ChiTietDonHang> chiTietDonHangs = new ArrayList<>();
        int totalWeight = 0;

        for (ChiTietDonHangRequest itemRequest : items) {
            SanPham sanPham = sanPhamRepository.findById(itemRequest.getSanPhamId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + itemRequest.getSanPhamId()));

            if (sanPham.getSoLuongTonKho() < itemRequest.getSoLuong()) {
                throw new RuntimeException("Sản phẩm " + sanPham.getTenSanPham() + " không đủ số lượng tồn kho.");
            }

            BigDecimal giaBan = Optional.ofNullable(sanPham.getGiaGiam()).orElse(sanPham.getGia());
            BigDecimal thanhTien = giaBan.multiply(BigDecimal.valueOf(itemRequest.getSoLuong()));
            tongTienHang = tongTienHang.add(thanhTien);

            ChiTietDonHang chiTiet = new ChiTietDonHang();
            chiTiet.setSanPham(sanPham);
            chiTiet.setSoLuong(itemRequest.getSoLuong());
            chiTiet.setDonGia(giaBan);
            chiTietDonHangs.add(chiTiet);
            
            int weight = sanPham.getTrongLuong() != null ? sanPham.getTrongLuong() : 500;
            totalWeight += weight * itemRequest.getSoLuong();
        }

        BigDecimal soTienGiam = BigDecimal.ZERO;
        KhuyenMai khuyenMai = null;
        if (StringUtils.hasText(maKhuyenMai)) {
            soTienGiam = khuyenMaiService.tinhTienGiam(maKhuyenMai, tongTienHang);
            if (soTienGiam.compareTo(BigDecimal.ZERO) > 0) {
                khuyenMai = khuyenMaiService.getKhuyenMaiByMaCode(maKhuyenMai).orElse(null);
            }
        }
        
        BigDecimal phiVanChuyen = BigDecimal.ZERO;
        if (StringUtils.hasText(tinhThanh) && StringUtils.hasText(quanHuyen)) {
            phiVanChuyen = ghtkService.calculateShippingFee(
                tinhThanh, 
                quanHuyen, 
                phuongXa, 
                diaChiChiTiet, 
                totalWeight, 
                tongTienHang.intValue()
            );
        }

        BigDecimal tongThanhToan = tongTienHang.subtract(soTienGiam).add(phiVanChuyen);
        if (tongThanhToan.compareTo(BigDecimal.ZERO) < 0) {
            tongThanhToan = BigDecimal.ZERO;
        }

        return new OrderCalculationResult(
                tongTienHang,
                soTienGiam,
                phiVanChuyen,
                tongThanhToan,
                khuyenMai,
                chiTietDonHangs
        );
    }
}
