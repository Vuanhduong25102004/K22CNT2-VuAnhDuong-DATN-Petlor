package com.example.petlorshop.services;

import com.example.petlorshop.dto.DanhMucDichVuRequest;
import com.example.petlorshop.models.DanhMucDichVu;
import com.example.petlorshop.repositories.DanhMucDichVuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DanhMucDichVuService {

    @Autowired
    private DanhMucDichVuRepository danhMucDichVuRepository;

    public List<DanhMucDichVu> getAllDanhMuc() {
        return danhMucDichVuRepository.findAll();
    }

    public Optional<DanhMucDichVu> getDanhMucById(Integer id) {
        return danhMucDichVuRepository.findById(id);
    }

    public DanhMucDichVu createDanhMuc(DanhMucDichVuRequest request) {
        DanhMucDichVu danhMuc = new DanhMucDichVu();
        danhMuc.setTenDanhMucDv(request.getTenDanhMuc());
        danhMuc.setMoTa(request.getMoTa());
        return danhMucDichVuRepository.save(danhMuc);
    }

    public DanhMucDichVu updateDanhMuc(Integer id, DanhMucDichVuRequest request) {
        DanhMucDichVu danhMuc = danhMucDichVuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại: " + id));
        
        danhMuc.setTenDanhMucDv(request.getTenDanhMuc());
        danhMuc.setMoTa(request.getMoTa());
        return danhMucDichVuRepository.save(danhMuc);
    }

    public void deleteDanhMuc(Integer id) {
        danhMucDichVuRepository.deleteById(id);
    }
}
