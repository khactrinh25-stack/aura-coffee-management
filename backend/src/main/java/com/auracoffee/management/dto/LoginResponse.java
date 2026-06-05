package com.auracoffee.management.dto;

import com.auracoffee.management.entity.NhanVien;

public class LoginResponse {

    private Integer maNhanVien;
    private String tenDangNhap;
    private String hoTen;
    private String soDienThoai;
    private String email;
    private String vaiTro;
    private Boolean trangThai;
    private String token;

    public static LoginResponse from(NhanVien entity) {
        LoginResponse dto = new LoginResponse();
        dto.setMaNhanVien(entity.getMaNhanVien());
        dto.setTenDangNhap(entity.getTenDangNhap());
        dto.setHoTen(entity.getHoTen());
        dto.setSoDienThoai(entity.getSoDienThoai());
        dto.setEmail(entity.getEmail());
        dto.setVaiTro(entity.getVaiTro());
        dto.setTrangThai(entity.getTrangThai());
        return dto;
    }

    public static LoginResponse from(NhanVien entity, String token) {
        LoginResponse dto = from(entity);
        dto.setToken(token);
        return dto;
    }

    public Integer getMaNhanVien() { return maNhanVien; }
    public void setMaNhanVien(Integer maNhanVien) { this.maNhanVien = maNhanVien; }
    public String getTenDangNhap() { return tenDangNhap; }
    public void setTenDangNhap(String tenDangNhap) { this.tenDangNhap = tenDangNhap; }
    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }
    public String getSoDienThoai() { return soDienThoai; }
    public void setSoDienThoai(String soDienThoai) { this.soDienThoai = soDienThoai; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getVaiTro() { return vaiTro; }
    public void setVaiTro(String vaiTro) { this.vaiTro = vaiTro; }
    public Boolean getTrangThai() { return trangThai; }
    public void setTrangThai(Boolean trangThai) { this.trangThai = trangThai; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}