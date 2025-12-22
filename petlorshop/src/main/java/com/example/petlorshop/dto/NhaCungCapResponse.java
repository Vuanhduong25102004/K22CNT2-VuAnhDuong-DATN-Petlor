package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NhaCungCapResponse {
    private Integer nccId;
    private String tenNcc;
    private String soDienThoai;
    private String email;
    private String diaChi;
}
