package com.example.petlorshop.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TrangThaiLichHen {
    PENDING("CHỜ XÁC NHẬN"),
    CONFIRMED("ĐÃ XÁC NHẬN"),
    COMPLETED("ĐÃ HOÀN THÀNH"),
    CANCELLED("ĐÃ HỦY");

    private final String displayName;

    TrangThaiLichHen(String displayName) {
        this.displayName = displayName;
    }

    // @JsonValue: Khi trả về JSON (GET API), sẽ trả về chuỗi tiếng Việt này
    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    // @JsonCreator: Khi nhận JSON (POST/PUT API), sẽ tìm Enum dựa trên chuỗi tiếng Việt
    @JsonCreator
    public static TrangThaiLichHen fromValue(String value) {
        if (value == null) return null;
        
        for (TrangThaiLichHen status : values()) {
            // So sánh với tên tiếng Việt (CHỜ XÁC NHẬN) hoặc tên tiếng Anh (PENDING) đều được
            if (status.displayName.equalsIgnoreCase(value) || status.name().equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Trạng thái không hợp lệ: " + value + ". Các trạng thái cho phép: CHỜ XÁC NHẬN, ĐÃ XÁC NHẬN, ĐÃ HOÀN THÀNH, ĐÃ HỦY");
    }
}
