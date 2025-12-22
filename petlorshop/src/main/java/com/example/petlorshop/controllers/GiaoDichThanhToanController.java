package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.GiaoDichThanhToanRequest;
import com.example.petlorshop.dto.GiaoDichThanhToanResponse;
import com.example.petlorshop.services.GiaoDichThanhToanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/giao-dich")
public class GiaoDichThanhToanController {

    @Autowired
    private GiaoDichThanhToanService giaoDichService;

    @GetMapping("/don-hang/{donHangId}")
    public ResponseEntity<List<GiaoDichThanhToanResponse>> getGiaoDichByDonHang(@PathVariable Integer donHangId) {
        return ResponseEntity.ok(giaoDichService.getGiaoDichByDonHang(donHangId));
    }

    @PostMapping
    public ResponseEntity<GiaoDichThanhToanResponse> createGiaoDich(@RequestBody GiaoDichThanhToanRequest request) {
        return ResponseEntity.ok(giaoDichService.createGiaoDich(request));
    }
}
