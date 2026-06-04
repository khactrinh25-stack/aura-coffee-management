package com.auracoffee.management.repository;

import com.auracoffee.management.entity.DanhMuc;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DanhMucRepository extends JpaRepository<DanhMuc, Integer> {
    List<DanhMuc> findAllByOrderByMaDanhMucAsc();
}
