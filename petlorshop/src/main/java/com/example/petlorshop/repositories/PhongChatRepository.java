package com.example.petlorshop.repositories;

import com.example.petlorshop.models.PhongChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhongChatRepository extends JpaRepository<PhongChat, Integer> {
    List<PhongChat> findByNguoiDung_UserId(Integer userId);
    List<PhongChat> findByNhanVien_NhanVienId(Integer nhanVienId);
}
