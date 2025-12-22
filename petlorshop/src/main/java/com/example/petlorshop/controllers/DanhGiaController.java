package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.DanhGiaRequest;
import com.example.petlorshop.dto.DanhGiaResponse;
import com.example.petlorshop.models.DanhGia;
import com.example.petlorshop.services.DanhGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/danh-gia")
public class DanhGiaController {

    @Autowired
    private DanhGiaService danhGiaService;

    // --- CLIENT APIs ---

    @GetMapping("/san-pham/{sanPhamId}")
    public ResponseEntity<List<DanhGiaResponse>> getDanhGiaBySanPham(@PathVariable Integer sanPhamId) {
        return ResponseEntity.ok(danhGiaService.getDanhGiaBySanPham(sanPhamId));
    }

    @GetMapping("/dich-vu/{dichVuId}")
    public ResponseEntity<List<DanhGiaResponse>> getDanhGiaByDichVu(@PathVariable Integer dichVuId) {
        return ResponseEntity.ok(danhGiaService.getDanhGiaByDichVu(dichVuId));
    }

    @PostMapping
    public ResponseEntity<DanhGiaResponse> createDanhGia(@RequestBody DanhGiaRequest request) {
        return ResponseEntity.ok(danhGiaService.createDanhGia(request));
    }

    // --- ADMIN APIs ---

    @GetMapping("/admin")
    public Page<DanhGia> getAllDanhGiaAdmin(
            @RequestParam(required = false) Integer soSao,
            @RequestParam(required = false) Boolean trangThai,
            Pageable pageable) {
        return danhGiaService.getAllDanhGiaAdmin(soSao, trangThai, pageable);
    }

    @PutMapping("/admin/{id}/trang-thai")
    public ResponseEntity<DanhGia> updateTrangThaiHienThi(@PathVariable Integer id, @RequestBody Map<String, Boolean> payload) {
        DanhGia updatedDanhGia = danhGiaService.updateTrangThaiHienThi(id, payload.get("trangThai"));
        return ResponseEntity.ok(updatedDanhGia);
    }

    @PutMapping("/admin/{id}/phan-hoi")
    public ResponseEntity<DanhGia> replyDanhGia(@PathVariable Integer id, @RequestBody Map<String, String> payload) {
        DanhGia updatedDanhGia = danhGiaService.replyDanhGia(id, payload.get("phanHoi"));
        return ResponseEntity.ok(updatedDanhGia);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteDanhGia(@PathVariable Integer id) {
        danhGiaService.deleteDanhGia(id);
        return ResponseEntity.ok().build();
    }
}
