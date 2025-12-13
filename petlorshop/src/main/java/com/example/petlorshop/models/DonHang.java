package com.example.petlorshop.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "DonHang")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DonHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "don_hang_id")
    private Integer donHangId;

    @CreationTimestamp
    @Column(name = "ngay_dat_hang", nullable = false, updatable = false)
    private LocalDateTime ngayDatHang;

    @Column(name = "tong_tien", nullable = false, precision = 10, scale = 2)
    private BigDecimal tongTien;

    @Column(name = "trang_thai_don_hang", length = 50)
    private String trangThaiDonHang;

    @Column(name = "dia_chi_giao_hang", nullable = false, columnDefinition = "TEXT")
    private String diaChiGiaoHang;

    // --- Relationships ---

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private NguoiDung nguoiDung;

    @OneToMany(mappedBy = "donHang", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChiTietDonHang> chiTietDonHangs;
}