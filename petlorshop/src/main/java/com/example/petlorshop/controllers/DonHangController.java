package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.DonHangRequest;
import com.example.petlorshop.dto.DonHangResponse;
import com.example.petlorshop.dto.DonHangUpdateRequest;
import com.example.petlorshop.models.DonHang;
import com.example.petlorshop.services.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/don-hang")
public class DonHangController {

    @Autowired
    private DonHangService donHangService;

    @GetMapping
    public List<DonHangResponse> getAllDonHang() {
        return donHangService.getAllDonHang();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonHangResponse> getDonHangById(@PathVariable String id) { // Tạm thời đổi thành String để debug
        System.out.println("DEBUG: Received ID request: " + id);
        try {
            Integer donHangId = Integer.parseInt(id);
            return donHangService.getDonHangById(donHangId)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (NumberFormatException e) {
            System.out.println("DEBUG: Error parsing ID: " + e.getMessage());
            throw e;
        }
    }

    @PostMapping
    public ResponseEntity<?> createDonHang(@RequestBody DonHangRequest donHangRequest) {
        try {
            DonHang createdDonHang = donHangService.createDonHang(donHangRequest);
            return ResponseEntity.ok(createdDonHang);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<DonHang> updateDonHang(@PathVariable Integer id, @RequestBody DonHangUpdateRequest updateRequest) {
        try {
            DonHang updatedDonHang = donHangService.updateDonHangStatus(id, updateRequest);
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
