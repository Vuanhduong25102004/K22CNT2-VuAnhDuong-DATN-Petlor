package com.example.petlorshop.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddToCartRequest {
    @NotNull(message = "User ID không được để trống")
    private Integer userId;

    @NotNull(message = "Product ID không được để trống")
    private Integer sanPhamId;

    @Min(value = 1, message = "Số lượng phải lớn hơn hoặc bằng 1")
    private int soLuong = 1;
}
