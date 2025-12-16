package com.example.petlorshop.services;

import com.example.petlorshop.dto.AddToCartRequest;
import com.example.petlorshop.dto.CartItemResponse;
import com.example.petlorshop.dto.GioHangResponse;
import com.example.petlorshop.models.*;
import com.example.petlorshop.repositories.ChiTietGioHangRepository;
import com.example.petlorshop.repositories.GioHangRepository;
import com.example.petlorshop.repositories.NguoiDungRepository;
import com.example.petlorshop.repositories.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class GioHangService {

    @Autowired
    private GioHangRepository gioHangRepository;

    @Autowired
    private ChiTietGioHangRepository chiTietGioHangRepository;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private SanPhamRepository sanPhamRepository;

    public GioHangResponse getGioHangByUserId(Integer userId) {
        GioHang gioHang = findOrCreateCartByUserId(userId);
        return mapToGioHangResponse(gioHang);
    }

    public GioHangResponse themSanPhamVaoGio(AddToCartRequest request) {
        GioHang gioHang = findOrCreateCartByUserId(request.getUserId());
        SanPham sanPham = sanPhamRepository.findById(request.getSanPhamId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + request.getSanPhamId()));

        Optional<ChiTietGioHang> existingItemOpt = chiTietGioHangRepository.findByGioHang_GioHangIdAndSanPham_SanPhamId(gioHang.getGioHangId(), sanPham.getSanPhamId());

        if (existingItemOpt.isPresent()) {
            // Nếu sản phẩm đã có, chỉ cập nhật số lượng
            ChiTietGioHang item = existingItemOpt.get();
            item.setSoLuong(item.getSoLuong() + request.getSoLuong());
            chiTietGioHangRepository.save(item);
        } else {
            // Nếu sản phẩm chưa có, tạo mới và thêm vào giỏ hàng
            ChiTietGioHang newItem = new ChiTietGioHang();
            newItem.setGioHang(gioHang);
            newItem.setSanPham(sanPham);
            newItem.setSoLuong(request.getSoLuong());
            
            // **FIX: Thêm chi tiết mới vào danh sách của giỏ hàng trong bộ nhớ**
            gioHang.getChiTietGioHangList().add(newItem);
            
            // Lưu giỏ hàng sẽ tự động lưu các chi tiết mới nhờ CascadeType.ALL
            gioHangRepository.save(gioHang);
        }
        
        // Không cần query lại, đối tượng gioHang đã được cập nhật
        return mapToGioHangResponse(gioHang);
    }

    public GioHangResponse xoaSanPhamKhoiGio(Integer userId, Integer sanPhamId) {
        GioHang gioHang = gioHangRepository.findByNguoiDung_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng cho người dùng."));

        // **FIX: Xóa item khỏi list để orphanRemoval hoạt động**
        gioHang.getChiTietGioHangList().removeIf(item -> item.getSanPham().getSanPhamId().equals(sanPhamId));
        
        gioHangRepository.save(gioHang);

        return mapToGioHangResponse(gioHang);
    }

    public GioHangResponse capNhatSoLuong(Integer userId, Integer sanPhamId, int soLuongMoi) {
        if (soLuongMoi <= 0) {
            return xoaSanPhamKhoiGio(userId, sanPhamId);
        }

        GioHang gioHang = gioHangRepository.findByNguoiDung_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng cho người dùng."));

        ChiTietGioHang itemToUpdate = gioHang.getChiTietGioHangList().stream()
                .filter(item -> item.getSanPham().getSanPhamId().equals(sanPhamId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Sản phẩm không có trong giỏ hàng."));

        itemToUpdate.setSoLuong(soLuongMoi);
        gioHangRepository.save(gioHang);

        return mapToGioHangResponse(gioHang);
    }

    private GioHang findOrCreateCartByUserId(Integer userId) {
        return gioHangRepository.findByNguoiDung_UserId(userId)
                .orElseGet(() -> {
                    NguoiDung nguoiDung = nguoiDungRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + userId));
                    GioHang newCart = new GioHang();
                    newCart.setNguoiDung(nguoiDung);
                    return gioHangRepository.save(newCart);
                });
    }

    private GioHangResponse mapToGioHangResponse(GioHang gioHang) {
        List<CartItemResponse> cartItems = gioHang.getChiTietGioHangList().stream()
                .map(this::mapToCartItemResponse)
                .collect(Collectors.toList());

        BigDecimal tongTien = cartItems.stream()
                .map(CartItemResponse::getThanhTien)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        int tongSoLuong = cartItems.stream().mapToInt(CartItemResponse::getSoLuong).sum();

        return new GioHangResponse(
                gioHang.getGioHangId(),
                gioHang.getNguoiDung().getUserId(),
                cartItems,
                tongSoLuong,
                tongTien
        );
    }

    private CartItemResponse mapToCartItemResponse(ChiTietGioHang chiTiet) {
        SanPham sanPham = chiTiet.getSanPham();
        BigDecimal thanhTien = sanPham.getGia().multiply(BigDecimal.valueOf(chiTiet.getSoLuong()));
        return new CartItemResponse(
                chiTiet.getChiTietGioHangId(),
                sanPham.getSanPhamId(),
                sanPham.getTenSanPham(),
                sanPham.getHinhAnh(),
                sanPham.getGia(),
                chiTiet.getSoLuong(),
                thanhTien
        );
    }
}
