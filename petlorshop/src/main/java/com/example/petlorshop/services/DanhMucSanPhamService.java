package com.example.petlorshop.services;

import com.example.petlorshop.models.DanhMucSanPham;
import com.example.petlorshop.repositories.DanhMucSanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DanhMucSanPhamService {

    @Autowired
    private DanhMucSanPhamRepository danhMucSanPhamRepository;

    public List<DanhMucSanPham> getAllDanhMucSanPham() {
        return danhMucSanPhamRepository.findAll();
    }

    public Optional<DanhMucSanPham> getDanhMucSanPhamById(Integer id) {
        return danhMucSanPhamRepository.findById(id);
    }

    public DanhMucSanPham createDanhMucSanPham(DanhMucSanPham danhMucSanPham) {
        return danhMucSanPhamRepository.save(danhMucSanPham);
    }

    public DanhMucSanPham updateDanhMucSanPham(Integer id, DanhMucSanPham danhMucSanPhamDetails) {
        DanhMucSanPham danhMucSanPham = danhMucSanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Danh mục sản phẩm không tồn tại với id: " + id));

        danhMucSanPham.setTenDanhMuc(danhMucSanPhamDetails.getTenDanhMuc());
        danhMucSanPham.setMoTa(danhMucSanPhamDetails.getMoTa());

        return danhMucSanPhamRepository.save(danhMucSanPham);
    }

    public void deleteDanhMucSanPham(Integer id) {
        DanhMucSanPham danhMucSanPham = danhMucSanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Danh mục sản phẩm không tồn tại với id: " + id));
        danhMucSanPhamRepository.delete(danhMucSanPham);
    }
}
