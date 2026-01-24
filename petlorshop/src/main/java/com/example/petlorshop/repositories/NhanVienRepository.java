package com.example.petlorshop.repositories;

import com.example.petlorshop.models.NhanVien;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien, Integer> {

    Optional<NhanVien> findByEmail(String email);

    // Tìm nhân viên theo chức vụ (ví dụ: "Bác sĩ", "Spa")
    List<NhanVien> findByChucVuContainingIgnoreCase(String chucVu);

    // Global Search (List)
    @Query("SELECT n FROM NhanVien n WHERE LOWER(n.hoTen) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(n.chucVu) LIKE LOWER(CONCAT('%', :keyword, '%')) OR n.soDienThoai LIKE CONCAT('%', :keyword, '%') OR LOWER(n.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(n.chuyenKhoa) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<NhanVien> searchByKeyword(@Param("keyword") String keyword);

    // Page Search
    @Query("SELECT n FROM NhanVien n WHERE LOWER(n.hoTen) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(n.chucVu) LIKE LOWER(CONCAT('%', :keyword, '%')) OR n.soDienThoai LIKE CONCAT('%', :keyword, '%') OR LOWER(n.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(n.chuyenKhoa) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<NhanVien> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    // Tìm nhân viên theo User ID
    Optional<NhanVien> findByNguoiDung_UserId(Integer userId);
}
