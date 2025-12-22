package com.example.petlorshop.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "phieu_nhap")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE phieu_nhap SET da_xoa = true WHERE phieu_nhap_id = ?")
@Where(clause = "da_xoa = false")
public class PhieuNhap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "phieu_nhap_id")
    private Integer phieuNhapId;

    @ManyToOne
    @JoinColumn(name = "ncc_id", nullable = false)
    private NhaCungCap nhaCungCap;

    @ManyToOne
    @JoinColumn(name = "nhan_vien_id", nullable = false)
    private NhanVien nhanVien;

    @CreationTimestamp
    @Column(name = "ngay_nhap")
    private LocalDateTime ngayNhap;

    @Column(name = "tong_tien", nullable = false)
    private BigDecimal tongTien;

    @Column(name = "ghi_chu", columnDefinition = "TEXT")
    private String ghiChu;

    @OneToMany(mappedBy = "phieuNhap", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChiTietPhieuNhap> chiTietPhieuNhapList;

    @Column(name = "da_xoa")
    private boolean daXoa = false;
}
