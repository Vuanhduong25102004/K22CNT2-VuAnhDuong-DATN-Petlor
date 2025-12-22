package com.example.petlorshop.repositories;

import com.example.petlorshop.models.TinNhan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TinNhanRepository extends JpaRepository<TinNhan, Integer> {
    List<TinNhan> findByPhongChat_PhongChatIdOrderByThoiGianAsc(Integer phongChatId);
}
