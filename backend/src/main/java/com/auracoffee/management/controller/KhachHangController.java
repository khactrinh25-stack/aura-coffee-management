package com.auracoffee.management.controller;

import com.auracoffee.management.dto.KhachHangRequest;
import com.auracoffee.management.entity.KhachHang;
import com.auracoffee.management.service.KhachHangService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/khach-hang")
public class KhachHangController {

    private final KhachHangService khachHangService;

    public KhachHangController(KhachHangService khachHangService) {
        this.khachHangService = khachHangService;
    }

    @GetMapping
    public ResponseEntity<?> findBySoDienThoai(
            @RequestParam(name = "soDienThoai", required = false) String soDienThoai) {
        if (soDienThoai == null || soDienThoai.isBlank()) {
            List<KhachHang> all = khachHangService.findAll();
            return ResponseEntity.ok(all);
        }
        Optional<KhachHang> result = khachHangService.findBySoDienThoai(soDienThoai);
        return result.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.ok().build());
    }

    @PostMapping
    public ResponseEntity<KhachHang> create(@Valid @RequestBody KhachHangRequest request) {
        return ResponseEntity.ok(khachHangService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<KhachHang> update(
            @PathVariable("id") Integer id,
            @Valid @RequestBody KhachHangRequest request) {
        return ResponseEntity.ok(khachHangService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
        khachHangService.softDelete(id);
        return ResponseEntity.noContent().build();
    }
}
