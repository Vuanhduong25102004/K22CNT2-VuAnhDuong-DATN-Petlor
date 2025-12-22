package com.example.petlorshop.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;

@Entity
@Table(name = "bai_viet")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE bai_viet SET da_xoa = true WHERE bai_viet_id = ?")
@Where(clause = "da_xoa = false")
public class BaiViet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bai_viet_id")
    private Integer baiVietId;

    @Column(name = "tieu_de", nullable = false)
    private String tieuDe;

    @Column(name = "slug", nullable = false)
    private String slug;

    @Column(name = "noi_dung", nullable = false, columnDefinition = "LONGTEXT")
    private String noiDung;

    @Column(name = "anh_bia", columnDefinition = "TEXT")
    private String anhBia;

    @CreationTimestamp
    @Column(name = "ngay_dang")
    private LocalDateTime ngayDang;

    @ManyToOne
    @JoinColumn(name = "nhan_vien_id", nullable = false)
    private NhanVien nhanVien;

    @ManyToOne
    @JoinColumn(name = "danh_muc_bv_id")
    private DanhMucBaiViet danhMucBaiViet;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThaiBaiViet trangThai = TrangThaiBaiViet.NHAP;

    @Column(name = "da_xoa")
    private boolean daXoa = false;

    public enum TrangThaiBaiViet {
        NHAP, CONG_KHAI, AN
    }
}
