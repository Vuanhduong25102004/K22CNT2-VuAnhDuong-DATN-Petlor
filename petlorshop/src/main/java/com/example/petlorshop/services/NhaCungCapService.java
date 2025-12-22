package com.example.petlorshop.services;

import com.example.petlorshop.dto.NhaCungCapRequest;
import com.example.petlorshop.dto.NhaCungCapResponse;
import com.example.petlorshop.models.NhaCungCap;
import com.example.petlorshop.repositories.NhaCungCapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NhaCungCapService {

    @Autowired
    private NhaCungCapRepository nhaCungCapRepository;

    public Page<NhaCungCapResponse> getAllNhaCungCap(Pageable pageable) {
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
