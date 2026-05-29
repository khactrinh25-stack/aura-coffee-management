package com.auracoffee.management.repository;

import com.auracoffee.management.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HoaDonRepository extends JpaRepository<HoaDon, Integer> {
    List<HoaDon> findAllByOrderByNgayTaoDesc();
    List<HoaDon> findAllByPhuongThucThanhToanOrderByNgayTaoDesc(String phuongThucThanhToan);
}
