package com.example.petlorshop.repositories;

import com.example.petlorshop.models.DanhMucSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DanhMucSanPhamRepository extends JpaRepository<DanhMucSanPham, Integer> {
}
