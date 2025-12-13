package com.example.petlorshop.services;

import com.example.petlorshop.dto.ThuCungRequest;
import com.example.petlorshop.models.NguoiDung;
import com.example.petlorshop.models.ThuCung;
import com.example.petlorshop.repositories.NguoiDungRepository;
import com.example.petlorshop.repositories.ThuCungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ThuCungService {

    @Autowired
    private ThuCungRepository thuCungRepository;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    public List<ThuCung> getAllThuCung() {
        return thuCungRepository.findAll();
    }

    public Optional<ThuCung> getThuCungById(Integer id) {
        return thuCungRepository.findById(id);
    }

    public ThuCung createThuCung(ThuCungRequest request) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + request.getUserId()));

        ThuCung thuCung = new ThuCung();
        thuCung.setTenThuCung(request.getTenThuCung());
        thuCung.setChungLoai(request.getChungLoai());
        thuCung.setGiongLoai(request.getGiongLoai());
        thuCung.setNgaySinh(request.getNgaySinh());
        thuCung.setGioiTinh(request.getGioiTinh());
        thuCung.setGhiChuSucKhoe(request.getGhiChuSucKhoe());
        thuCung.setNguoiDung(nguoiDung);

        return thuCungRepository.save(thuCung);
    }

    public ThuCung updateThuCung(Integer id, ThuCungRequest request) {
        ThuCung thuCung = thuCungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thú cưng với ID: " + id));

        NguoiDung nguoiDung = nguoiDungRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + request.getUserId()));

        thuCung.setTenThuCung(request.getTenThuCung());
        thuCung.setChungLoai(request.getChungLoai());
        thuCung.setGiongLoai(request.getGiongLoai());
        thuCung.setNgaySinh(request.getNgaySinh());
        thuCung.setGioiTinh(request.getGioiTinh());
        thuCung.setGhiChuSucKhoe(request.getGhiChuSucKhoe());
        thuCung.setNguoiDung(nguoiDung);

        return thuCungRepository.save(thuCung);
    }

    public void deleteThuCung(Integer id) {
        if (!thuCungRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy thú cưng với ID: " + id);
        }
        thuCungRepository.deleteById(id);
    }
}
