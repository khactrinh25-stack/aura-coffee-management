package com.auracoffee.management.dto;

import com.auracoffee.management.entity.ChiTietHoaDon;

public class ChiTietHoaDonResponse {

    private Integer maChiTiet;
    private Integer maHoaDon;
    private Integer maDoUong;
    private String tenDoUong;
    private Integer soLuong;
    private Integer donGia;
    private Integer thanhTien;
    private String ghiChuThuocTinh;

    public static ChiTietHoaDonResponse from(ChiTietHoaDon entity, String tenDoUong) {
        ChiTietHoaDonResponse dto = new ChiTietHoaDonResponse();
        dto.setMaChiTiet(entity.getMaChiTiet());
        dto.setMaHoaDon(entity.getMaHoaDon());
        dto.setMaDoUong(entity.getMaDoUong());
        dto.setTenDoUong(tenDoUong);
        dto.setSoLuong(entity.getSoLuong());
        dto.setDonGia(entity.getDonGia());
        dto.setThanhTien(entity.getThanhTien());
        dto.setGhiChuThuocTinh(entity.getGhiChuThuocTinh());
        return dto;
    }

    public Integer getMaChiTiet() { return maChiTiet; }
    public void setMaChiTiet(Integer maChiTiet) { this.maChiTiet = maChiTiet; }
    public Integer getMaHoaDon() { return maHoaDon; }
    public void setMaHoaDon(Integer maHoaDon) { this.maHoaDon = maHoaDon; }
    public Integer getMaDoUong() { return maDoUong; }
    public void setMaDoUong(Integer maDoUong) { this.maDoUong = maDoUong; }
    public String getTenDoUong() { return tenDoUong; }
    public void setTenDoUong(String tenDoUong) { this.tenDoUong = tenDoUong; }
    public Integer getSoLuong() { return soLuong; }
    public void setSoLuong(Integer soLuong) { this.soLuong = soLuong; }
    public Integer getDonGia() { return donGia; }
    public void setDonGia(Integer donGia) { this.donGia = donGia; }
    public Integer getThanhTien() { return thanhTien; }
    public void setThanhTien(Integer thanhTien) { this.thanhTien = thanhTien; }
    public String getGhiChuThuocTinh() { return ghiChuThuocTinh; }
    public void setGhiChuThuocTinh(String ghiChuThuocTinh) { this.ghiChuThuocTinh = ghiChuThuocTinh; }
}