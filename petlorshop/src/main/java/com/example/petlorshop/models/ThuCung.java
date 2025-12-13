package com.example.petlorshop.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "ThuCung")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThuCung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "thu_cung_id")
    private Integer thuCungId;

    @Column(name = "ten_thu_cung", nullable = false, length = 100)
    private String tenThuCung;

    @Column(name = "chung_loai", length = 50)
    private String chungLoai;

    @Column(name = "giong_loai", length = 100)
    private String giongLoai;

    @Column(name = "ngay_sinh")
    private LocalDate ngaySinh;

    @Column(name = "gioi_tinh", length = 10)
    private String gioiTinh;

    @Column(name = "ghi_chu_suc_khoe", columnDefinition = "TEXT")
    private String ghiChuSucKhoe;

    // --- Relationships ---

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private NguoiDung nguoiDung;

    @JsonIgnore
    @OneToMany(mappedBy = "thuCung")
    private List<LichHen> danhSachLichHen;
}