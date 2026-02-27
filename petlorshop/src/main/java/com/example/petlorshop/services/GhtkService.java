package com.example.petlorshop.services;

import com.example.petlorshop.models.CuaHang;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.math.BigDecimal;

@Service
public class GhtkService {

    private static final String GHTK_FEE_URL = "https://services.giaohangtietkiem.vn/services/shipment/fee";

    @Autowired
    private CuaHangService cuaHangService;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public BigDecimal calculateShippingFee(String province, String district, String ward, String address, Integer weight, Integer value) {
        try {
            CuaHang shopInfo = cuaHangService.getThongTinCuaHang();
            String token = shopInfo.getGhtkToken();

            // Lấy từ DB nhưng nếu null thì fallback
            String pickProvince = shopInfo.getTinhThanh() != null ? shopInfo.getTinhThanh() : "Hà Nội";
            String pickDistrict = shopInfo.getQuanHuyen() != null ? shopInfo.getQuanHuyen() : "Quận Cầu Giấy";

            if (token == null || token.isEmpty()) {
                System.err.println("GHTK Token chưa được cấu hình!");
                return BigDecimal.valueOf(30000);
            }

            token = token.trim();

            HttpHeaders headers = new HttpHeaders();
            headers.set("Token", token);

            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(GHTK_FEE_URL)
                    .queryParam("pick_province", pickProvince)
                    .queryParam("pick_district", pickDistrict)
                    .queryParam("province", province)
                    .queryParam("district", district)
                    .queryParam("weight", weight != null ? weight : 500)
                    .queryParam("value", value != null ? value : 0);

            if (ward != null && !ward.isEmpty()) {
                builder.queryParam("ward", ward);
            }
            if (address != null && !address.isEmpty()) {
                builder.queryParam("address", address);
            }

            HttpEntity<?> entity = new HttpEntity<>(headers);

            System.out.println("GHTK Request URL: " + builder.toUriString());

            ResponseEntity<String> response = restTemplate.exchange(
                    builder.toUriString(),
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            System.out.println("GHTK Response Body: " + response.getBody());

            if (response.getStatusCode().is2xxSuccessful()) {
                JsonNode root = objectMapper.readTree(response.getBody());
                if (root.path("success").asBoolean()) {
                    int fee = root.path("fee").path("fee").asInt();
                    return BigDecimal.valueOf(fee);
                } else {
                    System.err.println("GHTK Error Message: " + root.path("message").asText());
                }
            } else {
                System.err.println("GHTK HTTP Error: " + response.getStatusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return BigDecimal.valueOf(30000);
    }
}
