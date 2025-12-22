package com.example.petlorshop.services;

import com.example.petlorshop.dto.ThongBaoRequest;
import com.example.petlorshop.dto.ThongBaoResponse;
import com.example.petlorshop.models.NguoiDung;
import com.example.petlorshop.models.ThongBao;
import com.example.petlorshop.repositories.NguoiDungRepository;
import com.example.petlorshop.repositories.ThongBaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ThongBaoService {

    @Autowired
    private ThongBaoRepository thongBaoRepository;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    public ThongBaoResponse createThongBao(ThongBaoRequest request) {
        NguoiDung user = nguoiDungRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        ThongBao tb = new ThongBao();
        tb.setNguoiDung(user);
        tb.setTieuDe(request.getTieuDe());
        tb.setNoiDung(request.getNoiDung());
        tb.setLoaiThongBao(request.getLoaiThongBao());
        tb.setLienKet(request.getLienKet());

        ThongBao saved = thongBaoRepository.save(tb);
        return convertToResponse(saved);
    }

    public List<ThongBaoResponse> getThongBaoByUser(Integer userId) {
        return thongBaoRepository.findByNguoiDung_UserIdOrderByNgayTaoDesc(userId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public void markAsRead(Integer thongBaoId) {
        ThongBao tb = thongBaoRepository.findById(thongBaoId)
                .orElseThrow(() -> new RuntimeException("Thông báo không tồn tại"));
        tb.setDaDoc(true);
        thongBaoRepository.save(tb);
    }

    private ThongBaoResponse convertToResponse(ThongBao tb) {
        return new ThongBaoResponse(
                tb.getThongBaoId(),
                tb.getTieuDe(),
                tb.getNoiDung(),
                tb.getLoaiThongBao(),
                tb.getLienKet(),
                tb.getDaDoc(),
                tb.getNgayTao()
        );
    }
}
