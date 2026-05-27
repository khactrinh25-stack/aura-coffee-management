package com.auracoffee.management.repository;

import com.auracoffee.management.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {

    Optional<KhachHang> findBySoDienThoai(String soDienThoai);
}