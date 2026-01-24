package com.example.petlorshop.services;

import com.example.petlorshop.dto.DanhMucDichVuRequest;
import com.example.petlorshop.models.DanhMucDichVu;
import com.example.petlorshop.repositories.DanhMucDichVuRepository;
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
public class DanhMucDichVuService {

    @Autowired
    private DanhMucDichVuRepository danhMucDichVuRepository;

    public List<DanhMucDichVu> getAllDanhMuc() {
        return danhMucDichVuRepository.findAll();
    }

    public Page<DanhMucDichVu> getAllDanhMuc(Pageable pageable, String keyword) {
        if (StringUtils.hasText(keyword)) {
            List<DanhMucDichVu> allMatches = danhMucDichVuRepository.searchByKeyword(keyword);
            
            String lowerKeyword = keyword.toLowerCase();
            List<DanhMucDichVu> filteredList = allMatches.stream()
                    .filter(dm -> (dm.getTenDanhMucDv() != null && dm.getTenDanhMucDv().toLowerCase().contains(lowerKeyword)) || 
                                  (dm.getMoTa() != null && dm.getMoTa().toLowerCase().contains(lowerKeyword)))
                    .collect(Collectors.toList());

            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), filteredList.size());
            
            if (start > filteredList.size()) {
                return new PageImpl<>(List.of(), pageable, filteredList.size());
            }
            
            List<DanhMucDichVu> pageContent = filteredList.subList(start, end);
            return new PageImpl<>(pageContent, pageable, filteredList.size());
        }
        return danhMucDichVuRepository.findAll(pageable);
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
