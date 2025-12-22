package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SoTiemChungRequest {
    private String tenVacXin;
    private LocalDate ngayTiem;
    private LocalDate ngayTaiChung;
    private Integer nhanVienId;
    private Integer lichHenId; // Thêm trường này
    private String ghiChu;
}
