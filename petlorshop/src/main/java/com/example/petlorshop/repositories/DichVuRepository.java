package com.example.petlorshop.repositories;

import com.example.petlorshop.models.DichVu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DichVuRepository extends JpaRepository<DichVu, Integer> {
    
    // Global Search (List)
    @Query("SELECT d FROM DichVu d WHERE LOWER(d.tenDichVu) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(d.moTa) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<DichVu> searchByKeyword(@Param("keyword") String keyword);

    // Page Search
    Page<DichVu> findByTenDichVuContainingIgnoreCaseOrMoTaContainingIgnoreCase(String tenDichVu, String moTa, Pageable pageable);

    // Filter by Category
    Page<DichVu> findByDanhMucDichVu_DanhMucDvId(Integer danhMucDvId, Pageable pageable);
}
