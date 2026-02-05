package com.example.petlorshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GlobalSearchResult {
    private List<SearchResultItem> sanPhams = new ArrayList<>();
    private List<SearchResultItem> dichVus = new ArrayList<>();
    private List<SearchResultItem> baiViets = new ArrayList<>();
    private List<SearchResultItem> nguoiDungs = new ArrayList<>();
    private List<SearchResultItem> donHangs = new ArrayList<>();
    private List<SearchResultItem> lichHens = new ArrayList<>();

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SearchResultItem {
        private String type;
        private Integer id;
        private String title;
        private String description;
        private String link;
    }
}
