package com.auracoffee.management.service;

import com.auracoffee.management.dto.KhachHangRequest;
import com.auracoffee.management.entity.KhachHang;
import com.auracoffee.management.repository.KhachHangRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class KhachHangService {

    private final KhachHangRepository khachHangRepository;

    public KhachHangService(KhachHangRepository khachHangRepository) {
        this.khachHangRepository = khachHangRepository;
    }

    public List<KhachHang> findAll() {
        return khachHangRepository.findByDaXoaFalse();
    }

    public Optional<KhachHang> findBySoDienThoai(String soDienThoai) {
        return khachHangRepository.findBySoDienThoaiAndDaXoaFalse(soDienThoai);
    }

    public KhachHang create(KhachHangRequest request) {
        Optional<KhachHang> existing = khachHangRepository.findBySoDienThoaiAndDaXoaFalse(request.getSoDienThoai().trim());
        if (existing.isPresent()) {
            throw new IllegalArgumentException("Số điện thoại đã tồn tại trong hệ thống");
        }

        KhachHang kh = new KhachHang();
        kh.setHoTen(request.getHoTen() != null ? request.getHoTen().trim() : null);
        kh.setSoDienThoai(request.getSoDienThoai().trim());
        kh.setDiemTichLuy(0);
        return khachHangRepository.save(kh);
    }

    public KhachHang update(Integer maKhachHang, KhachHangRequest request) {
        KhachHang kh = khachHangRepository.findById(maKhachHang)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy khách hàng"));

        // Check phone number uniqueness (exclude current customer)
        Optional<KhachHang> existing = khachHangRepository.findBySoDienThoaiAndDaXoaFalse(request.getSoDienThoai().trim());
        if (existing.isPresent() && !existing.get().getMaKhachHang().equals(maKhachHang)) {
            throw new IllegalArgumentException("Số điện thoại đã tồn tại trong hệ thống");
        }

        kh.setHoTen(request.getHoTen() != null ? request.getHoTen().trim() : null);
        kh.setSoDienThoai(request.getSoDienThoai().trim());
        if (request.getDiemTichLuy() != null) {
            kh.setDiemTichLuy(request.getDiemTichLuy());
        }
        return khachHangRepository.save(kh);
    }

    public void softDelete(Integer maKhachHang) {
        KhachHang kh = khachHangRepository.findById(maKhachHang)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy khách hàng"));
        kh.setDaXoa(true);
        khachHangRepository.save(kh);
    }
}
