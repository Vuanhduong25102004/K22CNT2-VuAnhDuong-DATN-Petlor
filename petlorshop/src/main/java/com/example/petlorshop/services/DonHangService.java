package com.example.petlorshop.services;

import com.example.petlorshop.dto.*;
import com.example.petlorshop.models.*;
import com.example.petlorshop.repositories.DonHangRepository;
import com.example.petlorshop.repositories.NguoiDungRepository;
import com.example.petlorshop.repositories.SanPhamRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<DonHangResponse> getAllDonHang() {
        return donHangRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
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
        donHang.setNgayDatHang(LocalDateTime.now());
        donHang.setTrangThaiDonHang("ĐANG XỬ LÝ");

        BigDecimal tongTien = BigDecimal.ZERO;
        List<ChiTietDonHang> chiTietItems = new ArrayList<>();

        for (ChiTietDonHangRequest itemRequest : donHangRequest.getChiTietDonHangs()) {
            SanPham sanPham = sanPhamRepository.findById(itemRequest.getSanPhamId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + itemRequest.getSanPhamId()));

            if (sanPham.getSoLuongTonKho() < itemRequest.getSoLuong()) {
                throw new RuntimeException("Sản phẩm '" + sanPham.getTenSanPham() + "' không đủ số lượng tồn kho.");
            }

            ChiTietDonHang chiTiet = new ChiTietDonHang();
            chiTiet.setDonHang(donHang);
            chiTiet.setSanPham(sanPham);
            chiTiet.setSoLuong(itemRequest.getSoLuong());
            chiTiet.setDonGiaLucMua(sanPham.getGia());
            chiTietItems.add(chiTiet);

            tongTien = tongTien.add(sanPham.getGia().multiply(BigDecimal.valueOf(itemRequest.getSoLuong())));

            sanPham.setSoLuongTonKho(sanPham.getSoLuongTonKho() - itemRequest.getSoLuong());
            sanPhamRepository.save(sanPham);
        }

        donHang.setTongTien(tongTien);
        donHang.setChiTietDonHangs(chiTietItems);

        return donHangRepository.save(donHang);
    }

    public DonHang updateDonHangStatus(Integer id, DonHangUpdateRequest updateRequest) {
        DonHang donHang = donHangRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Đơn hàng không tồn tại với id: " + id));

        donHang.setTrangThaiDonHang(updateRequest.getTrangThaiDonHang());

        return donHangRepository.save(donHang);
    }

    public void deleteDonHang(Integer id) {
        DonHang donHang = donHangRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Đơn hàng không tồn tại với id: " + id));
        donHangRepository.delete(donHang);
    }

    private DonHangResponse convertToResponse(DonHang donHang) {
        List<ChiTietDonHangResponse> chiTietResponses = donHang.getChiTietDonHangs().stream()
                .map(this::convertChiTietToResponse)
                .collect(Collectors.toList());

        return new DonHangResponse(
                donHang.getDonHangId(),
                donHang.getNgayDatHang(),
                donHang.getTongTien(),
                donHang.getTrangThaiDonHang(),
                donHang.getDiaChiGiaoHang(),
                donHang.getNguoiDung() != null ? donHang.getNguoiDung().getUserId() : null,
                donHang.getNguoiDung() != null ? donHang.getNguoiDung().getHoTen() : null,
                chiTietResponses
        );
    }

    private ChiTietDonHangResponse convertChiTietToResponse(ChiTietDonHang chiTiet) {
        SanPham sanPham = chiTiet.getSanPham();
        return new ChiTietDonHangResponse(
                chiTiet.getChiTietId(),
                chiTiet.getSoLuong(),
                chiTiet.getDonGiaLucMua(),
                sanPham != null ? sanPham.getSanPhamId() : null,
                sanPham != null ? sanPham.getTenSanPham() : null,
                sanPham != null ? sanPham.getHinhAnh() : null
        );
    }
}
