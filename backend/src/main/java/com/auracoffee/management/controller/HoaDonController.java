package com.auracoffee.management.controller;

import com.auracoffee.management.dto.HoaDonRequest;
import com.auracoffee.management.dto.HoaDonResponse;
import com.auracoffee.management.service.HoaDonService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity<List<HoaDonResponse>> getAll(
            @RequestParam(required = false) String phuongThucThanhToan,
            HttpServletRequest request
    ) {
        String vaiTro = (String) request.getAttribute("vaiTro");
        Integer maNhanVien = (Integer) request.getAttribute("maNhanVien");
        return ResponseEntity.ok(hoaDonService.getAll(phuongThucThanhToan, vaiTro, maNhanVien));
    }
}