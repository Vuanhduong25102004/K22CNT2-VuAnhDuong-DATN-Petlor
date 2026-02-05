package com.example.petlorshop.controllers;

import com.example.petlorshop.models.KhuyenMai;
import com.example.petlorshop.services.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/khuyen-mai")
public class KhuyenMaiController {

    @Autowired
    private KhuyenMaiService khuyenMaiService;

    @GetMapping
    public Page<KhuyenMai> getAllKhuyenMai(Pageable pageable, @RequestParam(required = false) String keyword) {
        return khuyenMaiService.getAllKhuyenMai(pageable, keyword);
    }

    @GetMapping("/{id}")
    public ResponseEntity<KhuyenMai> getKhuyenMaiById(@PathVariable Integer id) {
        return khuyenMaiService.getKhuyenMaiById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public KhuyenMai createKhuyenMai(@RequestBody KhuyenMai khuyenMai) {
        return khuyenMaiService.createKhuyenMai(khuyenMai);
    }

    @PutMapping("/{id}")
    public ResponseEntity<KhuyenMai> updateKhuyenMai(@PathVariable Integer id, @RequestBody KhuyenMai khuyenMaiDetails) {
        return khuyenMaiService.updateKhuyenMai(id, khuyenMaiDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKhuyenMai(@PathVariable Integer id) {
        if (khuyenMaiService.deleteKhuyenMai(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/kiem-tra")
    public ResponseEntity<?> kiemTraKhuyenMai(@RequestBody Map<String, Object> payload) {
        String maCode = (String) payload.get("maCode");
        BigDecimal giaTriDonHang = new BigDecimal(payload.get("giaTriDonHang").toString());

        String ketQua = khuyenMaiService.kiemTraKhuyenMai(maCode, giaTriDonHang);

        if ("Hợp lệ".equals(ketQua)) {
            BigDecimal soTienGiam = khuyenMaiService.tinhTienGiam(maCode, giaTriDonHang);
            return ResponseEntity.ok(Map.of("status", "success", "message", "Mã hợp lệ.", "soTienGiam", soTienGiam));
        } else {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", ketQua));
        }
    }
}
