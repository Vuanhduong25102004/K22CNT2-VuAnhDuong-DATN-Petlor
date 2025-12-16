package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.ThuCungRequest;
import com.example.petlorshop.dto.ThuCungResponse;
import com.example.petlorshop.dto.ThuCungUpdateRequest;
import com.example.petlorshop.models.ThuCung;
import com.example.petlorshop.services.ThuCungService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/thu-cung")
public class ThuCungController {

    @Autowired
    private ThuCungService thuCungService;

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());


    private ThuCungResponse toThuCungResponse(ThuCung thuCung) {
        return new ThuCungResponse(
                thuCung.getThuCungId(),
                thuCung.getTenThuCung(),
                thuCung.getChungLoai(),
                thuCung.getGiongLoai(),
                thuCung.getNgaySinh(),
                thuCung.getGioiTinh(),
                thuCung.getGhiChuSucKhoe(),
                thuCung.getHinhAnh(),
                thuCung.getNguoiDung().getUserId(),
                thuCung.getNguoiDung().getHoTen()
        );
    }

    @GetMapping
    public List<ThuCungResponse> getAllThuCung() {
        return thuCungService.getAllThuCung().stream()
                .map(this::toThuCungResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ThuCungResponse> getThuCungById(@PathVariable Integer id) {
        return thuCungService.getThuCungById(id)
                .map(thuCung -> ResponseEntity.ok(toThuCungResponse(thuCung)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<ThuCungResponse> createThuCung(@RequestPart("thuCung") String thuCungJson,
                                                         @RequestPart(name = "hinhAnh", required = false) MultipartFile hinhAnh) {
        try {
            ThuCungRequest request = objectMapper.readValue(thuCungJson, ThuCungRequest.class);
            ThuCung createdThuCung = thuCungService.createThuCung(request, hinhAnh);
            return new ResponseEntity<>(toThuCungResponse(createdThuCung), HttpStatus.CREATED);
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping(value = "/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<ThuCungResponse> updateThuCung(@PathVariable Integer id,
                                                         @RequestPart("thuCung") String thuCungUpdateJson,
                                                         @RequestPart(name = "hinhAnh", required = false) MultipartFile hinhAnh) {
        try {
            ThuCungUpdateRequest request = objectMapper.readValue(thuCungUpdateJson, ThuCungUpdateRequest.class);
            ThuCung updatedThuCung = thuCungService.updateThuCung(id, request, hinhAnh);
            return ResponseEntity.ok(toThuCungResponse(updatedThuCung));
        } catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteThuCung(@PathVariable Integer id) {
        try {
            thuCungService.deleteThuCung(id);
            return ResponseEntity.ok(Map.of("message", "Xóa thú cưng thành công"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }
}
