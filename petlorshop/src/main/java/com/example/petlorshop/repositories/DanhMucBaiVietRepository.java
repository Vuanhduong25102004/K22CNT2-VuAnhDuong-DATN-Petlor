package com.example.petlorshop.repositories;

import com.example.petlorshop.models.DanhMucBaiViet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DanhMucBaiVietRepository extends JpaRepository<DanhMucBaiViet, Integer> {
}
