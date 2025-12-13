package com.example.petlorshop.services;

import com.example.petlorshop.models.LichHen;
import com.example.petlorshop.repositories.LichHenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LichHenService {

    @Autowired
    private LichHenRepository lichHenRepository;

    public List<LichHen> getAllLichHen() {
        return lichHenRepository.findAll();
    }

    public Optional<LichHen> getLichHenById(Integer id) {
        return lichHenRepository.findById(id);
    }

    public LichHen createLichHen(LichHen lichHen) {
        // Không cho phép đặt lịch vào thời gian trong quá khứ.
        if (lichHen.getThoiGianBatDau().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Không thể đặt lịch hẹn trong quá khứ.");
        }

        // Kiểm tra xem thời gian đó có bị trùng với một lịch hẹn khác của cùng một nhân viên không.
        if (lichHen.getNhanVien() != null) {
            List<LichHen> overlapping = lichHenRepository.findOverlappingAppointments(
                    lichHen.getNhanVien().getNhanVienId(),
                    lichHen.getThoiGianBatDau(),
                    lichHen.getThoiGianKetThuc()
            );
            if (!overlapping.isEmpty()) {
                throw new RuntimeException("Thời gian này đã có lịch hẹn khác. Vui lòng chọn thời gian khác.");
            }
        }

        lichHen.setTrangThaiLichHen("ĐÃ XÁC NHẬN");
        return lichHenRepository.save(lichHen);
    }

    public LichHen updateLichHen(Integer id, LichHen lichHenDetails) {
        LichHen lichHen = lichHenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lịch hẹn không tồn tại với id: " + id));

        lichHen.setThoiGianBatDau(lichHenDetails.getThoiGianBatDau());
        lichHen.setThoiGianKetThuc(lichHenDetails.getThoiGianKetThuc());
        lichHen.setTrangThaiLichHen(lichHenDetails.getTrangThaiLichHen());
        lichHen.setGhiChuKhachHang(lichHenDetails.getGhiChuKhachHang());

        return lichHenRepository.save(lichHen);
    }

    public void deleteLichHen(Integer id) {
        LichHen lichHen = lichHenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lịch hẹn không tồn tại với id: " + id));
        lichHenRepository.delete(lichHen);
    }
}
