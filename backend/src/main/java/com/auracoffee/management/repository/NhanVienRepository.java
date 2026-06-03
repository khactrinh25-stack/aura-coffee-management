package com.auracoffee.management.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.auracoffee.management.entity.NhanVien;

public interface NhanVienRepository extends JpaRepository<NhanVien, Integer> {

	Optional<NhanVien> findByTenDangNhap(String tenDangNhap);

	@Query("SELECT n FROM NhanVien n WHERE " +
			"(:search IS NULL OR LOWER(n.tenDangNhap) LIKE LOWER(CONCAT('%', :search, '%')) " +
			"OR LOWER(n.hoTen) LIKE LOWER(CONCAT('%', :search, '%')) " +
			"OR LOWER(n.soDienThoai) LIKE LOWER(CONCAT('%', :search, '%'))) " +
			"AND (:vaiTro IS NULL OR n.vaiTro = :vaiTro) " +
			"ORDER BY n.maNhanVien ASC")
	List<NhanVien> searchEmployees(@Param("search") String search, @Param("vaiTro") String vaiTro);
}
