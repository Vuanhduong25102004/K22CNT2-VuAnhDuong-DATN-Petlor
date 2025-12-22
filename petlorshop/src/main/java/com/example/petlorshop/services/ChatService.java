package com.example.petlorshop.services;

import com.example.petlorshop.dto.ChatRequest;
import com.example.petlorshop.dto.PhongChatResponse;
import com.example.petlorshop.dto.TinNhanResponse;
import com.example.petlorshop.models.*;
import com.example.petlorshop.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    private PhongChatRepository phongChatRepository;

    @Autowired
    private TinNhanRepository tinNhanRepository;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    public PhongChatResponse createPhongChat(ChatRequest request) {
        NguoiDung user = nguoiDungRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        PhongChat pc = new PhongChat();
        pc.setNguoiDung(user);
        pc.setTieuDe(request.getTieuDe());
        
        PhongChat saved = phongChatRepository.save(pc);
        return convertToPhongChatResponse(saved);
    }

    public TinNhanResponse guiTinNhan(ChatRequest request) {
        PhongChat pc = phongChatRepository.findById(request.getPhongChatId())
                .orElseThrow(() -> new RuntimeException("Phòng chat không tồn tại"));

        TinNhan tn = new TinNhan();
        tn.setPhongChat(pc);
        tn.setNguoiGuiId(request.getNguoiGuiId());
        tn.setLoaiNguoiGui(request.getLoaiNguoiGui());
        tn.setNoiDung(request.getNoiDung());
        
        TinNhan saved = tinNhanRepository.save(tn);
        return convertToTinNhanResponse(saved);
    }

    public List<TinNhanResponse> getTinNhanByPhong(Integer phongChatId) {
        return tinNhanRepository.findByPhongChat_PhongChatIdOrderByThoiGianAsc(phongChatId).stream()
                .map(this::convertToTinNhanResponse)
                .collect(Collectors.toList());
    }

    private PhongChatResponse convertToPhongChatResponse(PhongChat pc) {
        return new PhongChatResponse(
                pc.getPhongChatId(),
                pc.getNguoiDung().getHoTen(),
                pc.getNhanVien() != null ? pc.getNhanVien().getHoTen() : null,
                pc.getTieuDe(),
                pc.getTrangThai(),
                pc.getNgayTao()
        );
    }

    private TinNhanResponse convertToTinNhanResponse(TinNhan tn) {
        return new TinNhanResponse(
                tn.getTinNhanId(),
                tn.getNguoiGuiId(),
                tn.getLoaiNguoiGui(),
                tn.getNoiDung(),
                tn.getThoiGian(),
                tn.getDaXem()
        );
    }
}
