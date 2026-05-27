package com.auracoffee.management.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class ChiTietHoaDonRequest {

    @NotNull(message = "Mã đồ uống không được để trống")
    private Integer maDoUong;

    @Min(value = 1, message = "Số lượng phải >= 1")
    private Integer soLuong;

    @Min(value = 0, message = "Đơn giá không hợp lệ")
    private Integer donGia;

    @Min(value = 0, message = "Thành tiền không hợp lệ")
    private Integer thanhTien;

    private String ghiChuThuocTinh;

    public Integer getMaDoUong() { return maDoUong; }
    public void setMaDoUong(Integer maDoUong) { this.maDoUong = maDoUong; }
    public Integer getSoLuong() { return soLuong; }
    public void setSoLuong(Integer soLuong) { this.soLuong = soLuong; }
    public Integer getDonGia() { return donGia; }
    public void setDonGia(Integer donGia) { this.donGia = donGia; }
    public Integer getThanhTien() { return thanhTien; }
    public void setThanhTien(Integer thanhTien) { this.thanhTien = thanhTien; }
    public String getGhiChuThuocTinh() { return ghiChuThuocTinh; }
    public void setGhiChuThuocTinh(String ghiChuThuocTinh) { this.ghiChuThuocTinh = ghiChuThuocTinh; }
}