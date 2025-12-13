package com.example.petlorshop.controllers;

import com.example.petlorshop.models.NhanVien;
import com.example.petlorshop.services.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/nhan-vien")
public class NhanVienController {

    @Autowired
    private NhanVienService nhanVienService;

    @GetMapping
    public List<NhanVien> getAllNhanVien() {
        return nhanVienService.getAllNhanVien();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NhanVien> getNhanVienById(@PathVariable Integer id) {
        return nhanVienService.getNhanVienById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public NhanVien createNhanVien(@RequestBody NhanVien nhanVien) {
        return nhanVienService.createNhanVien(nhanVien);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NhanVien> updateNhanVien(@PathVariable Integer id, @RequestBody NhanVien nhanVienDetails) {
        try {
            NhanVien updatedNhanVien = nhanVienService.updateNhanVien(id, nhanVienDetails);
            return ResponseEntity.ok(updatedNhanVien);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteNhanVien(@PathVariable Integer id) {
        try {
            nhanVienService.deleteNhanVien(id);
            return ResponseEntity.ok(Map.of("message", "Xóa nhân viên thành công"));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
