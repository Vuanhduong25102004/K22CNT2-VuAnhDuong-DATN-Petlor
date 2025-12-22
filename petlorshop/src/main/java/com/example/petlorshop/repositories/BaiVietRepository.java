package com.example.petlorshop.repositories;

import com.example.petlorshop.models.BaiViet;
import com.example.petlorshop.models.DanhMucBaiViet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BaiVietRepository extends JpaRepository<BaiViet, Integer> {
    Optional<BaiViet> findBySlug(String slug);
    List<BaiViet> findByTrangThai(BaiViet.TrangThaiBaiViet trangThai);
    List<BaiViet> findByDanhMucBaiViet(DanhMucBaiViet danhMucBaiViet);
}
