package com.auracoffee.management.service;

import com.auracoffee.management.dto.DoUongRequest;
import com.auracoffee.management.dto.DoUongResponse;
import com.auracoffee.management.entity.DanhMuc;
import com.auracoffee.management.entity.DoUong;
import com.auracoffee.management.repository.DanhMucRepository;
import com.auracoffee.management.repository.DoUongRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DoUongService {

    private final DoUongRepository doUongRepository;
    private final DanhMucRepository danhMucRepository;

    public DoUongService(DoUongRepository doUongRepository, DanhMucRepository danhMucRepository) {
        this.doUongRepository = doUongRepository;
        this.danhMucRepository = danhMucRepository;
    }

    public List<DoUongResponse> getAll(String trangThai, Integer maDanhMuc) {
        List<DoUong> entities;

        if (trangThai != null && maDanhMuc != null) {
            entities = doUongRepository.findByTrangThaiAndMaDanhMuc(trangThai, maDanhMuc);
        } else if (trangThai != null) {
            entities = doUongRepository.findByTrangThai(trangThai);
        } else if (maDanhMuc != null) {
            entities = doUongRepository.findAll().stream()
                    .filter(d -> maDanhMuc.equals(d.getMaDanhMuc()))
                    .collect(Collectors.toList());
        } else {
            entities = doUongRepository.findAll();
        }

        Map<Integer, String> danhMucMap = danhMucRepository.findAll().stream()
                .collect(Collectors.toMap(DanhMuc::getMaDanhMuc, DanhMuc::getTenDanhMuc));

        return entities.stream()
                .map(d -> DoUongResponse.from(d, danhMucMap.get(d.getMaDanhMuc())))
                .collect(Collectors.toList());
    }

    public DoUongResponse getByMaDoUongCode(String maDoUongCode) {
        DoUong entity = doUongRepository.findByMaDoUongCode(maDoUongCode)
                .orElseThrow(() -> new RuntimeException("Beverage not found: " + maDoUongCode));
        String tenDanhMuc = danhMucRepository.findById(entity.getMaDanhMuc())
                .map(DanhMuc::getTenDanhMuc)
                .orElse(null);
        return DoUongResponse.from(entity, tenDanhMuc);
    }

    public DoUongResponse create(DoUongRequest request) {
        // Check duplicate code
        if (doUongRepository.existsByMaDoUongCode(request.getMaDoUongCode())) {
            throw new RuntimeException("Mã đồ uống đã tồn tại trong hệ thống");
        }
        // Check duplicate name
        if (doUongRepository.existsByTenDoUong(request.getTenDoUong())) {
            throw new RuntimeException("Tên đồ uống đã tồn tại trong hệ thống");
        }
        // Validate selling price is a positive integer
        if (request.getGiaBan() == null || request.getGiaBan() <= 0) {
            throw new RuntimeException("Giá bán phải là số nguyên dương");
        }

        DoUong entity = new DoUong();
        entity.setMaDoUongCode(request.getMaDoUongCode());
        entity.setTenDoUong(request.getTenDoUong());
        entity.setGiaBan(request.getGiaBan());
        entity.setMaDanhMuc(request.getMaDanhMuc());
        entity.setTrangThai(request.getTrangThai() != null ? request.getTrangThai() : "CON_HANG");

        DoUong saved = doUongRepository.save(entity);
        String tenDanhMuc = danhMucRepository.findById(saved.getMaDanhMuc())
                .map(DanhMuc::getTenDanhMuc)
                .orElse(null);
        return DoUongResponse.from(saved, tenDanhMuc);
    }

    public DoUongResponse update(String maDoUongCode, DoUongRequest request) {
        DoUong entity = doUongRepository.findByMaDoUongCode(maDoUongCode)
                .orElseThrow(() -> new RuntimeException("Beverage not found: " + maDoUongCode));

        // Check duplicate name (exclude current entity)
        if (!entity.getTenDoUong().equals(request.getTenDoUong())
                && doUongRepository.existsByTenDoUong(request.getTenDoUong())) {
            throw new RuntimeException("Tên đồ uống đã tồn tại trong hệ thống");
        }
        // Validate selling price
        if (request.getGiaBan() == null || request.getGiaBan() <= 0) {
            throw new RuntimeException("Giá bán phải là số nguyên dương");
        }

        entity.setTenDoUong(request.getTenDoUong());
        entity.setGiaBan(request.getGiaBan());
        entity.setMaDanhMuc(request.getMaDanhMuc());
        if (request.getTrangThai() != null) {
            entity.setTrangThai(request.getTrangThai());
        }

        DoUong saved = doUongRepository.save(entity);
        String tenDanhMuc = danhMucRepository.findById(saved.getMaDanhMuc())
                .map(DanhMuc::getTenDanhMuc)
                .orElse(null);
        return DoUongResponse.from(saved, tenDanhMuc);
    }

    public void softDelete(String maDoUongCode) {
        DoUong entity = doUongRepository.findByMaDoUongCode(maDoUongCode)
                .orElseThrow(() -> new RuntimeException("Beverage not found: " + maDoUongCode));
        entity.setTrangThai("NGUNG_KINH_DOANH");
        doUongRepository.save(entity);
    }
}