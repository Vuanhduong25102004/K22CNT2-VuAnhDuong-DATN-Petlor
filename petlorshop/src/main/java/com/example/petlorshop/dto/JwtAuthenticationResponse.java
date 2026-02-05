package com.example.petlorshop.dto;

import com.example.petlorshop.models.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtAuthenticationResponse {
    private String accessToken;
    private Integer userId;
    private String hoTen;
    private String email;
    private Role role;
    private Integer nhanVienId;
}
