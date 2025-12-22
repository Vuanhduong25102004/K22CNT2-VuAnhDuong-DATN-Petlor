package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.PhieuNhapRequest;
import com.example.petlorshop.dto.PhieuNhapResponse;
import com.example.petlorshop.services.PhieuNhapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/phieu-nhap")
public class PhieuNhapController {

    @Autowired
    private PhieuNhapService phieuNhapService;

    @GetMapping
    public ResponseEntity<Page<PhieuNhapResponse>> getAllPhieuNhap(Pageable pageable) {
        return ResponseEntity.ok(phieuNhapService.getAllPhieuNhap(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhieuNhapResponse> getPhieuNhapById(@PathVariable Integer id) {
        return phieuNhapService.getPhieuNhapById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PhieuNhapResponse> createPhieuNhap(@RequestBody PhieuNhapRequest request) {
        return ResponseEntity.ok(phieuNhapService.createPhieuNhap(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePhieuNhap(@PathVariable Integer id) {
        phieuNhapService.deletePhieuNhap(id);
        return ResponseEntity.ok(Map.of("message", "Xóa phiếu nhập thành công (Đã hoàn tác kho)"));
    }
}
