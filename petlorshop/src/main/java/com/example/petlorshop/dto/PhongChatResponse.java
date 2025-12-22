package com.example.petlorshop.dto;

import com.example.petlorshop.models.PhongChat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhongChatResponse {
    private Integer phongChatId;
    private String tenKhachHang;
    private String tenNhanVien;
    private String tieuDe;
    private PhongChat.TrangThaiPhongChat trangThai;
    private LocalDateTime ngayTao;
}
