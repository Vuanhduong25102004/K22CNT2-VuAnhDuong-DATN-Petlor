package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompleteAppointmentRequest {

    private String ghiChuBacSi;

    private boolean coTiemPhong; 
    private String tenVacXin;
    private LocalDate ngayTaiChung; 
    private String ghiChu;

    private boolean coKeDon;
    private String chanDoan;
    private String loiDan;
    private List<ThuocKeDonDto> danhSachThuoc;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ThuocKeDonDto {
        private Integer thuocId;
        private Integer soLuong;
        private String lieuDung;
    }
}
