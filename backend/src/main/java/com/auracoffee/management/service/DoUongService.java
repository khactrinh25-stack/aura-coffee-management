package com.auracoffee.management.service;

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
}