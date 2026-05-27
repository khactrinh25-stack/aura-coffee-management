package com.auracoffee.management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "DO_UONG")
public class DoUong {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_do_uong")
    private Integer maDoUong;

    @Column(name = "ten_do_uong", nullable = false)
    private String tenDoUong;

    @Column(name = "gia_ban", nullable = false)
    private Integer giaBan;

    @Column(name = "ma_danh_muc")
    private Integer maDanhMuc;

    @Column(name = "trang_thai")
    private String trangThai;

    public Integer getMaDoUong() {
        return maDoUong;
    }

    public void setMaDoUong(Integer maDoUong) {
        this.maDoUong = maDoUong;
    }

    public String getTenDoUong() {
        return tenDoUong;
    }

    public void setTenDoUong(String tenDoUong) {
        this.tenDoUong = tenDoUong;
    }

    public Integer getGiaBan() {
        return giaBan;
    }

    public void setGiaBan(Integer giaBan) {
        this.giaBan = giaBan;
    }

    public Integer getMaDanhMuc() {
        return maDanhMuc;
    }

    public void setMaDanhMuc(Integer maDanhMuc) {
        this.maDanhMuc = maDanhMuc;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }
}