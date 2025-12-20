package com.example.petlorshop.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "danh_muc_dich_vu")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DanhMucDichVu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "danh_muc_dv_id")
    private Integer danhMucDvId;

    @Column(name = "ten_danh_muc_dv", nullable = false, length = 100)
    private String tenDanhMucDv;

    @Column(name = "mo_ta", columnDefinition = "TEXT")
    private String moTa;

    @JsonIgnore
    @OneToMany(mappedBy = "danhMucDichVu")
    private List<DichVu> danhSachDichVu;
}
