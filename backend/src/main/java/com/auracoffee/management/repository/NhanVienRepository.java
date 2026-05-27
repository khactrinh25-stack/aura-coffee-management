package com.auracoffee.management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.auracoffee.management.entity.NhanVien;

public interface NhanVienRepository extends JpaRepository<NhanVien, Integer> {

	Optional<NhanVien> findByTenDangNhap(String tenDangNhap);
}
