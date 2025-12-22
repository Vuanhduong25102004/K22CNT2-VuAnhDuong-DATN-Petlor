package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.ThongBaoRequest;
import com.example.petlorshop.dto.ThongBaoResponse;
import com.example.petlorshop.services.ThongBaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/thong-bao")
public class ThongBaoController {

    @Autowired
    private ThongBaoService thongBaoService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ThongBaoResponse>> getThongBaoByUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(thongBaoService.getThongBaoByUser(userId));
    }

    @PostMapping
    public ResponseEntity<ThongBaoResponse> createThongBao(@RequestBody ThongBaoRequest request) {
        return ResponseEntity.ok(thongBaoService.createThongBao(request));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Integer id) {
        thongBaoService.markAsRead(id);
        return ResponseEntity.ok().build();
    }
}
