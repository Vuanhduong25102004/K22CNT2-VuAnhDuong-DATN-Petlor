package com.example.petlorshop.services;

import com.example.petlorshop.dto.*;
import com.example.petlorshop.models.*;
import com.example.petlorshop.repositories.DonHangRepository;
import com.example.petlorshop.repositories.KhuyenMaiRepository;
import com.example.petlorshop.repositories.NguoiDungRepository;
import com.example.petlorshop.repositories.SanPhamRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DonHangService {

    @Autowired
    private DonHangRepository donHangRepository;
    @Autowired
    private NguoiDungRepository nguoiDungRepository;
    @Autowired
    private SanPhamRepository sanPhamRepository;
    @Autowired
    private KhuyenMaiRepository khuyenMaiRepository;

    public Page<DonHangResponse> getAllDonHang(Pageable pageable) {
        return donHangRepository.findAll(pageable)
                .map(this::convertToResponse);
    }

    public Optional<DonHangResponse> getDonHangById(Integer id) {
        return donHangRepository.findById(id).map(this::convertToResponse);
    }

    @Transactional
    public DonHang createDonHang(DonHangRequest donHangRequest) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(donHangRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + donHangRequest.getUserId()));

        DonHang donHang = new DonHang();
        donHang.setNguoiDung(nguoiDung);
        donHang.setDiaChiGiaoHang(donHangRequest.getDiaChiGiaoHang());
        donHang.setSoDienThoaiNhan(donHangRequest.getSoDienThoaiNhan());
        donHang.setPhuongThucThanhToan(donHangRequest.getPhuongThucThanhToan());
        donHang.setTrangThai(DonHang.TrangThaiDonHang.CHO_XU_LY);

        BigDecimal tongTienHang = BigDecimal.ZERO;
        List<ChiTietDonHang> chiTietItems = new ArrayList<>();

        for (ChiTietDonHangRequest itemRequest : donHangRequest.getChiTietDonHangs()) {
            SanPham sanPham = sanPhamRepository.findById(itemRequest.getSanPhamId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + itemRequest.getSanPhamId()));

            if (sanPham.getSoLuongTonKho() < itemRequest.getSoLuong()) {
                throw new RuntimeException("Sản phẩm '" + sanPham.getTenSanPham() + "' không đủ số lượng tồn kho.");
            }

            BigDecimal giaBan = Optional.ofNullable(sanPham.getGiaGiam()).orElse(sanPham.getGia());

            ChiTietDonHang chiTiet = new ChiTietDonHang();
            chiTiet.setDonHang(donHang);
            chiTiet.setSanPham(sanPham);
            chiTiet.setSoLuong(itemRequest.getSoLuong());
            chiTiet.setDonGia(giaBan);
            chiTietItems.add(chiTiet);

            tongTienHang = tongTienHang.add(giaBan.multiply(BigDecimal.valueOf(itemRequest.getSoLuong())));

            sanPham.setSoLuongTonKho(sanPham.getSoLuongTonKho() - itemRequest.getSoLuong());
            sanPhamRepository.save(sanPham);
        }
        
        donHang.setTongTienHang(tongTienHang);
        donHang.setChiTietDonHangs(chiTietItems);

        BigDecimal soTienGiam = BigDecimal.ZERO;
        if (donHangRequest.getMaKhuyenMai() != null && !donHangRequest.getMaKhuyenMai().isEmpty()) {
            KhuyenMai khuyenMai = khuyenMaiRepository.findByMaCode(donHangRequest.getMaKhuyenMai())
                .orElseThrow(() -> new RuntimeException("Mã khuyến mãi không hợp lệ."));
            
            if (tongTienHang.compareTo(khuyenMai.getDonToiThieu()) >= 0) {
                if (khuyenMai.getLoaiGiamGia() == KhuyenMai.LoaiGiamGia.PHAN_TRAM) {
                    soTienGiam = tongTienHang.multiply(khuyenMai.getGiaTriGiam().divide(new BigDecimal(100)));
                } else {
                    soTienGiam = khuyenMai.getGiaTriGiam();
                }
            }
            donHang.setKhuyenMai(khuyenMai);
        }

        donHang.setSoTienGiam(soTienGiam);
        donHang.setTongThanhToan(tongTienHang.subtract(soTienGiam));

        return donHangRepository.save(donHang);
    }

    public DonHangResponse updateDonHangStatus(Integer id, DonHangUpdateRequest updateRequest) {
        DonHang donHang = donHangRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Đơn hàng không tồn tại với id: " + id));

        if (updateRequest.getTrangThai() != null) {
            donHang.setTrangThai(updateRequest.getTrangThai());
        }

        if (StringUtils.hasText(updateRequest.getDiaChiGiaoHang())) {
            donHang.setDiaChiGiaoHang(updateRequest.getDiaChiGiaoHang());
        }

        DonHang savedDonHang = donHangRepository.save(donHang);
        return convertToResponse(savedDonHang);
    }

    public void deleteDonHang(Integer id) {
        donHangRepository.deleteById(id);
    }

    private DonHangResponse convertToResponse(DonHang donHang) {
        List<ChiTietDonHangResponse> chiTietResponses = donHang.getChiTietDonHangs().stream()
                .map(this::convertChiTietToResponse)
                .collect(Collectors.toList());

        return new DonHangResponse(
                donHang.getDonHangId(),
                donHang.getNgayDatHang(),
                donHang.getTongTienHang(),
                donHang.getSoTienGiam(),
                donHang.getTongThanhToan(),
                donHang.getTrangThai() != null ? donHang.getTrangThai().getDisplayName() : null, // Sửa ở đây
                donHang.getPhuongThucThanhToan(),
                donHang.getDiaChiGiaoHang(),
                donHang.getSoDienThoaiNhan(),
                donHang.getNguoiDung() != null ? donHang.getNguoiDung().getUserId() : null,
                donHang.getNguoiDung() != null ? donHang.getNguoiDung().getHoTen() : null,
                donHang.getKhuyenMai() != null ? donHang.getKhuyenMai().getMaCode() : null,
                chiTietResponses
        );
    }

    private ChiTietDonHangResponse convertChiTietToResponse(ChiTietDonHang chiTiet) {
        SanPham sanPham = chiTiet.getSanPham();
        return new ChiTietDonHangResponse(
                chiTiet.getId(),
                chiTiet.getSoLuong(),
                chiTiet.getDonGia(),
                sanPham != null ? sanPham.getSanPhamId() : null,
                sanPham != null ? sanPham.getTenSanPham() : null,
                sanPham != null ? sanPham.getHinhAnh() : null
        );
    }
}
