package com.example.petlorshop.dto;

import com.example.petlorshop.models.TinNhan;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TinNhanResponse {
    private Integer tinNhanId;
    private Integer nguoiGuiId;
    private TinNhan.LoaiNguoiGui loaiNguoiGui;
    private String noiDung;
    private LocalDateTime thoiGian;
    private Boolean daXem;
}
