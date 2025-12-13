package com.example.petlorshop.services;

import com.example.petlorshop.models.DichVu;
import com.example.petlorshop.repositories.DichVuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DichVuService {

    @Autowired
    private DichVuRepository dichVuRepository;

    public List<DichVu> getAllDichVu() {
        return dichVuRepository.findAll();
    }

    public Optional<DichVu> getDichVuById(Integer id) {
        return dichVuRepository.findById(id);
    }

    public DichVu createDichVu(DichVu dichVu) {
        return dichVuRepository.save(dichVu);
    }

    public DichVu updateDichVu(Integer id, DichVu dichVuDetails) {
        DichVu dichVu = dichVuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dịch vụ không tồn tại với id: " + id));

        dichVu.setTenDichVu(dichVuDetails.getTenDichVu());
        dichVu.setMoTa(dichVuDetails.getMoTa());
        dichVu.setGiaDichVu(dichVuDetails.getGiaDichVu());
        dichVu.setThoiLuongUocTinhPhut(dichVuDetails.getThoiLuongUocTinhPhut());

        return dichVuRepository.save(dichVu);
    }

    public void deleteDichVu(Integer id) {
        DichVu dichVu = dichVuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dịch vụ không tồn tại với id: " + id));
        dichVuRepository.delete(dichVu);
    }
}
