package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.DanhMucDichVuRequest;
import com.example.petlorshop.models.DanhMucDichVu;
import com.example.petlorshop.services.DanhMucDichVuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/danh-muc-dich-vu")
public class DanhMucDichVuController {

    @Autowired
    private DanhMucDichVuService danhMucDichVuService;

    @GetMapping
    public ResponseEntity<List<DanhMucDichVu>> getAll() {
        return ResponseEntity.ok(danhMucDichVuService.getAllDanhMuc());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DanhMucDichVu> getById(@PathVariable Integer id) {
        return danhMucDichVuService.getDanhMucById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DanhMucDichVu> create(@RequestBody DanhMucDichVuRequest request) {
        return ResponseEntity.ok(danhMucDichVuService.createDanhMuc(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DanhMucDichVu> update(@PathVariable Integer id, @RequestBody DanhMucDichVuRequest request) {
        try {
            return ResponseEntity.ok(danhMucDichVuService.updateDanhMuc(id, request));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        danhMucDichVuService.deleteDanhMuc(id);
        return ResponseEntity.ok().build();
    }
}
