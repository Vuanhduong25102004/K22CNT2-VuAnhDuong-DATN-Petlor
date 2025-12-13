package com.example.petlorshop.services;

import com.example.petlorshop.models.ChiTietDonHang;
import com.example.petlorshop.repositories.ChiTietDonHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChiTietDonHangService {

    @Autowired
    private ChiTietDonHangRepository chiTietDonHangRepository;

    public List<ChiTietDonHang> getAllChiTietDonHang() {
        return chiTietDonHangRepository.findAll();
    }

    public Optional<ChiTietDonHang> getChiTietDonHangById(Integer id) {
        return chiTietDonHangRepository.findById(id);
    }

    public ChiTietDonHang createChiTietDonHang(ChiTietDonHang chiTietDonHang) {
        return chiTietDonHangRepository.save(chiTietDonHang);
    }

    public ChiTietDonHang updateChiTietDonHang(Integer id, ChiTietDonHang chiTietDonHangDetails) {
        ChiTietDonHang chiTietDonHang = chiTietDonHangRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chi tiết đơn hàng không tồn tại với id: " + id));

        chiTietDonHang.setSoLuong(chiTietDonHangDetails.getSoLuong());
        chiTietDonHang.setDonGiaLucMua(chiTietDonHangDetails.getDonGiaLucMua());

        return chiTietDonHangRepository.save(chiTietDonHang);
    }

    public void deleteChiTietDonHang(Integer id) {
        ChiTietDonHang chiTietDonHang = chiTietDonHangRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chi tiết đơn hàng không tồn tại với id: " + id));
        chiTietDonHangRepository.delete(chiTietDonHang);
    }
}
