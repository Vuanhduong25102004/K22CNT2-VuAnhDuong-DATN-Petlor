package com.example.petlorshop.repositories;

import com.example.petlorshop.models.DanhMucDichVu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DanhMucDichVuRepository extends JpaRepository<DanhMucDichVu, Integer> {
    // Global Search (List)
    @Query("SELECT d FROM DanhMucDichVu d WHERE LOWER(d.tenDanhMucDv) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(d.moTa) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<DanhMucDichVu> searchByKeyword(@Param("keyword") String keyword);

    // Page Search
    @Query("SELECT d FROM DanhMucDichVu d WHERE LOWER(d.tenDanhMucDv) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(d.moTa) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<DanhMucDichVu> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
