package com.example.petlorshop.controllers;

import com.example.petlorshop.models.LichHen;
import com.example.petlorshop.services.LichHenService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<LichHen> getAllLichHen() {
        return lichHenService.getAllLichHen();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LichHen> getLichHenById(@PathVariable Integer id) {
        return lichHenService.getLichHenById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createLichHen(@RequestBody LichHen lichHen) {
        try {
            LichHen createdLichHen = lichHenService.createLichHen(lichHen);
            return ResponseEntity.ok(createdLichHen);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<LichHen> updateLichHen(@PathVariable Integer id, @RequestBody LichHen lichHenDetails) {
        try {
            LichHen updatedLichHen = lichHenService.updateLichHen(id, lichHenDetails);
            return ResponseEntity.ok(updatedLichHen);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteLichHen(@PathVariable Integer id) {
        try {
            lichHenService.deleteLichHen(id);
            return ResponseEntity.ok(Map.of("message", "Xóa lịch hẹn thành công"));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
