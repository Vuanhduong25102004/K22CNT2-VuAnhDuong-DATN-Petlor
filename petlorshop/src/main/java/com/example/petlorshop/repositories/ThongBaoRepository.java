package com.example.petlorshop.repositories;

import com.example.petlorshop.models.ThongBao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThongBaoRepository extends JpaRepository<ThongBao, Integer> {
    List<ThongBao> findByNguoiDung_UserIdOrderByNgayTaoDesc(Integer userId);
    long countByNguoiDung_UserIdAndDaDocFalse(Integer userId);
}
