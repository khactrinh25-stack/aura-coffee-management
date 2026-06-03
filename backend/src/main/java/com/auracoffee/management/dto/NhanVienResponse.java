package com.auracoffee.management.dto;

import com.auracoffee.management.entity.NhanVien;

public class NhanVienResponse {

    private Integer maNhanVien;
    private String tenDangNhap;
    private String hoTen;
    private String soDienThoai;
    private String vaiTro;
    private Boolean trangThai;
    private String tenDangNhapCode;

    public static NhanVienResponse from(NhanVien nv) {
        NhanVienResponse res = new NhanVienResponse();
        res.setMaNhanVien(nv.getMaNhanVien());
        res.setTenDangNhap(nv.getTenDangNhap());
        res.setHoTen(nv.getHoTen());
        res.setSoDienThoai(nv.getSoDienThoai());
        res.setVaiTro(nv.getVaiTro());
        res.setTrangThai(nv.getTrangThai());
        // Generate a code like NV-001 from maNhanVien
        res.setTenDangNhapCode(nv.getTenDangNhap());
        return res;
    }

    public Integer getMaNhanVien() {
        return maNhanVien;
    }

    public void setMaNhanVien(Integer maNhanVien) {
        this.maNhanVien = maNhanVien;
    }

    public String getTenDangNhap() {
        return tenDangNhap;
    }

    public void setTenDangNhap(String tenDangNhap) {
        this.tenDangNhap = tenDangNhap;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public String getSoDienThoai() {
        return soDienThoai;
    }

    public void setSoDienThoai(String soDienThoai) {
        this.soDienThoai = soDienThoai;
    }

    public String getVaiTro() {
        return vaiTro;
    }

    public void setVaiTro(String vaiTro) {
        this.vaiTro = vaiTro;
    }

    public Boolean getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(Boolean trangThai) {
        this.trangThai = trangThai;
    }

    public String getTenDangNhapCode() {
        return tenDangNhapCode;
    }

    public void setTenDangNhapCode(String tenDangNhapCode) {
        this.tenDangNhapCode = tenDangNhapCode;
    }
}