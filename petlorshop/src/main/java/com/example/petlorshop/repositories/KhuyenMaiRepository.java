package com.example.petlorshop.repositories;

import com.example.petlorshop.models.KhuyenMai;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai, Integer> {
    Optional<KhuyenMai> findByMaCode(String maCode);

    // Global Search (List) - Bỏ tenKhuyenMai
    @Query("SELECT k FROM KhuyenMai k WHERE LOWER(k.maCode) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(k.moTa) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<KhuyenMai> searchByKeyword(@Param("keyword") String keyword);

    // Page Search - Bỏ tenKhuyenMai
    @Query("SELECT k FROM KhuyenMai k WHERE LOWER(k.maCode) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(k.moTa) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<KhuyenMai> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
