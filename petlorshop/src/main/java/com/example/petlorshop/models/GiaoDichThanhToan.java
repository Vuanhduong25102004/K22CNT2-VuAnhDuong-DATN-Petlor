package com.example.petlorshop.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "giao_dich_thanh_toan")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GiaoDichThanhToan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "giao_dich_id")
    private Integer giaoDichId;

    @ManyToOne
    @JoinColumn(name = "don_hang_id", nullable = false)
    private DonHang donHang;

    @Column(name = "ma_giao_dich")
    private String maGiaoDich;

    @Column(name = "so_tien", nullable = false)
    private BigDecimal soTien;

    @CreationTimestamp
    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThaiGiaoDich trangThai = TrangThaiGiaoDich.CHO_XU_LY;

    @Column(name = "noi_dung_loi", columnDefinition = "TEXT")
    private String noiDungLoi;

    public enum TrangThaiGiaoDich {
        THANH_CONG, THAT_BAI, CHO_XU_LY
    }
}
