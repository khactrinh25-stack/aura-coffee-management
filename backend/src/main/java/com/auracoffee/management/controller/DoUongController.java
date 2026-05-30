package com.auracoffee.management.controller;

import com.auracoffee.management.dto.DoUongRequest;
import com.auracoffee.management.dto.DoUongResponse;
import com.auracoffee.management.service.DoUongService;
import org.springframework.http.HttpStatus;
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

@RestController
@RequestMapping("/api/do-uong")
public class DoUongController {

    private final DoUongService doUongService;

    public DoUongController(DoUongService doUongService) {
        this.doUongService = doUongService;
    }

    @GetMapping
    public ResponseEntity<List<DoUongResponse>> getAll(
            @RequestParam(required = false) String trangThai,
            @RequestParam(required = false) Integer maDanhMuc) {
        return ResponseEntity.ok(doUongService.getAll(trangThai, maDanhMuc));
    }

    @GetMapping("/{maDoUongCode}")
    public ResponseEntity<DoUongResponse> getByCode(@PathVariable String maDoUongCode) {
        return ResponseEntity.ok(doUongService.getByMaDoUongCode(maDoUongCode));
    }

    @PostMapping
    public ResponseEntity<DoUongResponse> create(@RequestBody DoUongRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(doUongService.create(request));
    }

    @PutMapping("/{maDoUongCode}")
    public ResponseEntity<DoUongResponse> update(
            @PathVariable String maDoUongCode,
            @RequestBody DoUongRequest request) {
        return ResponseEntity.ok(doUongService.update(maDoUongCode, request));
    }

    @DeleteMapping("/{maDoUongCode}")
    public ResponseEntity<Void> softDelete(@PathVariable String maDoUongCode) {
        doUongService.softDelete(maDoUongCode);
        return ResponseEntity.noContent().build();
    }
}