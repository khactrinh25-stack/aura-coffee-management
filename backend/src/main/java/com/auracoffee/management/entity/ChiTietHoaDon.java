package com.auracoffee.management.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "CHI_TIET_HOA_DON")
public class ChiTietHoaDon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_chi_tiet")
    private Integer maChiTiet;

    @Column(name = "ma_hoa_don")
    private Integer maHoaDon;

    @Column(name = "ma_do_uong")
    private Integer maDoUong;

    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "don_gia")
    private Integer donGia;

    @Column(name = "thanh_tien")
    private Integer thanhTien;

    @Column(name = "ghi_chu_thuoc_tinh")
    private String ghiChuThuocTinh;

    public Integer getMaChiTiet() {
        return maChiTiet;
    }

    public void setMaChiTiet(Integer maChiTiet) {
        this.maChiTiet = maChiTiet;
    }

    public Integer getMaHoaDon() {
        return maHoaDon;
    }

    public void setMaHoaDon(Integer maHoaDon) {
        this.maHoaDon = maHoaDon;
    }

    public Integer getMaDoUong() {
        return maDoUong;
    }

    public void setMaDoUong(Integer maDoUong) {
        this.maDoUong = maDoUong;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public Integer getDonGia() {
        return donGia;
    }

    public void setDonGia(Integer donGia) {
        this.donGia = donGia;
    }

    public Integer getThanhTien() {
        return thanhTien;
    }

    public void setThanhTien(Integer thanhTien) {
        this.thanhTien = thanhTien;
    }

    public String getGhiChuThuocTinh() {
        return ghiChuThuocTinh;
    }

    public void setGhiChuThuocTinh(String ghiChuThuocTinh) {
        this.ghiChuThuocTinh = ghiChuThuocTinh;
    }
}