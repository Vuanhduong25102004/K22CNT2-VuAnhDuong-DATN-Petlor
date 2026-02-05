package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.DanhMucSanPhamRequest;
import com.example.petlorshop.models.DanhMucSanPham;
import com.example.petlorshop.services.DanhMucSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/danh-muc-san-pham")
public class DanhMucSanPhamController {

    @Autowired
    private DanhMucSanPhamService danhMucSanPhamService;

    @GetMapping("/list")
    public List<DanhMucSanPham> getAllDanhMucSanPhamList() {
        return danhMucSanPhamService.getAllDanhMucSanPham();
    }

    @GetMapping
    public Page<DanhMucSanPham> getAllDanhMucSanPham(Pageable pageable, @RequestParam(required = false) String keyword) {
        return danhMucSanPhamService.getAllDanhMucSanPham(pageable, keyword);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DanhMucSanPham> getDanhMucSanPhamById(@PathVariable Integer id) {
        return danhMucSanPhamService.getDanhMucSanPhamById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public DanhMucSanPham createDanhMucSanPham(@RequestBody DanhMucSanPhamRequest request) {
        return danhMucSanPhamService.createDanhMucSanPham(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DanhMucSanPham> updateDanhMucSanPham(@PathVariable Integer id, @RequestBody DanhMucSanPhamRequest request) {
        try {
            DanhMucSanPham updatedDanhMucSanPham = danhMucSanPhamService.updateDanhMucSanPham(id, request);
            return ResponseEntity.ok(updatedDanhMucSanPham);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteDanhMucSanPham(@PathVariable Integer id) {
        try {
            danhMucSanPhamService.deleteDanhMucSanPham(id);
            return ResponseEntity.ok(Map.of("message", "Xóa danh mục sản phẩm thành công"));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
