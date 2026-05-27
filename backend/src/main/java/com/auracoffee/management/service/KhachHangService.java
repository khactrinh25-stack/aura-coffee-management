package com.auracoffee.management.service;

import com.auracoffee.management.dto.KhachHangRequest;
import com.auracoffee.management.entity.KhachHang;
import com.auracoffee.management.repository.KhachHangRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class KhachHangService {

    private final KhachHangRepository khachHangRepository;

    public KhachHangService(KhachHangRepository khachHangRepository) {
        this.khachHangRepository = khachHangRepository;
    }

    public Optional<KhachHang> findBySoDienThoai(String soDienThoai) {
        return khachHangRepository.findBySoDienThoai(soDienThoai);
    }

    public KhachHang create(KhachHangRequest request) {
        Optional<KhachHang> existing = khachHangRepository.findBySoDienThoai(request.getSoDienThoai().trim());
        if (existing.isPresent()) {
            throw new IllegalArgumentException("Số điện thoại đã tồn tại trong hệ thống");
        }

        KhachHang kh = new KhachHang();
        kh.setHoTen(request.getHoTen() != null ? request.getHoTen().trim() : null);
        kh.setSoDienThoai(request.getSoDienThoai().trim());
        kh.setDiemTichLuy(0);
        return khachHangRepository.save(kh);
    }
}