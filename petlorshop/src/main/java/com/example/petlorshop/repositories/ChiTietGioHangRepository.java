package com.example.petlorshop.repositories;

import com.example.petlorshop.models.ChiTietGioHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChiTietGioHangRepository extends JpaRepository<ChiTietGioHang, Integer> {
    Optional<ChiTietGioHang> findByGioHang_GioHangIdAndSanPham_SanPhamId(Integer gioHangId, Integer sanPhamId);
}
