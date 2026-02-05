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
public class SoTiemChungResponse {
    private Integer tiemChungId;
    private Integer thuCungId;
    private String tenThuCung;
    private String tenVacXin;
    private LocalDate ngayTiem;
    private LocalDate ngayTaiChung;
    private Integer nhanVienId;
    private String tenBacSi;
    private Integer lichHenId;
    private String ghiChu;
}
