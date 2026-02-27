package com.example.petlorshop.repositories;

import com.example.petlorshop.dto.DashboardResponse;
import com.example.petlorshop.models.LichHen;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LichHenRepository extends JpaRepository<LichHen, Integer> {

    @Query("SELECT lh FROM LichHen lh WHERE lh.nhanVien.nhanVienId = :nhanVienId AND NOT (lh.thoiGianKetThuc <= :newStart OR lh.thoiGianBatDau >= :newEnd)")
    List<LichHen> findOverlappingAppointments(@Param("nhanVienId") Integer nhanVienId,
                                            @Param("newStart") LocalDateTime newStart,
                                            @Param("newEnd") LocalDateTime newEnd);

    @Query("SELECT lh FROM LichHen lh WHERE lh.nhanVien.nhanVienId = :nhanVienId AND lh.thoiGianBatDau BETWEEN :start AND :end ORDER BY lh.thoiGianBatDau")
    List<LichHen> findByNhanVienIdAndDateRange(@Param("nhanVienId") Integer nhanVienId,
                                        @Param("start") LocalDateTime start,
                                        @Param("end") LocalDateTime end);

    @Query("SELECT lh FROM LichHen lh WHERE lh.thoiGianBatDau BETWEEN :start AND :end ORDER BY lh.thoiGianBatDau")
    List<LichHen> findAllByDateRange(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT l FROM LichHen l WHERE LOWER(l.ghiChu) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<LichHen> searchByKeyword(@Param("keyword") String keyword);

    @Query("SELECT l FROM LichHen l WHERE LOWER(l.ghiChu) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<LichHen> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    List<LichHen> findByNguoiDung_Email(String email);
    
    List<LichHen> findByNhanVien_NhanVienId(Integer nhanVienId);

    @Query("SELECT COUNT(lh) FROM LichHen lh WHERE lh.nhanVien.nhanVienId = :nhanVienId AND lh.thoiGianBatDau BETWEEN :start AND :end")
    long countLichHenByTimeRange(@Param("nhanVienId") Integer nhanVienId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(lh) FROM LichHen lh WHERE lh.nhanVien.nhanVienId = :nhanVienId AND lh.loaiLichHen = :loaiLichHen AND lh.thoiGianBatDau BETWEEN :start AND :end")
    long countCaKhanCapByTimeRange(@Param("nhanVienId") Integer nhanVienId, @Param("loaiLichHen") LichHen.LoaiLichHen loaiLichHen, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(lh) FROM LichHen lh WHERE lh.nhanVien.nhanVienId = :nhanVienId AND lh.trangThai = :trangThai")
    long countBenhNhanDaTiepNhan(@Param("nhanVienId") Integer nhanVienId, @Param("trangThai") LichHen.TrangThai trangThai);

    // --- Dashboard Queries ---

    // Top dịch vụ phổ biến (dựa trên số lượng lịch hẹn đã hoàn thành)
    @Query("SELECT new com.example.petlorshop.dto.DashboardResponse$TopServiceDto(dv.tenDichVu, COUNT(lh)) " +
           "FROM LichHen lh JOIN lh.dichVu dv " +
           "WHERE lh.trangThai = 'DA_HOAN_THANH' " +
           "GROUP BY dv.dichVuId, dv.tenDichVu " +
           "ORDER BY COUNT(lh) DESC")
    List<DashboardResponse.TopServiceDto> findTopServices(Pageable pageable);
}
