package com.example.petlorshop.services;

import com.example.petlorshop.dto.GlobalSearchDto;
import com.example.petlorshop.models.*;
import com.example.petlorshop.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GlobalSearchService {

    @Autowired private SanPhamRepository sanPhamRepository;
    @Autowired private DichVuRepository dichVuRepository;
    @Autowired private BaiVietRepository baiVietRepository;
    @Autowired private NguoiDungRepository nguoiDungRepository;
    @Autowired private DonHangRepository donHangRepository;
    @Autowired private LichHenRepository lichHenRepository;
    @Autowired private ThuCungRepository thuCungRepository;
    @Autowired private NhanVienRepository nhanVienRepository;
    @Autowired private DanhMucSanPhamRepository danhMucSanPhamRepository;
    @Autowired private DanhMucDichVuRepository danhMucDichVuRepository;

    public GlobalSearchDto search(String keyword) {
        GlobalSearchDto result = new GlobalSearchDto();
        
        // Public search
        List<SanPham> sanPhams = sanPhamRepository.searchByKeyword(keyword);
        result.setSanPhams(sanPhams);

        List<DichVu> dichVus = dichVuRepository.searchByKeyword(keyword);
        result.setDichVus(dichVus);
        
        List<ThuCung> thuCungs = thuCungRepository.searchByKeyword(keyword);
        result.setThuCungs(thuCungs);

        List<BaiViet> baiViets = baiVietRepository.searchByKeyword(keyword);
        result.setBaiViets(baiViets);

        // Admin search
        List<NguoiDung> nguoiDungs = nguoiDungRepository.searchByKeyword(keyword);
        result.setNguoiDungs(nguoiDungs);
        
        List<NhanVien> nhanViens = nhanVienRepository.searchByKeyword(keyword);
        result.setNhanViens(nhanViens);

        List<DonHang> donHangs = donHangRepository.searchByKeyword(keyword);
        result.setDonHangs(donHangs);
        
        List<LichHen> lichHens = lichHenRepository.searchByKeyword(keyword);
        result.setLichHens(lichHens);
        
        List<DanhMucSanPham> danhMucSanPhams = danhMucSanPhamRepository.searchByKeyword(keyword);
        result.setDanhMucSanPhams(danhMucSanPhams);
        
        List<DanhMucDichVu> danhMucDichVus = danhMucDichVuRepository.searchByKeyword(keyword);
        result.setDanhMucDichVus(danhMucDichVus);

        return result;
    }
}
