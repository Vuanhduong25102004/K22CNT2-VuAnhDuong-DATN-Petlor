package com.example.petlorshop.controllers;

import com.example.petlorshop.models.ChiTietDonHang;
import com.example.petlorshop.services.ChiTietDonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chi-tiet-don-hang")
public class ChiTietDonHangController {

    @Autowired
    private ChiTietDonHangService chiTietDonHangService;

    @GetMapping
    public List<ChiTietDonHang> getAllChiTietDonHang() {
        return chiTietDonHangService.getAllChiTietDonHang();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChiTietDonHang> getChiTietDonHangById(@PathVariable Integer id) {
        return chiTietDonHangService.getChiTietDonHangById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ChiTietDonHang createChiTietDonHang(@RequestBody ChiTietDonHang chiTietDonHang) {
        return chiTietDonHangService.createChiTietDonHang(chiTietDonHang);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChiTietDonHang> updateChiTietDonHang(@PathVariable Integer id, @RequestBody ChiTietDonHang chiTietDonHangDetails) {
        try {
            ChiTietDonHang updatedChiTietDonHang = chiTietDonHangService.updateChiTietDonHang(id, chiTietDonHangDetails);
            return ResponseEntity.ok(updatedChiTietDonHang);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteChiTietDonHang(@PathVariable Integer id) {
        try {
            chiTietDonHangService.deleteChiTietDonHang(id);
            return ResponseEntity.ok(Map.of("message", "Xóa chi tiết đơn hàng thành công"));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
