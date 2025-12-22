package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DanhGiaRequest {
    private Integer userId;
    private Integer sanPhamId;
    private Integer dichVuId;
    private Integer soSao;
    private String noiDung;
    private String hinhAnh;
}
