package com.example.petlorshop.repositories;

import com.example.petlorshop.models.NguoiDung;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface NguoiDungRepository extends JpaRepository<NguoiDung, Integer> {
    Optional<NguoiDung> findByEmail(String email);

    Optional<NguoiDung> findBySoDienThoai(String soDienThoai);

    @Query("SELECT u FROM NguoiDung u WHERE LOWER(u.hoTen) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR u.soDienThoai LIKE CONCAT('%', :keyword, '%')")
    List<NguoiDung> searchByKeyword(@Param("keyword") String keyword);

    @Query("SELECT u FROM NguoiDung u WHERE LOWER(u.hoTen) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR u.soDienThoai LIKE CONCAT('%', :keyword, '%')")
    Page<NguoiDung> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    // Đếm khách hàng mới trong khoảng thời gian (Role USER)
    @Query("SELECT COUNT(u) FROM NguoiDung u WHERE u.role = 'USER' AND u.ngayTao BETWEEN :start AND :end")
    Long countNewCustomers(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
