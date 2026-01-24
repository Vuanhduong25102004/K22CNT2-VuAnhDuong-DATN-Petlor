package com.example.petlorshop.services;

import com.example.petlorshop.dto.GlobalSearchDto;
import com.example.petlorshop.models.*;
import com.example.petlorshop.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GlobalSearchService {

    @Autowired private SanPhamRepository sanPhamRepository;
    @Autowired private DichVuRepository dichVuRepository;
    @Autowired private ThuCungRepository thuCungRepository;
    @Autowired private BaiVietRepository baiVietRepository;
    @Autowired private NguoiDungRepository nguoiDungRepository;
    @Autowired private NhanVienRepository nhanVienRepository;
    @Autowired private DonHangRepository donHangRepository;
    @Autowired private LichHenRepository lichHenRepository;
    @Autowired private DanhMucSanPhamRepository danhMucSanPhamRepository;
    @Autowired private DanhMucDichVuRepository danhMucDichVuRepository;

    public GlobalSearchDto search(String keyword) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        GlobalSearchDto results = new GlobalSearchDto();

        // Public Search (Ai cũng tìm được)
        results.setSanPhams(sanPhamRepository.searchByKeyword(keyword));
        results.setDichVus(dichVuRepository.searchByKeyword(keyword));
        results.setThuCungs(thuCungRepository.searchByKeyword(keyword));
        results.setBaiViets(baiVietRepository.searchByKeyword(keyword));

        // Admin Only Search
        if (isAdmin) {
            results.setNguoiDungs(nguoiDungRepository.searchByKeyword(keyword));
            results.setNhanViens(nhanVienRepository.searchByKeyword(keyword));
            results.setDonHangs(donHangRepository.searchByKeyword(keyword));
            results.setLichHens(lichHenRepository.searchByKeyword(keyword));
            results.setDanhMucSanPhams(danhMucSanPhamRepository.searchByKeyword(keyword));
            results.setDanhMucDichVus(danhMucDichVuRepository.searchByKeyword(keyword));
        }

        return results;
    }
}
