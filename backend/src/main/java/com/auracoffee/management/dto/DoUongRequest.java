package com.auracoffee.management.dto;

public class DoUongRequest {

    private String maDoUongCode;
    private String tenDoUong;
    private Integer giaBan;
    private Integer maDanhMuc;
    private String trangThai;

    public String getMaDoUongCode() {
        return maDoUongCode;
    }

    public void setMaDoUongCode(String maDoUongCode) {
        this.maDoUongCode = maDoUongCode;
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