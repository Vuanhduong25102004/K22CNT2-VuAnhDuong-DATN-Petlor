package com.example.petlorshop.dto;

import com.example.petlorshop.models.ThongBao;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThongBaoRequest {
    private Integer userId;
    private String tieuDe;
    private String noiDung;
    private ThongBao.LoaiThongBao loaiThongBao;
    private String lienKet;
}
