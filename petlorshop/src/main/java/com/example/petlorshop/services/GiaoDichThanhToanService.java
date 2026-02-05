package com.example.petlorshop.services;

import com.example.petlorshop.dto.GiaoDichThanhToanRequest;
import com.example.petlorshop.dto.GiaoDichThanhToanResponse;
import com.example.petlorshop.models.DonHang;
import com.example.petlorshop.models.GiaoDichThanhToan;
import com.example.petlorshop.repositories.DonHangRepository;
import com.example.petlorshop.repositories.GiaoDichThanhToanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GiaoDichThanhToanService {

    @Autowired
    private GiaoDichThanhToanRepository giaoDichThanhToanRepository;

    @Autowired
    private DonHangRepository donHangRepository;

    @Transactional
    public GiaoDichThanhToanResponse createGiaoDich(GiaoDichThanhToanRequest request) {
        DonHang donHang = donHangRepository.findById(request.getDonHangId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng: " + request.getDonHangId()));

        GiaoDichThanhToan gd = new GiaoDichThanhToan();
        gd.setDonHang(donHang);
        gd.setMaGiaoDich(request.getMaGiaoDich());
        gd.setSoTien(request.getSoTien());
        
        // Model GiaoDichThanhToan không có trường phuongThuc, bỏ qua setPhuongThuc
        
        gd.setTrangThai(request.getTrangThai() != null ? request.getTrangThai() : GiaoDichThanhToan.TrangThaiGiaoDich.CHO_XU_LY);
        gd.setNoiDungLoi(request.getNoiDungLoi());
        gd.setNgayTao(LocalDateTime.now());

        GiaoDichThanhToan saved = giaoDichThanhToanRepository.save(gd);
        return convertToResponse(saved);
    }
    
    @Transactional
    public GiaoDichThanhToan createGiaoDich(
            Integer donHangId,
            String maGiaoDich,
            BigDecimal soTien,
            String phuongThuc,
            String trangThai,
            String noiDung
    ) {
        DonHang donHang = donHangRepository.findById(donHangId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng: " + donHangId));

        GiaoDichThanhToan gd = new GiaoDichThanhToan();
        gd.setDonHang(donHang);
        gd.setMaGiaoDich(maGiaoDich);
        gd.setSoTien(soTien);
        
        // Model không có phuongThuc, bỏ qua
        
        try {
            gd.setTrangThai(GiaoDichThanhToan.TrangThaiGiaoDich.valueOf(trangThai));
        } catch (Exception e) {
            gd.setTrangThai(GiaoDichThanhToan.TrangThaiGiaoDich.CHO_XU_LY);
        }
        
        gd.setNoiDungLoi(noiDung);
        gd.setNgayTao(LocalDateTime.now());

        return giaoDichThanhToanRepository.save(gd);
    }

    public List<GiaoDichThanhToanResponse> getGiaoDichByDonHang(Integer donHangId) {
        List<GiaoDichThanhToan> list = giaoDichThanhToanRepository.findByDonHang_DonHangId(donHangId);
        return list.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    private GiaoDichThanhToanResponse convertToResponse(GiaoDichThanhToan gd) {
        return new GiaoDichThanhToanResponse(
                gd.getGiaoDichId(),
                gd.getDonHang().getDonHangId(),
                gd.getMaGiaoDich(),
                gd.getSoTien(),
                gd.getNgayTao(),
                gd.getTrangThai(),
                gd.getNoiDungLoi()
        );
    }
}
