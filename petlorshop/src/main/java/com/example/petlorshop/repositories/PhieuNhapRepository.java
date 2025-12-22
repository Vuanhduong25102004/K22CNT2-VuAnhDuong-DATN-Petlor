package com.example.petlorshop.repositories;

import com.example.petlorshop.models.PhieuNhap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhieuNhapRepository extends JpaRepository<PhieuNhap, Integer> {
}
