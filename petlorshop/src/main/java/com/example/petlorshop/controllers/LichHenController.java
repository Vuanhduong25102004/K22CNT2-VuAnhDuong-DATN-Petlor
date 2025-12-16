package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.LichHenRequest;
import com.example.petlorshop.dto.LichHenResponse;
import com.example.petlorshop.dto.LichHenUpdateRequest;
import com.example.petlorshop.models.LichHen;
import com.example.petlorshop.services.LichHenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/lich-hen")
public class LichHenController {

    @Autowired
    private LichHenService lichHenService;

    @GetMapping
    public List<LichHenResponse> getAllLichHen() {
        return lichHenService.getAllLichHen();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LichHenResponse> getLichHenById(@PathVariable Integer id) {
        return lichHenService.getLichHenById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch hẹn với ID: " + id));
    }

    @PostMapping
    public ResponseEntity<LichHenResponse> createLichHen(@RequestBody LichHenRequest request) {
        LichHenResponse createdLichHen = lichHenService.createLichHen(request);
        return new ResponseEntity<>(createdLichHen, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LichHen> updateLichHen(@PathVariable Integer id, @RequestBody LichHenUpdateRequest request) {
        LichHen updatedLichHen = lichHenService.updateLichHen(id, request);
        return ResponseEntity.ok(updatedLichHen);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteLichHen(@PathVariable Integer id) {
        lichHenService.deleteLichHen(id);
        return ResponseEntity.ok(Map.of("message", "Xóa lịch hẹn thành công"));
    }
}
