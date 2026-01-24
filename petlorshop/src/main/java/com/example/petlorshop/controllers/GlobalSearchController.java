package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.GlobalSearchDto;
import com.example.petlorshop.services.GlobalSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GlobalSearchController {

    @Autowired
    private GlobalSearchService globalSearchService;

    @GetMapping("/search")
    public ResponseEntity<GlobalSearchDto> search(@RequestParam String keyword) {
        GlobalSearchDto results = globalSearchService.search(keyword);
        return ResponseEntity.ok(results);
    }
}
