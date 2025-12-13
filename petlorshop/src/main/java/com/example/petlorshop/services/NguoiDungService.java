package com.example.petlorshop.services;

import com.example.petlorshop.dto.UpdateNguoiDungRequest;
import com.example.petlorshop.models.NguoiDung;
import com.example.petlorshop.repositories.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NguoiDungService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public NguoiDung createNguoiDung(NguoiDung nguoiDung) {
        if (nguoiDungRepository.findByEmail(nguoiDung.getEmail()).isPresent()) {
            throw new RuntimeException("Email đã tồn tại, vui lòng nhập email khác");
        }
        // Password should be hashed before calling this method.
        return nguoiDungRepository.save(nguoiDung);
    }

    public List<NguoiDung> getAllNguoiDung() {
        return nguoiDungRepository.findAll();
    }

    public Optional<NguoiDung> getNguoiDungById(Integer id) {
        return nguoiDungRepository.findById(id);
    }

    public NguoiDung updateNguoiDung(Integer id, UpdateNguoiDungRequest request) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("NguoiDung not found with id: " + id));

        // Check if the new email is already taken by another user
        Optional<NguoiDung> existingUserWithEmail = nguoiDungRepository.findByEmail(request.getEmail());
        if (existingUserWithEmail.isPresent() && !existingUserWithEmail.get().getUserId().equals(id)) {
            throw new RuntimeException("Email đã được sử dụng bởi người dùng khác.");
        }

        nguoiDung.setHoTen(request.getHoTen());
        nguoiDung.setEmail(request.getEmail());
        nguoiDung.setSoDienThoai(request.getSoDienThoai());
        nguoiDung.setDiaChi(request.getDiaChi());

        // Only update the password if a new one is provided
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            nguoiDung.setMatKhau(passwordEncoder.encode(request.getPassword()));
        }

        return nguoiDungRepository.save(nguoiDung);
    }

    public void deleteNguoiDung(Integer id) {
        if (!nguoiDungRepository.existsById(id)) {
            throw new RuntimeException("NguoiDung not found with id: " + id);
        }
        nguoiDungRepository.deleteById(id);
    }

    public Optional<NguoiDung> findByEmail(String email) {
        return nguoiDungRepository.findByEmail(email);
    }

    public Optional<NguoiDung> findBySoDienThoai(String soDienThoai) {
        return nguoiDungRepository.findBySoDienThoai(soDienThoai);
    }
}
