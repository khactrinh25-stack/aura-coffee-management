package com.auracoffee.management.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UpdateProfileRequest {

    @NotNull(message = "Mã nhân viên không hợp lệ")
    private Integer maNhanVien;

    @NotBlank(message = "Mật khẩu hiện tại không được để trống")
    private String matKhauCu;

    private String soDienThoai;

    private String matKhauMoi;

    private String xacNhanMatKhauMoi;

    public Integer getMaNhanVien() {
        return maNhanVien;
    }

    public void setMaNhanVien(Integer maNhanVien) {
        this.maNhanVien = maNhanVien;
    }

    public String getMatKhauCu() {
        return matKhauCu;
    }

    public void setMatKhauCu(String matKhauCu) {
        this.matKhauCu = matKhauCu;
    }

    public String getSoDienThoai() {
        return soDienThoai;
    }

    public void setSoDienThoai(String soDienThoai) {
        this.soDienThoai = soDienThoai;
    }

    public String getMatKhauMoi() {
        return matKhauMoi;
    }

    public void setMatKhauMoi(String matKhauMoi) {
        this.matKhauMoi = matKhauMoi;
    }

    public String getXacNhanMatKhauMoi() {
        return xacNhanMatKhauMoi;
    }

    public void setXacNhanMatKhauMoi(String xacNhanMatKhauMoi) {
        this.xacNhanMatKhauMoi = xacNhanMatKhauMoi;
    }
}