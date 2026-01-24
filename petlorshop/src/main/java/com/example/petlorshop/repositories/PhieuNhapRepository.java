package com.example.petlorshop.repositories;

import com.example.petlorshop.models.PhieuNhap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhieuNhapRepository extends JpaRepository<PhieuNhap, Integer> {
    // Global Search (List)
    @Query("SELECT p FROM PhieuNhap p WHERE LOWER(p.ghiChu) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<PhieuNhap> searchByKeyword(@Param("keyword") String keyword);

    // Page Search
    @Query("SELECT p FROM PhieuNhap p WHERE LOWER(p.ghiChu) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<PhieuNhap> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
