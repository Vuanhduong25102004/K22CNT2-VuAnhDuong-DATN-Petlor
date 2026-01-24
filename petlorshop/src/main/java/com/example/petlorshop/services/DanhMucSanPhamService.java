package com.example.petlorshop.services;

import com.example.petlorshop.dto.DanhMucSanPhamRequest;
import com.example.petlorshop.models.DanhMucSanPham;
import com.example.petlorshop.repositories.DanhMucSanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DanhMucSanPhamService {

    @Autowired
    private DanhMucSanPhamRepository danhMucSanPhamRepository;

    public List<DanhMucSanPham> getAllDanhMucSanPham() {
        return danhMucSanPhamRepository.findAll();
    }

    public Page<DanhMucSanPham> getAllDanhMucSanPham(Pageable pageable, String keyword) {
        if (StringUtils.hasText(keyword)) {
            List<DanhMucSanPham> allMatches = danhMucSanPhamRepository.searchByKeyword(keyword);
            
            String lowerKeyword = keyword.toLowerCase();
            List<DanhMucSanPham> filteredList = allMatches.stream()
                    .filter(dm -> (dm.getTenDanhMuc() != null && dm.getTenDanhMuc().toLowerCase().contains(lowerKeyword)) || 
                                  (dm.getMoTa() != null && dm.getMoTa().toLowerCase().contains(lowerKeyword)))
                    .collect(Collectors.toList());

            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), filteredList.size());
            
            if (start > filteredList.size()) {
                return new PageImpl<>(List.of(), pageable, filteredList.size());
            }
            
            List<DanhMucSanPham> pageContent = filteredList.subList(start, end);
            return new PageImpl<>(pageContent, pageable, filteredList.size());
        }
        return danhMucSanPhamRepository.findAll(pageable);
    }

    public Optional<DanhMucSanPham> getDanhMucSanPhamById(Integer id) {
        return danhMucSanPhamRepository.findById(id);
    }

    public DanhMucSanPham createDanhMucSanPham(DanhMucSanPhamRequest request) {
        DanhMucSanPham newDanhMuc = new DanhMucSanPham();
        newDanhMuc.setTenDanhMuc(request.getTenDanhMuc());
        newDanhMuc.setMoTa(request.getMoTa());
        return danhMucSanPhamRepository.save(newDanhMuc);
    }

    public DanhMucSanPham updateDanhMucSanPham(Integer id, DanhMucSanPhamRequest request) {
        DanhMucSanPham danhMucSanPham = danhMucSanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Danh mục sản phẩm không tồn tại với id: " + id));

        danhMucSanPham.setTenDanhMuc(request.getTenDanhMuc());
        danhMucSanPham.setMoTa(request.getMoTa());

        return danhMucSanPhamRepository.save(danhMucSanPham);
    }

    public void deleteDanhMucSanPham(Integer id) {
        DanhMucSanPham danhMucSanPham = danhMucSanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Danh mục sản phẩm không tồn tại với id: " + id));
        danhMucSanPhamRepository.delete(danhMucSanPham);
    }
}
