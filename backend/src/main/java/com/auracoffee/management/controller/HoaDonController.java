package com.auracoffee.management.controller;

import com.auracoffee.management.dto.HoaDonRequest;
import com.auracoffee.management.dto.HoaDonResponse;
import com.auracoffee.management.service.HoaDonService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/hoa-don")
public class HoaDonController {

    private final HoaDonService hoaDonService;

    public HoaDonController(HoaDonService hoaDonService) {
        this.hoaDonService = hoaDonService;
    }

    @PostMapping
    public ResponseEntity<HoaDonResponse> create(@Valid @RequestBody HoaDonRequest request) {
        return ResponseEntity.ok(hoaDonService.create(request));
    }

    @GetMapping
    public ResponseEntity<List<HoaDonResponse>> getAll() {
        return ResponseEntity.ok(hoaDonService.getAll());
    }
}