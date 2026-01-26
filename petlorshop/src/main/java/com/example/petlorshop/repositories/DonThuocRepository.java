package com.example.petlorshop.repositories;

import com.example.petlorshop.models.DonThuoc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonThuocRepository extends JpaRepository<DonThuoc, Integer> {
    Optional<DonThuoc> findByLichHen_LichHenId(Integer lichHenId);
    List<DonThuoc> findByThuCung_ThuCungId(Integer thuCungId);

    // Global Search (List)
    @Query("SELECT d FROM DonThuoc d WHERE LOWER(d.lichHen.tenKhachHang) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(d.bacSi.hoTen) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(d.chanDoan) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<DonThuoc> searchByKeyword(@Param("keyword") String keyword);

    // Page Search
    @Query("SELECT d FROM DonThuoc d WHERE LOWER(d.lichHen.tenKhachHang) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(d.bacSi.hoTen) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(d.chanDoan) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<DonThuoc> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
