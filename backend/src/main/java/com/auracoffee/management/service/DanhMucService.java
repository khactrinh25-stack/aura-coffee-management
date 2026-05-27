package com.auracoffee.management.service;

import com.auracoffee.management.entity.DanhMuc;
import com.auracoffee.management.repository.DanhMucRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DanhMucService {

    private final DanhMucRepository danhMucRepository;

    public DanhMucService(DanhMucRepository danhMucRepository) {
        this.danhMucRepository = danhMucRepository;
    }

    public List<DanhMuc> getAll() {
        return danhMucRepository.findAll();
    }
}