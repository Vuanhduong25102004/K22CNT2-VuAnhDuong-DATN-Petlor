package com.example.petlorshop.repositories;

import com.example.petlorshop.dto.DashboardResponse;
import com.example.petlorshop.models.DonHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Integer> {
    
    @Query("SELECT d FROM DonHang d WHERE LOWER(d.trangThai) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(d.diaChiGiaoHang) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<DonHang> searchByKeyword(@Param("keyword") String keyword);

    @Query("SELECT d FROM DonHang d WHERE LOWER(d.trangThai) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(d.diaChiGiaoHang) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<DonHang> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    List<DonHang> findByNguoiDung_Email(String email);

    // --- Dashboard Queries ---

    @Query("SELECT SUM(d.tongThanhToan) FROM DonHang d WHERE d.trangThai = 'DA_GIAO' AND d.ngayDatHang BETWEEN :start AND :end")
    BigDecimal sumRevenueByDateRange(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(d) FROM DonHang d WHERE d.ngayDatHang BETWEEN :start AND :end")
    Long countOrdersByDateRange(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT new com.example.petlorshop.dto.DashboardResponse$RevenueChartData(MONTH(d.ngayDatHang), SUM(d.tongThanhToan)) " +
           "FROM DonHang d WHERE d.trangThai = 'DA_GIAO' AND YEAR(d.ngayDatHang) = :year " +
           "GROUP BY MONTH(d.ngayDatHang) ORDER BY MONTH(d.ngayDatHang)")
    List<DashboardResponse.RevenueChartData> getMonthlyRevenue(@Param("year") int year);

    // Top sản phẩm bán chạy (Đã thêm hinhAnh)
    @Query("SELECT new com.example.petlorshop.dto.DashboardResponse$TopProductDto(sp.tenSanPham, SUM(ct.soLuong), SUM(ct.donGia * ct.soLuong), sp.hinhAnh) " +
           "FROM ChiTietDonHang ct JOIN ct.sanPham sp JOIN ct.donHang dh " +
           "WHERE dh.trangThai = 'DA_GIAO' " +
           "GROUP BY sp.sanPhamId, sp.tenSanPham, sp.hinhAnh " +
           "ORDER BY SUM(ct.soLuong) DESC")
    List<DashboardResponse.TopProductDto> findTopSellingProducts(Pageable pageable);
}
