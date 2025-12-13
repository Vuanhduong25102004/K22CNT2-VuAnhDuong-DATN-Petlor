package com.example.petlorshop.services;

import com.example.petlorshop.dto.ChiTietDonHangRequest;
import com.example.petlorshop.dto.DonHangRequest;
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

@Service
public class DonHangService {

    @Autowired
    private DonHangRepository donHangRepository;
    @Autowired
    private NguoiDungRepository nguoiDungRepository;
    @Autowired
    private SanPhamRepository sanPhamRepository;

    public List<DonHang> getAllDonHang() {
        return donHangRepository.findAll();
    }

    public Optional<DonHang> getDonHangById(Integer id) {
        return donHangRepository.findById(id);
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

            // a. Kiểm tra xem số lượng tồn kho có đủ không.
            if (sanPham.getSoLuongTonKho() < itemRequest.getSoLuong()) {
                throw new RuntimeException("Sản phẩm '" + sanPham.getTenSanPham() + "' không đủ số lượng tồn kho.");
            }

            ChiTietDonHang chiTiet = new ChiTietDonHang();
            chiTiet.setDonHang(donHang);
            chiTiet.setSanPham(sanPham);
            chiTiet.setSoLuong(itemRequest.getSoLuong());
            chiTiet.setDonGiaLucMua(sanPham.getGia());
            chiTietItems.add(chiTiet);

            // b. Tính toán tong_tien
            tongTien = tongTien.add(sanPham.getGia().multiply(BigDecimal.valueOf(itemRequest.getSoLuong())));

            // d. Trừ đi số lượng tồn kho của sản phẩm đã bán.
            sanPham.setSoLuongTonKho(sanPham.getSoLuongTonKho() - itemRequest.getSoLuong());
            sanPhamRepository.save(sanPham);
        }

        donHang.setTongTien(tongTien);
        // c. Gán danh sách chi tiết vào đơn hàng
        donHang.setChiTietDonHangs(chiTietItems);

        return donHangRepository.save(donHang);
    }


    public DonHang updateDonHang(Integer id, DonHang donHangDetails) {
        DonHang donHang = donHangRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Đơn hàng không tồn tại với id: " + id));

        donHang.setTrangThaiDonHang(donHangDetails.getTrangThaiDonHang());
        donHang.setDiaChiGiaoHang(donHangDetails.getDiaChiGiaoHang());

        return donHangRepository.save(donHang);
    }

    public void deleteDonHang(Integer id) {
        DonHang donHang = donHangRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Đơn hàng không tồn tại với id: " + id));
        donHangRepository.delete(donHang);
    }
}
