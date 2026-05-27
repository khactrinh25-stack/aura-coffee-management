package com.auracoffee.management.controller;

import com.auracoffee.management.dto.DoUongResponse;
import com.auracoffee.management.service.DoUongService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
}