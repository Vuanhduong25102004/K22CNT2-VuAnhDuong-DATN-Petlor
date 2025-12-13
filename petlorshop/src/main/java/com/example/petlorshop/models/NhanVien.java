package com.example.petlorshop.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "NhanVien")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NhanVien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nhan_vien_id")
    private Integer nhanVienId;

    @Column(name = "ho_ten", nullable = false, length = 255)
    private String hoTen;

    @Column(name = "chuc_vu", length = 100)
    private String chucVu;

    @Column(name = "so_dien_thoai", length = 20)
    private String soDienThoai;

    @Column(unique = true, length = 255)
    private String email;

    // --- Relationships ---

    @JsonIgnore
    @OneToMany(mappedBy = "nhanVien")
    private List<LichHen> danhSachLichHen;
}