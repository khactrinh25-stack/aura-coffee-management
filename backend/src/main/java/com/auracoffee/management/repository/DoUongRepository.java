package com.auracoffee.management.repository;

import com.auracoffee.management.entity.DoUong;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DoUongRepository extends JpaRepository<DoUong, Integer> {

    List<DoUong> findByTrangThai(String trangThai);

    List<DoUong> findByTrangThaiAndMaDanhMuc(String trangThai, Integer maDanhMuc);
}