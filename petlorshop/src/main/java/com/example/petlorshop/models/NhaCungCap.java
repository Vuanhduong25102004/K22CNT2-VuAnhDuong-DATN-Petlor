package com.example.petlorshop.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "nha_cung_cap")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE nha_cung_cap SET da_xoa = true WHERE ncc_id = ?")
@Where(clause = "da_xoa = false")
public class NhaCungCap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ncc_id")
    private Integer nccId;

    @Column(name = "ten_ncc", nullable = false)
    private String tenNcc;

    @Column(name = "so_dien_thoai", length = 20, unique = true)
    private String soDienThoai;

    @Column(name = "email")
    private String email;

    @Column(name = "dia_chi", columnDefinition = "TEXT")
    private String diaChi;

    @Column(name = "da_xoa")
    private boolean daXoa = false;
}
