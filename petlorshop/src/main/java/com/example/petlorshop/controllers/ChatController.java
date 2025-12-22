package com.example.petlorshop.controllers;

import com.example.petlorshop.dto.ChatRequest;
import com.example.petlorshop.dto.PhongChatResponse;
import com.example.petlorshop.dto.TinNhanResponse;
import com.example.petlorshop.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/phong")
    public ResponseEntity<PhongChatResponse> createPhongChat(@RequestBody ChatRequest request) {
        return ResponseEntity.ok(chatService.createPhongChat(request));
    }

    @GetMapping("/phong/{phongChatId}/tin-nhan")
    public ResponseEntity<List<TinNhanResponse>> getTinNhan(@PathVariable Integer phongChatId) {
        return ResponseEntity.ok(chatService.getTinNhanByPhong(phongChatId));
    }

    @PostMapping("/tin-nhan")
    public ResponseEntity<TinNhanResponse> guiTinNhan(@RequestBody ChatRequest request) {
        return ResponseEntity.ok(chatService.guiTinNhan(request));
    }
}
