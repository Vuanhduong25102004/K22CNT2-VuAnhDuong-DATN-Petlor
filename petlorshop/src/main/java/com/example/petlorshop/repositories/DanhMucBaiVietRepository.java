package com.example.petlorshop.repositories;

import com.example.petlorshop.models.DanhMucBaiViet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DanhMucBaiVietRepository extends JpaRepository<DanhMucBaiViet, Integer> {
    // Global Search (List)
    @Query("SELECT d FROM DanhMucBaiViet d WHERE LOWER(d.tenDanhMuc) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(d.moTa) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<DanhMucBaiViet> searchByKeyword(@Param("keyword") String keyword);

    // Page Search
    @Query("SELECT d FROM DanhMucBaiViet d WHERE LOWER(d.tenDanhMuc) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(d.moTa) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<DanhMucBaiViet> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
