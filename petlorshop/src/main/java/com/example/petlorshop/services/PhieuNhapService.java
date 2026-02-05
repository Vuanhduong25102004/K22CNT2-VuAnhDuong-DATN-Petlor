package com.example.petlorshop.services;

import com.example.petlorshop.dto.PhieuNhapRequest;
import com.example.petlorshop.dto.PhieuNhapResponse;
import com.example.petlorshop.models.*;
import com.example.petlorshop.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PhieuNhapService {

    @Autowired
    private PhieuNhapRepository phieuNhapRepository;

    @Autowired
    private NhaCungCapRepository nhaCungCapRepository;

    @Autowired
    private NhanVienRepository nhanVienRepository;

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Autowired
    private DanhMucSanPhamRepository danhMucSanPhamRepository;

    @Transactional
    public PhieuNhapResponse createPhieuNhap(PhieuNhapRequest request) {
        NhaCungCap ncc = nhaCungCapRepository.findById(request.getNccId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhà cung cấp"));
        NhanVien nv = nhanVienRepository.findById(request.getNhanVienId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên"));

        PhieuNhap phieuNhap = new PhieuNhap();
        phieuNhap.setNhaCungCap(ncc);
        phieuNhap.setNhanVien(nv);
        phieuNhap.setGhiChu(request.getGhiChu());

        BigDecimal tongTien = BigDecimal.ZERO;
        List<ChiTietPhieuNhap> chiTietEntities = new ArrayList<>();

        for (PhieuNhapRequest.ChiTietPhieuNhapDto ctDto : request.getChiTietList()) {
            SanPham sp;
            if (ctDto.getSanPhamId() != null) {
                sp = sanPhamRepository.findById(ctDto.getSanPhamId())
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm ID: " + ctDto.getSanPhamId()));
                sp.setSoLuongTonKho(sp.getSoLuongTonKho() + ctDto.getSoLuong());
            } else {
                sp = new SanPham();
                sp.setTenSanPham(ctDto.getTenSanPham());
                sp.setMoTaChiTiet(ctDto.getMoTaChiTiet());
                sp.setGia(ctDto.getGiaBan());
                sp.setGiaGiam(BigDecimal.ZERO);
                sp.setSoLuongTonKho(ctDto.getSoLuong());
                sp.setHinhAnh(ctDto.getHinhAnh());
                sp.setDaXoa(false);

                if (ctDto.getDanhMucId() != null) {
                    DanhMucSanPham danhMuc = danhMucSanPhamRepository.findById(ctDto.getDanhMucId())
                            .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục ID: " + ctDto.getDanhMucId()));
                    sp.setDanhMucSanPham(danhMuc);
                }
            }
            
            sp = sanPhamRepository.save(sp);

            ChiTietPhieuNhap ct = new ChiTietPhieuNhap();
            ct.setPhieuNhap(phieuNhap);
            ct.setSanPham(sp);
            ct.setSoLuong(ctDto.getSoLuong());
            ct.setGiaNhap(ctDto.getGiaNhap());
            
            chiTietEntities.add(ct);
            
            BigDecimal thanhTien = ct.getGiaNhap().multiply(BigDecimal.valueOf(ct.getSoLuong()));
            tongTien = tongTien.add(thanhTien);
        }

        phieuNhap.setChiTietPhieuNhapList(chiTietEntities);
        phieuNhap.setTongTien(tongTien);

        PhieuNhap saved = phieuNhapRepository.save(phieuNhap);
        return convertToResponse(saved);
    }

    @Transactional
    public void deletePhieuNhap(Integer id) {
        PhieuNhap phieuNhap = phieuNhapRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phiếu nhập ID: " + id));

        for (ChiTietPhieuNhap ct : phieuNhap.getChiTietPhieuNhapList()) {
            SanPham sp = ct.getSanPham();
            int soLuongMoi = sp.getSoLuongTonKho() - ct.getSoLuong();
            
            sp.setSoLuongTonKho(soLuongMoi);
            sanPhamRepository.save(sp);
        }

        phieuNhapRepository.delete(phieuNhap);
    }

    public Page<PhieuNhapResponse> getAllPhieuNhap(Pageable pageable, String keyword) {
        if (StringUtils.hasText(keyword)) {
            List<PhieuNhap> allMatches = phieuNhapRepository.searchByKeyword(keyword);
            
            String lowerKeyword = keyword.toLowerCase();
            List<PhieuNhapResponse> filteredList = allMatches.stream()
                    .filter(pn -> (pn.getGhiChu() != null && pn.getGhiChu().toLowerCase().contains(lowerKeyword)) ||
                                  (pn.getNhaCungCap() != null && pn.getNhaCungCap().getTenNcc().toLowerCase().contains(lowerKeyword)) ||
                                  (pn.getNhanVien() != null && pn.getNhanVien().getHoTen().toLowerCase().contains(lowerKeyword)))
                    .map(this::convertToResponse)
                    .collect(Collectors.toList());

            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), filteredList.size());
            
            if (start > filteredList.size()) {
                return new PageImpl<>(List.of(), pageable, filteredList.size());
            }
            
            List<PhieuNhapResponse> pageContent = filteredList.subList(start, end);
            return new PageImpl<>(pageContent, pageable, filteredList.size());
        }
        return phieuNhapRepository.findAll(pageable)
                .map(this::convertToResponse);
    }

    public Optional<PhieuNhapResponse> getPhieuNhapById(Integer id) {
        return phieuNhapRepository.findById(id).map(this::convertToResponse);
    }

    private PhieuNhapResponse convertToResponse(PhieuNhap pn) {
        List<PhieuNhapResponse.ChiTietPhieuNhapResponse> chiTietResponses = pn.getChiTietPhieuNhapList().stream()
                .map(ct -> new PhieuNhapResponse.ChiTietPhieuNhapResponse(
                        ct.getSanPham().getSanPhamId(),
                        ct.getSanPham().getTenSanPham(),
                        ct.getSoLuong(),
                        ct.getGiaNhap()
                )).collect(Collectors.toList());

        return new PhieuNhapResponse(
                pn.getPhieuNhapId(),
                pn.getNhaCungCap().getTenNcc(),
                pn.getNhanVien().getHoTen(),
                pn.getNgayNhap(),
                pn.getTongTien(),
                pn.getGhiChu(),
                chiTietResponses
        );
    }
}
