package com.example.petlorshop.repositories;

import com.example.petlorshop.models.DonHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Integer> {
    
    // Global Search (List)
    @Query("SELECT d FROM DonHang d WHERE LOWER(d.trangThai) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(d.diaChiGiaoHang) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<DonHang> searchByKeyword(@Param("keyword") String keyword);

    // Page Search
    @Query("SELECT d FROM DonHang d WHERE LOWER(d.trangThai) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(d.diaChiGiaoHang) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<DonHang> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    List<DonHang> findByNguoiDung_Email(String email);
}
