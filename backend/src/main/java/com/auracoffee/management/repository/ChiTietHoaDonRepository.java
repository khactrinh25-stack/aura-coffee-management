package com.auracoffee.management.repository;

import com.auracoffee.management.entity.ChiTietHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChiTietHoaDonRepository extends JpaRepository<ChiTietHoaDon, Integer> {

    List<ChiTietHoaDon> findByMaHoaDon(Integer maHoaDon);
}