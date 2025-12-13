package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.NguoiDungResponse;
import com.example.petlorshop.dto.UpdateNguoiDungRequest;
import com.example.petlorshop.models.NguoiDung;
import com.example.petlorshop.services.NguoiDungService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/nguoi-dung")
public class NguoiDungController {

    @Autowired
    private NguoiDungService nguoiDungService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private NguoiDungResponse toNguoiDungResponse(NguoiDung user) {
        return new NguoiDungResponse(
                user.getUserId(),
                user.getHoTen(),
                user.getEmail(),
                user.getSoDienThoai(),
                user.getDiaChi(),
                user.getNgayTao(),
                user.getRole()
        );
    }

    @PostMapping
    public ResponseEntity<?> createNguoiDung(@RequestBody NguoiDung nguoiDung) {
        try {
            if (nguoiDung.getMatKhau() != null && !nguoiDung.getMatKhau().isEmpty()) {
                nguoiDung.setMatKhau(passwordEncoder.encode(nguoiDung.getMatKhau()));
            }
            NguoiDung savedNguoiDung = nguoiDungService.createNguoiDung(nguoiDung);
            return new ResponseEntity<>(toNguoiDungResponse(savedNguoiDung), HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<NguoiDungResponse> getAllNguoiDung() {
        return nguoiDungService.getAllNguoiDung().stream()
                .map(this::toNguoiDungResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NguoiDungResponse> getNguoiDungById(@PathVariable Integer id) {
        return nguoiDungService.getNguoiDungById(id)
                .map(user -> ResponseEntity.ok(toNguoiDungResponse(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<NguoiDungResponse> updateNguoiDung(@PathVariable Integer id, @Valid @RequestBody UpdateNguoiDungRequest request) {
        try {
            NguoiDung updatedNguoiDung = nguoiDungService.updateNguoiDung(id, request);
            return ResponseEntity.ok(toNguoiDungResponse(updatedNguoiDung));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteNguoiDung(@PathVariable Integer id) {
        try {
            nguoiDungService.deleteNguoiDung(id);
            return ResponseEntity.ok(Map.of("message", "Xóa người dùng thành công"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }
}
