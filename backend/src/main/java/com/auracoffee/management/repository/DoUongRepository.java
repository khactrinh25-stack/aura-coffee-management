package com.auracoffee.management.repository;

import com.auracoffee.management.entity.DoUong;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface DoUongRepository extends JpaRepository<DoUong, Integer> {

    List<DoUong> findAllByOrderByMaDoUongAsc();

    List<DoUong> findByTrangThai(String trangThai);

    List<DoUong> findByTrangThaiAndMaDanhMuc(String trangThai, Integer maDanhMuc);

    Optional<DoUong> findByMaDoUongCode(String maDoUongCode);

    boolean existsByMaDoUongCode(String maDoUongCode);

    boolean existsByTenDoUong(String tenDoUong);

    int countByMaDoUongCodeIsNull();

    List<DoUong> findByMaDoUongCodeIsNull();
}
