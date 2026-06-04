package com.auracoffee.management.controller;

import com.auracoffee.management.dto.HoaDonRequest;
import com.auracoffee.management.dto.HoaDonResponse;
import com.auracoffee.management.dto.RevenueReportItem;
import com.auracoffee.management.service.HoaDonService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
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
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            HttpServletRequest request
    ) {
        String vaiTro = (String) request.getAttribute("vaiTro");
        Integer maNhanVien = (Integer) request.getAttribute("maNhanVien");

        LocalDate start = null;
        LocalDate end = null;
        if (startDate != null && endDate != null) {
            try {
                start = LocalDate.parse(startDate);
                end = LocalDate.parse(endDate);
            } catch (DateTimeParseException ex) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid start date or end date");
            }
            if (start.isAfter(end)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start date must be before or equal to end date");
            }
        }

        return ResponseEntity.ok(hoaDonService.getAll(phuongThucThanhToan, vaiTro, maNhanVien, start, end));
    }

    @GetMapping("/report")
    public ResponseEntity<List<RevenueReportItem>> getRevenueReport(
            @RequestParam String startDate,
            @RequestParam String endDate,
            HttpServletRequest request
    ) {
        try {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);
            return ResponseEntity.ok(hoaDonService.getRevenueReport(start, end));
        } catch (DateTimeParseException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid start date or end date");
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }
}