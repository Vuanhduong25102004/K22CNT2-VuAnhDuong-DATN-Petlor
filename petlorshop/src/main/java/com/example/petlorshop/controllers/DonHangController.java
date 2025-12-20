package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.DonHangRequest;
import com.example.petlorshop.dto.DonHangResponse;
import com.example.petlorshop.dto.DonHangUpdateRequest;
import com.example.petlorshop.models.DonHang;
import com.example.petlorshop.services.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/don-hang")
public class DonHangController {

    @Autowired
    private DonHangService donHangService;

    @GetMapping
    public Page<DonHangResponse> getAllDonHang(Pageable pageable) {
        return donHangService.getAllDonHang(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonHangResponse> getDonHangById(@PathVariable Integer id) {
        return donHangService.getDonHangById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createDonHang(@RequestBody DonHangRequest donHangRequest) {
        try {
            DonHang createdDonHang = donHangService.createDonHang(donHangRequest);
            // Trả về DTO thay vì Entity để tránh lỗi lazy loading
            return donHangService.getDonHangById(createdDonHang.getDonHangId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.internalServerError().build());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<DonHangResponse> updateDonHang(@PathVariable Integer id, @RequestBody DonHangUpdateRequest updateRequest) {
        try {
            DonHangResponse updatedDonHang = donHangService.updateDonHangStatus(id, updateRequest);
            return ResponseEntity.ok(updatedDonHang);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteDonHang(@PathVariable Integer id) {
        try {
            donHangService.deleteDonHang(id);
            return ResponseEntity.ok(Map.of("message", "Xóa đơn hàng thành công"));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
