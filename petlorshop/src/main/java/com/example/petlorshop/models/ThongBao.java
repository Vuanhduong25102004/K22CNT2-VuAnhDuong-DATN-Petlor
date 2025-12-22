package com.example.petlorshop.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "thong_bao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThongBao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "thong_bao_id")
    private Integer thongBaoId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private NguoiDung nguoiDung;

    @Column(name = "tieu_de", nullable = false)
    private String tieuDe;

    @Column(name = "noi_dung", nullable = false, columnDefinition = "TEXT")
    private String noiDung;

    @Enumerated(EnumType.STRING)
    @Column(name = "loai_thong_bao", nullable = false)
    private LoaiThongBao loaiThongBao;

    @Column(name = "lien_ket")
    private String lienKet;

    @Column(name = "da_doc")
    private Boolean daDoc = false;

    @CreationTimestamp
    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;

    public enum LoaiThongBao {
        DON_HANG, LICH_HEN, KHUYEN_MAI, HE_THONG
    }
}
