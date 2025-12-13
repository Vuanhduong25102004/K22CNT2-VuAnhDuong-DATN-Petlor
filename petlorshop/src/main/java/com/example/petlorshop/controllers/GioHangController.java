package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.AddToCartRequest;
import com.example.petlorshop.dto.GioHangResponse;
import com.example.petlorshop.models.NguoiDung;
import com.example.petlorshop.models.Role;
import com.example.petlorshop.repositories.NguoiDungRepository;
import com.example.petlorshop.services.GioHangService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/gio-hang")
public class GioHangController {

    @Autowired
    private GioHangService gioHangService;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    private void checkOwnership(Integer userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        NguoiDung currentUser = nguoiDungRepository.findByEmail(currentUsername)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại."));

        // Admin can access any cart, but a regular user can only access their own.
        if (currentUser.getRole() != Role.ADMIN && !currentUser.getUserId().equals(userId)) {
            throw new SecurityException("Bạn không có quyền truy cập vào giỏ hàng này.");
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<GioHangResponse> getGioHang(@PathVariable Integer userId) {
        try {
            checkOwnership(userId);
            GioHangResponse gioHang = gioHangService.getGioHangByUserId(userId);
            return ResponseEntity.ok(gioHang);
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<GioHangResponse> themVaoGio(@Valid @RequestBody AddToCartRequest request) {
        try {
            checkOwnership(request.getUserId());
            GioHangResponse gioHang = gioHangService.themSanPhamVaoGio(request);
            return ResponseEntity.ok(gioHang);
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/update/{userId}/{sanPhamId}")
    public ResponseEntity<GioHangResponse> capNhatSoLuong(@PathVariable Integer userId,
                                                        @PathVariable Integer sanPhamId,
                                                        @RequestBody Map<String, Integer> body) {
        try {
            checkOwnership(userId);
            int soLuongMoi = body.get("soLuong");
            GioHangResponse gioHang = gioHangService.capNhatSoLuong(userId, sanPhamId, soLuongMoi);
            return ResponseEntity.ok(gioHang);
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/remove/{userId}/{sanPhamId}")
    public ResponseEntity<GioHangResponse> xoaKhoiGio(@PathVariable Integer userId, @PathVariable Integer sanPhamId) {
        try {
            checkOwnership(userId);
            GioHangResponse gioHang = gioHangService.xoaSanPhamKhoiGio(userId, sanPhamId);
            return ResponseEntity.ok(gioHang);
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
