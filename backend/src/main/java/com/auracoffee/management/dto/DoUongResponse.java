package com.auracoffee.management.dto;

import com.auracoffee.management.entity.DoUong;

public class DoUongResponse {

    private Integer maDoUong;
    private String tenDoUong;
    private Integer giaBan;
    private Integer maDanhMuc;
    private String tenDanhMuc;
    private String trangThai;

    public static DoUongResponse from(DoUong entity, String tenDanhMuc) {
        DoUongResponse dto = new DoUongResponse();
        dto.setMaDoUong(entity.getMaDoUong());
        dto.setTenDoUong(entity.getTenDoUong());
        dto.setGiaBan(entity.getGiaBan());
        dto.setMaDanhMuc(entity.getMaDanhMuc());
        dto.setTenDanhMuc(tenDanhMuc);
        dto.setTrangThai(entity.getTrangThai());
        return dto;
    }

    public Integer getMaDoUong() { return maDoUong; }
    public void setMaDoUong(Integer maDoUong) { this.maDoUong = maDoUong; }
    public String getTenDoUong() { return tenDoUong; }
    public void setTenDoUong(String tenDoUong) { this.tenDoUong = tenDoUong; }
    public Integer getGiaBan() { return giaBan; }
    public void setGiaBan(Integer giaBan) { this.giaBan = giaBan; }
    public Integer getMaDanhMuc() { return maDanhMuc; }
    public void setMaDanhMuc(Integer maDanhMuc) { this.maDanhMuc = maDanhMuc; }
    public String getTenDanhMuc() { return tenDanhMuc; }
    public void setTenDanhMuc(String tenDanhMuc) { this.tenDanhMuc = tenDanhMuc; }
    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }
}