package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.DonThuocResponse;
import com.example.petlorshop.services.DonThuocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/don-thuoc")
public class DonThuocController {

    @Autowired
    private DonThuocService donThuocService;

    @GetMapping
    public ResponseEntity<Page<DonThuocResponse>> getAllDonThuoc(Pageable pageable, @RequestParam(required = false) String keyword) {
        return ResponseEntity.ok(donThuocService.getAllDonThuoc(pageable, keyword));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonThuocResponse> getDonThuocById(@PathVariable Integer id) {
        return donThuocService.getDonThuocById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
