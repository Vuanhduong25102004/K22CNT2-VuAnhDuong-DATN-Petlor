package com.example.petlorshop.services;

import com.example.petlorshop.models.NhanVien;
import com.example.petlorshop.repositories.NhanVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NhanVienService {

    @Autowired
    private NhanVienRepository nhanVienRepository;

    public List<NhanVien> getAllNhanVien() {
        return nhanVienRepository.findAll();
    }

    public Optional<NhanVien> getNhanVienById(Integer id) {
        return nhanVienRepository.findById(id);
    }

    public NhanVien createNhanVien(NhanVien nhanVien) {
        return nhanVienRepository.save(nhanVien);
    }

    public NhanVien updateNhanVien(Integer id, NhanVien nhanVienDetails) {
        NhanVien nhanVien = nhanVienRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nhân viên không tồn tại với id: " + id));

        nhanVien.setHoTen(nhanVienDetails.getHoTen());
        nhanVien.setChucVu(nhanVienDetails.getChucVu());
        nhanVien.setSoDienThoai(nhanVienDetails.getSoDienThoai());
        nhanVien.setEmail(nhanVienDetails.getEmail());

        return nhanVienRepository.save(nhanVien);
    }

    public void deleteNhanVien(Integer id) {
        NhanVien nhanVien = nhanVienRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nhân viên không tồn tại với id: " + id));
        nhanVienRepository.delete(nhanVien);
    }
}
