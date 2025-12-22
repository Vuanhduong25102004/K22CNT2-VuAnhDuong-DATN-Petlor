package com.example.petlorshop.repositories;

import com.example.petlorshop.models.NhaCungCap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NhaCungCapRepository extends JpaRepository<NhaCungCap, Integer> {
    boolean existsBySoDienThoai(String soDienThoai);
    boolean existsBySoDienThoaiAndNccIdNot(String soDienThoai, Integer nccId);
}
