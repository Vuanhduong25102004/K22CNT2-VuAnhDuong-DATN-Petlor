package com.example.petlorshop.repositories;

import com.example.petlorshop.models.NhaCungCap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NhaCungCapRepository extends JpaRepository<NhaCungCap, Integer> {
    boolean existsBySoDienThoai(String soDienThoai);
    boolean existsBySoDienThoaiAndNccIdNot(String soDienThoai, Integer nccId);

    // Global Search (List)
    @Query("SELECT n FROM NhaCungCap n WHERE LOWER(n.tenNcc) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(n.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR n.soDienThoai LIKE CONCAT('%', :keyword, '%')")
    List<NhaCungCap> searchByKeyword(@Param("keyword") String keyword);

    // Page Search
    @Query("SELECT n FROM NhaCungCap n WHERE LOWER(n.tenNcc) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(n.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR n.soDienThoai LIKE CONCAT('%', :keyword, '%')")
    Page<NhaCungCap> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
