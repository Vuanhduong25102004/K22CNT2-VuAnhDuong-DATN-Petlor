package com.example.petlorshop.repositories;

import com.example.petlorshop.models.GiaoDichThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GiaoDichThanhToanRepository extends JpaRepository<GiaoDichThanhToan, Integer> {
    List<GiaoDichThanhToan> findByDonHang_DonHangId(Integer donHangId);
}
