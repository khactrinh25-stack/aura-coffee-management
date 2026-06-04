package com.auracoffee.management.repository;

import com.auracoffee.management.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;

import com.auracoffee.management.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface HoaDonRepository extends JpaRepository<HoaDon, Integer> {
    List<HoaDon> findAllByOrderByNgayTaoDesc();
    List<HoaDon> findAllByPhuongThucThanhToanOrderByNgayTaoDesc(String phuongThucThanhToan);

    @Query("SELECT h FROM HoaDon h WHERE h.ngayTao >= :from AND h.ngayTao < :to ORDER BY h.ngayTao DESC")
    List<HoaDon> findAllByNgayTaoBetween(@Param("from") LocalDateTime from, @Param("to") LocalDateTime to);

    @Query("SELECT h FROM HoaDon h WHERE h.ngayTao >= :from AND h.ngayTao < :to AND h.phuongThucThanhToan = :phuongThucThanhToan ORDER BY h.ngayTao DESC")
    List<HoaDon> findAllByNgayTaoBetweenAndPhuongThucThanhToan(@Param("from") LocalDateTime from, @Param("to") LocalDateTime to, @Param("phuongThucThanhToan") String phuongThucThanhToan);
}
