package com.auracoffee.management.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.auracoffee.management.dto.MessageResponse;
import com.auracoffee.management.dto.NhanVienRequest;
import com.auracoffee.management.dto.NhanVienResponse;
import com.auracoffee.management.dto.ResetPasswordRequest;
import com.auracoffee.management.service.NhanVienService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/nhan-vien")
public class NhanVienController {

    private final NhanVienService nhanVienService;

    public NhanVienController(NhanVienService nhanVienService) {
        this.nhanVienService = nhanVienService;
    }

    @GetMapping
    public ResponseEntity<List<NhanVienResponse>> getAll(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String vaiTro) {
        List<NhanVienResponse> list = nhanVienService.getAll(search, vaiTro);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NhanVienResponse> getById(@PathVariable Integer id) {
        try {
            NhanVienResponse res = nhanVienService.getById(id);
            return ResponseEntity.ok(res);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody NhanVienRequest request) {
        try {
            NhanVienResponse res = nhanVienService.create(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(res);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody NhanVienRequest request) {
        try {
            NhanVienResponse res = nhanVienService.update(id, request);
            return ResponseEntity.ok(res);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse(e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @PatchMapping("/{id}/reset-password")
    public ResponseEntity<?> resetPassword(@PathVariable Integer id, @RequestBody ResetPasswordRequest request) {
        request.setMaNhanVien(id);
        try {
            MessageResponse res = nhanVienService.resetPassword(request);
            return ResponseEntity.ok(res);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @PatchMapping("/{id}/toggle-status")
    public ResponseEntity<?> toggleStatus(@PathVariable Integer id) {
        try {
            MessageResponse res = nhanVienService.toggleStatus(id);
            return ResponseEntity.ok(res);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse(e.getMessage()));
        }
    }
}