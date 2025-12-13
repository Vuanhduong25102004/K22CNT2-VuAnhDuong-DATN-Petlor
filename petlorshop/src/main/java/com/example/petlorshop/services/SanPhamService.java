package com.example.petlorshop.services;

import com.example.petlorshop.models.SanPham;
import com.example.petlorshop.repositories.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SanPhamService {

    @Autowired
    private SanPhamRepository sanPhamRepository;

    public List<SanPham> getAllSanPham() {
        return sanPhamRepository.findAll();
    }

    public Optional<SanPham> getSanPhamById(Integer id) {
        return sanPhamRepository.findById(id);
    }

    public SanPham createSanPham(SanPham sanPham) {
        return sanPhamRepository.save(sanPham);
    }

    public SanPham updateSanPham(Integer id, SanPham sanPhamDetails) {
        SanPham sanPham = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại với id: " + id));

        sanPham.setTenSanPham(sanPhamDetails.getTenSanPham());
        sanPham.setMoTaChiTiet(sanPhamDetails.getMoTaChiTiet());
        sanPham.setGia(sanPhamDetails.getGia());
        sanPham.setSoLuongTonKho(sanPhamDetails.getSoLuongTonKho());
        sanPham.setHinhAnhUrl(sanPhamDetails.getHinhAnhUrl());

        return sanPhamRepository.save(sanPham);
    }

    public void deleteSanPham(Integer id) {
        SanPham sanPham = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại với id: " + id));
        sanPhamRepository.delete(sanPham);
    }
}
