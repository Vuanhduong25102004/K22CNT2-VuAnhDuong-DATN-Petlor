package com.example.petlorshop.repositories;

import com.example.petlorshop.models.SoTiemChung;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SoTiemChungRepository extends JpaRepository<SoTiemChung, Integer> {
    List<SoTiemChung> findByThuCung_ThuCungId(Integer thuCungId);

    // Global Search (List)
    @Query("SELECT s FROM SoTiemChung s WHERE LOWER(s.tenVacXin) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(s.ghiChu) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<SoTiemChung> searchByKeyword(@Param("keyword") String keyword);

    // Page Search
    @Query("SELECT s FROM SoTiemChung s WHERE LOWER(s.tenVacXin) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(s.ghiChu) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<SoTiemChung> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
