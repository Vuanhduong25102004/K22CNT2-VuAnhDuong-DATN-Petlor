package com.example.petlorshop.controllers;

import com.example.petlorshop.models.SanPham;
import com.example.petlorshop.services.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/san-pham")
public class SanPhamController {

    @Autowired
    private SanPhamService sanPhamService;

    @GetMapping
    public List<SanPham> getAllSanPham() {
        return sanPhamService.getAllSanPham();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SanPham> getSanPhamById(@PathVariable Integer id) {
        return sanPhamService.getSanPhamById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public SanPham createSanPham(@RequestBody SanPham sanPham) {
        return sanPhamService.createSanPham(sanPham);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SanPham> updateSanPham(@PathVariable Integer id, @RequestBody SanPham sanPhamDetails) {
        try {
            SanPham updatedSanPham = sanPhamService.updateSanPham(id, sanPhamDetails);
            return ResponseEntity.ok(updatedSanPham);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteSanPham(@PathVariable Integer id) {
        try {
            sanPhamService.deleteSanPham(id);
            return ResponseEntity.ok(Map.of("message", "Xóa sản phẩm thành công"));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
