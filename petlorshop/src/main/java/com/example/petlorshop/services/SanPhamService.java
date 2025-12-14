package com.example.petlorshop.services;

import com.example.petlorshop.dto.SanPhamRequest;
import com.example.petlorshop.dto.SanPhamResponse;
import com.example.petlorshop.models.DanhMucSanPham;
import com.example.petlorshop.models.SanPham;
import com.example.petlorshop.repositories.DanhMucSanPhamRepository;
import com.example.petlorshop.repositories.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SanPhamService {

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Autowired
    private DanhMucSanPhamRepository danhMucSanPhamRepository;

    public List<SanPhamResponse> getAllSanPham() {
        return sanPhamRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public Optional<SanPhamResponse> getSanPhamById(Integer id) {
        return sanPhamRepository.findById(id).map(this::convertToResponse);
    }

    public SanPham createSanPham(SanPhamRequest request) {
        DanhMucSanPham danhMuc = danhMucSanPhamRepository.findById(request.getDanhMucId())
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại với id: " + request.getDanhMucId()));

        SanPham newSanPham = new SanPham();
        newSanPham.setTenSanPham(request.getTenSanPham());
        newSanPham.setMoTaChiTiet(request.getMoTaChiTiet());
        newSanPham.setGia(request.getGia());
        newSanPham.setSoLuongTonKho(request.getSoLuongTonKho());
        newSanPham.setHinhAnhUrl(request.getHinhAnhUrl());
        newSanPham.setDanhMucSanPham(danhMuc);

        return sanPhamRepository.save(newSanPham);
    }

    public SanPham updateSanPham(Integer id, SanPhamRequest request) {
        SanPham sanPham = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại với id: " + id));

        DanhMucSanPham danhMuc = danhMucSanPhamRepository.findById(request.getDanhMucId())
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại với id: " + request.getDanhMucId()));

        sanPham.setTenSanPham(request.getTenSanPham());
        sanPham.setMoTaChiTiet(request.getMoTaChiTiet());
        sanPham.setGia(request.getGia());
        sanPham.setSoLuongTonKho(request.getSoLuongTonKho());
        sanPham.setHinhAnhUrl(request.getHinhAnhUrl());
        sanPham.setDanhMucSanPham(danhMuc);

        return sanPhamRepository.save(sanPham);
    }

    public void deleteSanPham(Integer id) {
        SanPham sanPham = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại với id: " + id));
        sanPhamRepository.delete(sanPham);
    }

    private SanPhamResponse convertToResponse(SanPham sanPham) {
        return new SanPhamResponse(
                sanPham.getSanPhamId(),
                sanPham.getTenSanPham(),
                sanPham.getMoTaChiTiet(),
                sanPham.getGia(),
                sanPham.getSoLuongTonKho(),
                sanPham.getHinhAnhUrl(),
                sanPham.getDanhMucSanPham() != null ? sanPham.getDanhMucSanPham().getDanhMucId() : null,
                sanPham.getDanhMucSanPham() != null ? sanPham.getDanhMucSanPham().getTenDanhMuc() : null
        );
    }
}
