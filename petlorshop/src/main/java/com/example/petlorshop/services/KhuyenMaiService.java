package com.example.petlorshop.services;

import com.example.petlorshop.models.KhuyenMai;
import com.example.petlorshop.repositories.KhuyenMaiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class KhuyenMaiService {

    @Autowired
    private KhuyenMaiRepository khuyenMaiRepository;

    @Transactional(readOnly = true)
    public Page<KhuyenMai> getAllKhuyenMai(Pageable pageable) {
        return khuyenMaiRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Optional<KhuyenMai> getKhuyenMaiById(Integer id) {
        return khuyenMaiRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<KhuyenMai> getKhuyenMaiByMaCode(String maCode) {
        return khuyenMaiRepository.findByMaCode(maCode);
    }

    @Transactional
    public KhuyenMai createKhuyenMai(KhuyenMai khuyenMai) {
        return khuyenMaiRepository.save(khuyenMai);
    }

    @Transactional
    public Optional<KhuyenMai> updateKhuyenMai(Integer id, KhuyenMai khuyenMaiDetails) {
        return khuyenMaiRepository.findById(id).map(khuyenMai -> {
            khuyenMai.setMaCode(khuyenMaiDetails.getMaCode());
            khuyenMai.setMoTa(khuyenMaiDetails.getMoTa());
            khuyenMai.setLoaiGiamGia(khuyenMaiDetails.getLoaiGiamGia());
            khuyenMai.setGiaTriGiam(khuyenMaiDetails.getGiaTriGiam());
            khuyenMai.setNgayBatDau(khuyenMaiDetails.getNgayBatDau());
            khuyenMai.setNgayKetThuc(khuyenMaiDetails.getNgayKetThuc());
            khuyenMai.setSoLuongGioiHan(khuyenMaiDetails.getSoLuongGioiHan());
            khuyenMai.setDonToiThieu(khuyenMaiDetails.getDonToiThieu());
            khuyenMai.setTrangThai(khuyenMaiDetails.getTrangThai());
            return khuyenMaiRepository.save(khuyenMai);
        });
    }

    @Transactional
    public boolean deleteKhuyenMai(Integer id) {
        if (khuyenMaiRepository.existsById(id)) {
            khuyenMaiRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // --- CÁC CHỨC NĂNG NGHIỆP VỤ BỔ SUNG ---

    @Transactional(readOnly = true)
    public String kiemTraKhuyenMai(String maCode, BigDecimal giaTriDonHang) {
        Optional<KhuyenMai> khuyenMaiOpt = khuyenMaiRepository.findByMaCode(maCode);

        if (khuyenMaiOpt.isEmpty()) {
            return "Mã khuyến mãi không tồn tại.";
        }

        KhuyenMai km = khuyenMaiOpt.get();

        if (!km.getTrangThai()) {
            return "Mã khuyến mãi đang bị khóa.";
        }

        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(km.getNgayBatDau())) {
            return "Mã khuyến mãi chưa đến thời gian áp dụng.";
        }

        if (now.isAfter(km.getNgayKetThuc())) {
            return "Mã khuyến mãi đã hết hạn.";
        }

        if (km.getSoLuongGioiHan() != null && km.getSoLuongGioiHan() <= 0) {
            return "Mã khuyến mãi đã hết lượt sử dụng.";
        }

        if (km.getDonToiThieu() != null && giaTriDonHang.compareTo(km.getDonToiThieu()) < 0) {
            return "Đơn hàng chưa đạt giá trị tối thiểu để áp dụng mã này.";
        }

        return "Hợp lệ";
    }

    @Transactional(readOnly = true)
    public BigDecimal tinhTienGiam(String maCode, BigDecimal giaTriDonHang) {
        String ketQuaKiemTra = kiemTraKhuyenMai(maCode, giaTriDonHang);
        if (!"Hợp lệ".equals(ketQuaKiemTra)) {
            return BigDecimal.ZERO;
        }

        KhuyenMai km = khuyenMaiRepository.findByMaCode(maCode).get();
        BigDecimal soTienGiam = BigDecimal.ZERO;

        if (km.getLoaiGiamGia() == KhuyenMai.LoaiGiamGia.SO_TIEN) {
            soTienGiam = km.getGiaTriGiam();
        } else if (km.getLoaiGiamGia() == KhuyenMai.LoaiGiamGia.PHAN_TRAM) {
            soTienGiam = giaTriDonHang.multiply(km.getGiaTriGiam())
                    .divide(BigDecimal.valueOf(100));
        }

        if (soTienGiam.compareTo(giaTriDonHang) > 0) {
            soTienGiam = giaTriDonHang;
        }

        return soTienGiam;
    }

    @Transactional
    public void suDungMaKhuyenMai(String maCode) {
        Optional<KhuyenMai> khuyenMaiOpt = khuyenMaiRepository.findByMaCode(maCode);
        if (khuyenMaiOpt.isPresent()) {
            KhuyenMai km = khuyenMaiOpt.get();
            if (km.getSoLuongGioiHan() != null && km.getSoLuongGioiHan() > 0) {
                km.setSoLuongGioiHan(km.getSoLuongGioiHan() - 1);
                khuyenMaiRepository.save(km);
            }
        }
    }
}
