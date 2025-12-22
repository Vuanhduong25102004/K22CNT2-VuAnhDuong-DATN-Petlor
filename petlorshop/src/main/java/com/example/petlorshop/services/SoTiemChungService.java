package com.example.petlorshop.services;

import com.example.petlorshop.dto.SoTiemChungRequest;
import com.example.petlorshop.dto.SoTiemChungResponse;
import com.example.petlorshop.models.LichHen;
import com.example.petlorshop.models.NhanVien;
import com.example.petlorshop.models.SoTiemChung;
import com.example.petlorshop.models.ThuCung;
import com.example.petlorshop.repositories.LichHenRepository;
import com.example.petlorshop.repositories.NhanVienRepository;
import com.example.petlorshop.repositories.SoTiemChungRepository;
import com.example.petlorshop.repositories.ThuCungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SoTiemChungService {

    @Autowired
    private SoTiemChungRepository soTiemChungRepository;

    @Autowired
    private ThuCungRepository thuCungRepository;

    @Autowired
    private NhanVienRepository nhanVienRepository;

    @Autowired
    private LichHenRepository lichHenRepository;

    public Page<SoTiemChungResponse> getAllSoTiemChung(Pageable pageable) {
        return soTiemChungRepository.findAll(pageable).map(this::convertToResponse);
    }

    public List<SoTiemChungResponse> getSoTiemChungByThuCungId(Integer thuCungId) {
        List<SoTiemChung> list = soTiemChungRepository.findByThuCung_ThuCungId(thuCungId);
        return list.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    @Transactional
    public SoTiemChungResponse addSoTiemChung(Integer thuCungId, SoTiemChungRequest request) {
        ThuCung thuCung = thuCungRepository.findById(thuCungId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thú cưng với ID: " + thuCungId));
        
        SoTiemChung stc = new SoTiemChung();
        stc.setThuCung(thuCung);
        stc.setTenVacXin(request.getTenVacXin());
        stc.setNgayTiem(request.getNgayTiem());
        stc.setNgayTaiChung(request.getNgayTaiChung());
        stc.setGhiChu(request.getGhiChu());

        if (request.getNhanVienId() != null) {
            NhanVien nhanVien = nhanVienRepository.findById(request.getNhanVienId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên với ID: " + request.getNhanVienId()));
            stc.setNhanVien(nhanVien);
        }

        if (request.getLichHenId() != null) {
            LichHen lichHen = lichHenRepository.findById(request.getLichHenId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy lịch hẹn với ID: " + request.getLichHenId()));
            
            if (lichHen.getThuCung() != null && !lichHen.getThuCung().getThuCungId().equals(thuCungId)) {
                throw new RuntimeException("Lịch hẹn không khớp với thú cưng này.");
            }

            stc.setLichHen(lichHen);
            lichHen.setTrangThai(LichHen.TrangThai.DA_HOAN_THANH);
            lichHenRepository.save(lichHen);
        }

        SoTiemChung saved = soTiemChungRepository.save(stc);
        return convertToResponse(saved);
    }

    @Transactional
    public SoTiemChungResponse updateSoTiemChung(Integer id, SoTiemChungRequest request) {
        SoTiemChung stc = soTiemChungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sổ tiêm chủng với ID: " + id));

        stc.setTenVacXin(request.getTenVacXin());
        stc.setNgayTiem(request.getNgayTiem());
        stc.setNgayTaiChung(request.getNgayTaiChung());
        stc.setGhiChu(request.getGhiChu());

        if (request.getNhanVienId() != null) {
            NhanVien nhanVien = nhanVienRepository.findById(request.getNhanVienId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên với ID: " + request.getNhanVienId()));
            stc.setNhanVien(nhanVien);
        }

        // Không cho phép sửa LichHenId ở đây để tránh logic phức tạp, 
        // nếu muốn sửa liên kết lịch hẹn thì cần logic riêng.

        SoTiemChung saved = soTiemChungRepository.save(stc);
        return convertToResponse(saved);
    }

    public void deleteSoTiemChung(Integer id) {
        soTiemChungRepository.deleteById(id);
    }

    private SoTiemChungResponse convertToResponse(SoTiemChung stc) {
        return new SoTiemChungResponse(
                stc.getTiemChungId(),
                stc.getThuCung().getThuCungId(),
                stc.getThuCung().getTenThuCung(),
                stc.getTenVacXin(),
                stc.getNgayTiem(),
                stc.getNgayTaiChung(),
                stc.getNhanVien() != null ? stc.getNhanVien().getNhanVienId() : null,
                stc.getNhanVien() != null ? stc.getNhanVien().getHoTen() : "Không rõ",
                stc.getLichHen() != null ? stc.getLichHen().getLichHenId() : null,
                stc.getGhiChu()
        );
    }
}
