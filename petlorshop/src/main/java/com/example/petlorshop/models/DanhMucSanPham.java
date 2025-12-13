package com.example.petlorshop.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "DanhMucSanPham")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DanhMucSanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "danh_muc_id")
    private Integer danhMucId;

    @Column(name = "ten_danh_muc", nullable = false, length = 100)
    private String tenDanhMuc;

    @Column(name = "mo_ta", columnDefinition = "TEXT")
    private String moTa;

    // --- Relationships ---

    @JsonIgnore
    @OneToMany(mappedBy = "danhMucSanPham")
    private List<SanPham> danhSachSanPham;
}