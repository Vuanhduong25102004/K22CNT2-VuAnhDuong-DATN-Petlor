package com.example.petlorshop.services;

import com.example.petlorshop.dto.DashboardResponse;
import com.example.petlorshop.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.List;

@Service
public class DashboardService {

    @Autowired private DonHangRepository donHangRepository;
    @Autowired private NguoiDungRepository nguoiDungRepository;
    @Autowired private LichHenRepository lichHenRepository;
    @Autowired private DichVuRepository dichVuRepository;
    @Autowired private NhanVienRepository nhanVienRepository;

    public DashboardResponse getDashboardData() {
        DashboardResponse response = new DashboardResponse();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfMonth = YearMonth.now().atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = YearMonth.now().atEndOfMonth().atTime(LocalTime.MAX);

        // 1. Doanh thu tháng này
        BigDecimal revenue = donHangRepository.sumRevenueByDateRange(startOfMonth, endOfMonth);
        response.setDoanhThuThangNay(revenue != null ? revenue : BigDecimal.ZERO);

        // 2. Tổng đơn hàng
        Long totalOrders = donHangRepository.countOrdersByDateRange(startOfMonth, endOfMonth);
        response.setTongDonHang(totalOrders != null ? totalOrders : 0L);

        // 3. Khách hàng mới trong tháng
        Long newCustomers = nguoiDungRepository.countNewCustomers(startOfMonth, endOfMonth);
        response.setKhachHangMoi(newCustomers != null ? newCustomers : 0L);

        // 4. Dịch vụ đang chạy
        long activeServices = dichVuRepository.count();
        response.setDichVuDangChay(activeServices);

        // 5. Danh sách nhân viên (Thay vì tổng số)
        List<DashboardResponse.StaffDto> staffList = nhanVienRepository.findAllStaffForDashboard();
        response.setDanhSachNhanVien(staffList);

        // 6. Biểu đồ doanh thu
        int currentYear = LocalDate.now().getYear();
        List<DashboardResponse.RevenueChartData> chartData = donHangRepository.getMonthlyRevenue(currentYear);
        response.setBieuDoDoanhThu(chartData);

        // 7. Sản phẩm bán chạy
        List<DashboardResponse.TopProductDto> topProducts = donHangRepository.findTopSellingProducts(PageRequest.of(0, 5));
        response.setSanPhamBanChay(topProducts);

        // 8. Dịch vụ phổ biến
        List<DashboardResponse.TopServiceDto> topServices = lichHenRepository.findTopServices(PageRequest.of(0, 5));
        response.setDichVuPhoBien(topServices);

        return response;
    }
}
