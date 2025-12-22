package com.example.petlorshop.repositories;

import com.example.petlorshop.models.SoTiemChung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SoTiemChungRepository extends JpaRepository<SoTiemChung, Integer> {
    List<SoTiemChung> findByThuCung_ThuCungId(Integer thuCungId);
}
