package com.example.petlorshop.services;

import com.example.petlorshop.dto.GiaoDichThanhToanRequest;
import com.example.petlorshop.dto.GiaoDichThanhToanResponse;
import com.example.petlorshop.dto.ThongBaoRequest;
import com.example.petlorshop.models.DonHang;
import com.example.petlorshop.models.GiaoDichThanhToan;
import com.example.petlorshop.models.ThongBao;
import com.example.petlorshop.repositories.DonHangRepository;
import com.example.petlorshop.repositories.GiaoDichThanhToanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GiaoDichThanhToanService {

    @Autowired
    private GiaoDichThanhToanRepository giaoDichRepository;

    @Autowired
    private DonHangRepository donHangRepository;

    @Autowired
    private ThongBaoService thongBaoService;

    @Transactional
    public GiaoDichThanhToanResponse createGiaoDich(GiaoDichThanhToanRequest request) {
        DonHang donHang = donHangRepository.findById(request.getDonHangId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        GiaoDichThanhToan gd = new GiaoDichThanhToan();
        gd.setDonHang(donHang);
        gd.setMaGiaoDich(request.getMaGiaoDich());
        gd.setSoTien(request.getSoTien());
        gd.setTrangThai(request.getTrangThai());
        gd.setNoiDungLoi(request.getNoiDungLoi());

        GiaoDichThanhToan saved = giaoDichRepository.save(gd);

        // Tự động cập nhật trạng thái đơn hàng nếu thanh toán thành công
        if (request.getTrangThai() == GiaoDichThanhToan.TrangThaiGiaoDich.THANH_CONG) {
            donHang.setTrangThai(DonHang.TrangThaiDonHang.DA_XAC_NHAN);
            donHangRepository.save(donHang);

            // Gửi thông báo
            ThongBaoRequest tbRequest = new ThongBaoRequest();
            tbRequest.setUserId(donHang.getNguoiDung().getUserId());
            tbRequest.setTieuDe("Thanh toán thành công");
            tbRequest.setNoiDung("Đơn hàng #" + donHang.getDonHangId() + " đã được thanh toán thành công.");
            tbRequest.setLoaiThongBao(ThongBao.LoaiThongBao.DON_HANG);
            tbRequest.setLienKet("/don-hang/" + donHang.getDonHangId());
            thongBaoService.createThongBao(tbRequest);
        }

        return convertToResponse(saved);
    }

    public List<GiaoDichThanhToanResponse> getGiaoDichByDonHang(Integer donHangId) {
        return giaoDichRepository.findByDonHang_DonHangId(donHangId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private GiaoDichThanhToanResponse convertToResponse(GiaoDichThanhToan gd) {
        return new GiaoDichThanhToanResponse(
                gd.getGiaoDichId(),
                gd.getDonHang().getDonHangId(),
                gd.getMaGiaoDich(),
                gd.getSoTien(),
                gd.getNgayTao(),
                gd.getTrangThai(),
                gd.getNoiDungLoi()
        );
    }
}
