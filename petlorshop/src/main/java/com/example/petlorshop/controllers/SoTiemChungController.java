package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.SoTiemChungRequest;
import com.example.petlorshop.dto.SoTiemChungResponse;
import com.example.petlorshop.services.SoTiemChungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/so-tiem-chung")
public class SoTiemChungController {

    @Autowired
    private SoTiemChungService soTiemChungService;

    @GetMapping
    public ResponseEntity<Page<SoTiemChungResponse>> getAllSoTiemChung(Pageable pageable, @RequestParam(required = false) String keyword) {
        return ResponseEntity.ok(soTiemChungService.getAllSoTiemChung(pageable, keyword));
    }

    @GetMapping("/thu-cung/{thuCungId}")
    public ResponseEntity<List<SoTiemChungResponse>> getSoTiemChungByThuCung(@PathVariable Integer thuCungId) {
        return ResponseEntity.ok(soTiemChungService.getSoTiemChungByThuCungId(thuCungId));
    }

    @PostMapping("/thu-cung/{thuCungId}")
    public ResponseEntity<SoTiemChungResponse> addSoTiemChung(@PathVariable Integer thuCungId, @RequestBody SoTiemChungRequest request) {
        return ResponseEntity.ok(soTiemChungService.addSoTiemChung(thuCungId, request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SoTiemChungResponse> updateSoTiemChung(@PathVariable Integer id, @RequestBody SoTiemChungRequest request) {
        return ResponseEntity.ok(soTiemChungService.updateSoTiemChung(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSoTiemChung(@PathVariable Integer id) {
        soTiemChungService.deleteSoTiemChung(id);
        return ResponseEntity.noContent().build();
    }
}
