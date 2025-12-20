package com.example.petlorshop.repositories;

import com.example.petlorshop.models.KhuyenMai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai, Integer> {
    Optional<KhuyenMai> findByMaCode(String maCode);
}
