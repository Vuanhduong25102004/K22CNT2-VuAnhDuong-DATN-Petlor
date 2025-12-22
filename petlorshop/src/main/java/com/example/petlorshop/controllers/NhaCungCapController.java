package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.NhaCungCapRequest;
import com.example.petlorshop.dto.NhaCungCapResponse;
import com.example.petlorshop.services.NhaCungCapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/nha-cung-cap")
public class NhaCungCapController {

    @Autowired
    private NhaCungCapService nhaCungCapService;

    @GetMapping
    public ResponseEntity<Page<NhaCungCapResponse>> getAllNhaCungCap(Pageable pageable) {
        return ResponseEntity.ok(nhaCungCapService.getAllNhaCungCap(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NhaCungCapResponse> getNhaCungCapById(@PathVariable Integer id) {
        return nhaCungCapService.getNhaCungCapById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<NhaCungCapResponse> createNhaCungCap(@RequestBody NhaCungCapRequest request) {
        return ResponseEntity.ok(nhaCungCapService.createNhaCungCap(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NhaCungCapResponse> updateNhaCungCap(@PathVariable Integer id, @RequestBody NhaCungCapRequest request) {
        return ResponseEntity.ok(nhaCungCapService.updateNhaCungCap(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteNhaCungCap(@PathVariable Integer id) {
        nhaCungCapService.deleteNhaCungCap(id);
        return ResponseEntity.ok(Map.of("message", "Xóa nhà cung cấp thành công"));
    }
}
