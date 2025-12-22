package com.example.petlorshop.services;

import com.example.petlorshop.dto.DanhGiaRequest;
import com.example.petlorshop.dto.DanhGiaResponse;
import com.example.petlorshop.models.DanhGia;
import com.example.petlorshop.models.DichVu;
import com.example.petlorshop.models.NguoiDung;
import com.example.petlorshop.models.SanPham;
import com.example.petlorshop.repositories.DanhGiaRepository;
import com.example.petlorshop.repositories.DichVuRepository;
import com.example.petlorshop.repositories.NguoiDungRepository;
import com.example.petlorshop.repositories.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DanhGiaService {

    @Autowired
    private DanhGiaRepository danhGiaRepository;

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Autowired
    private DichVuRepository dichVuRepository;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    // --- CLIENT SIDE ---

    @Transactional(readOnly = true)
    public List<DanhGiaResponse> getDanhGiaBySanPham(Integer sanPhamId) {
        List<DanhGia> danhGias = danhGiaRepository.findBySanPham_SanPhamIdAndTrangThaiTrue(sanPhamId);
        return danhGias.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DanhGiaResponse> getDanhGiaByDichVu(Integer dichVuId) {
        List<DanhGia> danhGias = danhGiaRepository.findByDichVu_DichVuIdAndTrangThaiTrue(dichVuId);
        return danhGias.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    @Transactional
    public DanhGiaResponse createDanhGia(DanhGiaRequest request) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        DanhGia danhGia = new DanhGia();
        danhGia.setNguoiDung(nguoiDung);
        danhGia.setSoSao(request.getSoSao());
        danhGia.setNoiDung(request.getNoiDung());
        danhGia.setHinhAnh(request.getHinhAnh());
        danhGia.setTrangThai(true); // Mặc định hiện

        if (request.getSanPhamId() != null) {
            SanPham sanPham = sanPhamRepository.findById(request.getSanPhamId())
                    .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại"));
            danhGia.setSanPham(sanPham);
        } else if (request.getDichVuId() != null) {
            DichVu dichVu = dichVuRepository.findById(request.getDichVuId())
                    .orElseThrow(() -> new RuntimeException("Dịch vụ không tồn tại"));
            danhGia.setDichVu(dichVu);
        } else {
            throw new IllegalArgumentException("Phải có sanPhamId hoặc dichVuId");
        }

        DanhGia savedDanhGia = danhGiaRepository.save(danhGia);
        return convertToResponse(savedDanhGia);
    }

    // --- ADMIN SIDE ---

    @Transactional(readOnly = true)
    public Page<DanhGia> getAllDanhGiaAdmin(Integer soSao, Boolean trangThai, Pageable pageable) {
        return danhGiaRepository.findAllByFilters(soSao, trangThai, pageable);
    }

    @Transactional
    public DanhGia updateTrangThaiHienThi(Integer danhGiaId, Boolean trangThai) {
        DanhGia danhGia = danhGiaRepository.findById(danhGiaId)
                .orElseThrow(() -> new RuntimeException("Đánh giá không tồn tại"));
        danhGia.setTrangThai(trangThai);
        return danhGiaRepository.save(danhGia);
    }

    @Transactional
    public DanhGia replyDanhGia(Integer danhGiaId, String phanHoi) {
        DanhGia danhGia = danhGiaRepository.findById(danhGiaId)
                .orElseThrow(() -> new RuntimeException("Đánh giá không tồn tại"));
        danhGia.setPhanHoi(phanHoi);
        return danhGiaRepository.save(danhGia);
    }

    @Transactional
    public void deleteDanhGia(Integer danhGiaId) {
        danhGiaRepository.deleteById(danhGiaId);
    }

    private DanhGiaResponse convertToResponse(DanhGia danhGia) {
        return new DanhGiaResponse(
                danhGia.getDanhGiaId(),
                danhGia.getNguoiDung().getHoTen(),
                danhGia.getSoSao(),
                danhGia.getNoiDung(),
                danhGia.getHinhAnh(),
                danhGia.getNgayTao(),
                danhGia.getPhanHoi()
        );
    }
}
