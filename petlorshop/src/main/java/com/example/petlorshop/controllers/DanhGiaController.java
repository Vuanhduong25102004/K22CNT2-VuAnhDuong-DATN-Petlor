package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.DanhGiaBulkRequest;
import com.example.petlorshop.dto.DanhGiaRequest;
import com.example.petlorshop.dto.DanhGiaResponse;
import com.example.petlorshop.services.DanhGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/danh-gia")
public class DanhGiaController {

    @Autowired
    private DanhGiaService danhGiaService;

    @GetMapping("/admin")
    public ResponseEntity<Page<DanhGiaResponse>> getAllDanhGiaForAdmin(Pageable pageable) {
        return ResponseEntity.ok(danhGiaService.getAllDanhGia(pageable));
    }

    @GetMapping
    public ResponseEntity<Page<DanhGiaResponse>> getAllDanhGia(Pageable pageable) {
        return ResponseEntity.ok(danhGiaService.getAllDanhGia(pageable));
    }

    @PostMapping
    public ResponseEntity<DanhGiaResponse> createDanhGia(@RequestBody DanhGiaRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(danhGiaService.createDanhGia(email, request));
    }
    
    @PostMapping("/bulk")
    public ResponseEntity<List<DanhGiaResponse>> createBulkDanhGia(@RequestBody DanhGiaBulkRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(danhGiaService.createBulkDanhGia(email, request));
    }

    @GetMapping("/san-pham/{sanPhamId}")
    public ResponseEntity<Page<DanhGiaResponse>> getDanhGiaBySanPham(@PathVariable Integer sanPhamId, Pageable pageable) {
        return ResponseEntity.ok(danhGiaService.getDanhGiaBySanPham(sanPhamId, pageable));
    }
    
    @PostMapping("/{id}/reply")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPTIONIST')")
    public ResponseEntity<DanhGiaResponse> replyToReview(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        String phanHoi = body.get("phanHoi");
        if (phanHoi == null || phanHoi.trim().isEmpty()) {
            throw new RuntimeException("Nội dung phản hồi không được để trống");
        }
        return ResponseEntity.ok(danhGiaService.replyToReview(id, phanHoi));
    }
}
