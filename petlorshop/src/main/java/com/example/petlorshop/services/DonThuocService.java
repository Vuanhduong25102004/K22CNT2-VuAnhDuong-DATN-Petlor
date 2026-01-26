package com.example.petlorshop.services;

import com.example.petlorshop.dto.DonThuocResponse;
import com.example.petlorshop.models.ChiTietDonThuoc;
import com.example.petlorshop.models.DonThuoc;
import com.example.petlorshop.repositories.DonThuocRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DonThuocService {

    @Autowired
    private DonThuocRepository donThuocRepository;

    @Transactional(readOnly = true)
    public Page<DonThuocResponse> getAllDonThuoc(Pageable pageable, String keyword) {
        if (StringUtils.hasText(keyword)) {
            List<DonThuoc> allMatches = donThuocRepository.searchByKeyword(keyword);
            
            String lowerKeyword = keyword.toLowerCase();
            List<DonThuocResponse> filteredList = allMatches.stream()
                    .filter(dt -> (dt.getLichHen().getTenKhachHang() != null && dt.getLichHen().getTenKhachHang().toLowerCase().contains(lowerKeyword)) || 
                                  (dt.getBacSi() != null && dt.getBacSi().getHoTen().toLowerCase().contains(lowerKeyword)) ||
                                  (dt.getChanDoan() != null && dt.getChanDoan().toLowerCase().contains(lowerKeyword)))
                    .map(this::convertToResponse)
                    .collect(Collectors.toList());

            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), filteredList.size());
            
            if (start > filteredList.size()) {
                return new PageImpl<>(List.of(), pageable, filteredList.size());
            }
            
            List<DonThuocResponse> pageContent = filteredList.subList(start, end);
            return new PageImpl<>(pageContent, pageable, filteredList.size());
        }
        return donThuocRepository.findAll(pageable).map(this::convertToResponse);
    }

    @Transactional(readOnly = true)
    public Optional<DonThuocResponse> getDonThuocById(Integer id) {
        return donThuocRepository.findById(id).map(this::convertToResponse);
    }

    private DonThuocResponse convertToResponse(DonThuoc donThuoc) {
        BigDecimal tongTienThuoc = BigDecimal.ZERO;
        List<DonThuocResponse.ChiTietDonThuocResponse> chiTietResponses = donThuoc.getChiTietDonThuocList().stream()
                .map(ct -> {
                    BigDecimal thanhTien = ct.getThuoc().getGia().multiply(BigDecimal.valueOf(ct.getSoLuong()));
                    return new DonThuocResponse.ChiTietDonThuocResponse(
                            ct.getThuoc().getSanPhamId(),
                            ct.getThuoc().getTenSanPham(),
                            ct.getThuoc().getDonViTinh(),
                            ct.getSoLuong(),
                            ct.getLieuDung(),
                            ct.getThuoc().getGia(),
                            thanhTien
                    );
                })
                .collect(Collectors.toList());

        for (DonThuocResponse.ChiTietDonThuocResponse ct : chiTietResponses) {
            tongTienThuoc = tongTienThuoc.add(ct.getThanhTien());
        }

        return new DonThuocResponse(
                donThuoc.getDonThuocId(),
                donThuoc.getLichHen().getLichHenId(),
                donThuoc.getBacSi() != null ? donThuoc.getBacSi().getHoTen() : "Không rõ",
                donThuoc.getBacSi() != null ? donThuoc.getBacSi().getAnhDaiDien() : null, // Lấy ảnh bác sĩ
                donThuoc.getLichHen().getTenKhachHang(),
                donThuoc.getLichHen().getSdtKhachHang(),
                donThuoc.getThuCung() != null ? donThuoc.getThuCung().getTenThuCung() : "Không rõ",
                donThuoc.getThuCung() != null ? donThuoc.getThuCung().getHinhAnh() : null,
                donThuoc.getChanDoan(),
                donThuoc.getLoiDan(),
                donThuoc.getNgayKe(),
                donThuoc.getTrangThai().name(),
                chiTietResponses,
                tongTienThuoc
        );
    }
}
