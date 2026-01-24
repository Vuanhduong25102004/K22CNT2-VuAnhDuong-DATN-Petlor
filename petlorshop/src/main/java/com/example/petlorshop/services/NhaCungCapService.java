package com.example.petlorshop.services;

import com.example.petlorshop.dto.NhaCungCapRequest;
import com.example.petlorshop.dto.NhaCungCapResponse;
import com.example.petlorshop.models.NhaCungCap;
import com.example.petlorshop.repositories.NhaCungCapRepository;
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
public class NhaCungCapService {

    @Autowired
    private NhaCungCapRepository nhaCungCapRepository;

    public Page<NhaCungCapResponse> getAllNhaCungCap(Pageable pageable, String keyword) {
        if (StringUtils.hasText(keyword)) {
            List<NhaCungCap> allMatches = nhaCungCapRepository.searchByKeyword(keyword);
            
            String lowerKeyword = keyword.toLowerCase();
            List<NhaCungCapResponse> filteredList = allMatches.stream()
                    .filter(ncc -> (ncc.getTenNcc() != null && ncc.getTenNcc().toLowerCase().contains(lowerKeyword)) || 
                                   (ncc.getEmail() != null && ncc.getEmail().toLowerCase().contains(lowerKeyword)) ||
                                   (ncc.getSoDienThoai() != null && ncc.getSoDienThoai().contains(lowerKeyword)))
                    .map(this::convertToResponse)
                    .collect(Collectors.toList());

            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), filteredList.size());
            
            if (start > filteredList.size()) {
                return new PageImpl<>(List.of(), pageable, filteredList.size());
            }
            
            List<NhaCungCapResponse> pageContent = filteredList.subList(start, end);
            return new PageImpl<>(pageContent, pageable, filteredList.size());
        }
        return nhaCungCapRepository.findAll(pageable)
                .map(this::convertToResponse);
    }

    public Optional<NhaCungCapResponse> getNhaCungCapById(Integer id) {
        return nhaCungCapRepository.findById(id).map(this::convertToResponse);
    }

    public NhaCungCapResponse createNhaCungCap(NhaCungCapRequest request) {
        if (nhaCungCapRepository.existsBySoDienThoai(request.getSoDienThoai())) {
            throw new RuntimeException("Số điện thoại đã tồn tại: " + request.getSoDienThoai());
        }

        NhaCungCap ncc = new NhaCungCap();
        ncc.setTenNcc(request.getTenNcc());
        ncc.setSoDienThoai(request.getSoDienThoai());
        ncc.setEmail(request.getEmail());
        ncc.setDiaChi(request.getDiaChi());
        
        NhaCungCap saved = nhaCungCapRepository.save(ncc);
        return convertToResponse(saved);
    }

    public NhaCungCapResponse updateNhaCungCap(Integer id, NhaCungCapRequest request) {
        NhaCungCap ncc = nhaCungCapRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhà cung cấp với ID: " + id));

        if (nhaCungCapRepository.existsBySoDienThoaiAndNccIdNot(request.getSoDienThoai(), id)) {
            throw new RuntimeException("Số điện thoại đã tồn tại: " + request.getSoDienThoai());
        }

        ncc.setTenNcc(request.getTenNcc());
        ncc.setSoDienThoai(request.getSoDienThoai());
        ncc.setEmail(request.getEmail());
        ncc.setDiaChi(request.getDiaChi());
        
        NhaCungCap saved = nhaCungCapRepository.save(ncc);
        return convertToResponse(saved);
    }

    public void deleteNhaCungCap(Integer id) {
        nhaCungCapRepository.deleteById(id);
    }

    private NhaCungCapResponse convertToResponse(NhaCungCap ncc) {
        return new NhaCungCapResponse(
                ncc.getNccId(),
                ncc.getTenNcc(),
                ncc.getSoDienThoai(),
                ncc.getEmail(),
                ncc.getDiaChi()
        );
    }
}
