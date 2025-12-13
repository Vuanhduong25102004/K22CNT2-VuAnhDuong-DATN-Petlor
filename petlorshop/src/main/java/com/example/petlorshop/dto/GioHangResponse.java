package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GioHangResponse {
    private Integer gioHangId;
    private Integer userId;
    private List<CartItemResponse> items;
    private int tongSoLuong;
    private BigDecimal tongTien;
}
