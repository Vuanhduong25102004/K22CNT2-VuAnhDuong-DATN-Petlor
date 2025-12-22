package com.example.petlorshop.dto;

import com.example.petlorshop.models.TinNhan;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {
    // Dùng cho tạo phòng
    private Integer userId;
    private String tieuDe;

    // Dùng cho gửi tin nhắn
    private Integer phongChatId;
    private Integer nguoiGuiId;
    private TinNhan.LoaiNguoiGui loaiNguoiGui;
    private String noiDung;
}
