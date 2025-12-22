package com.example.petlorshop.dto;

import com.example.petlorshop.models.ThongBao;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThongBaoResponse {
    private Integer thongBaoId;
    private String tieuDe;
    private String noiDung;
    private ThongBao.LoaiThongBao loaiThongBao;
    private String lienKet;
    private Boolean daDoc;
    private LocalDateTime ngayTao;
}
