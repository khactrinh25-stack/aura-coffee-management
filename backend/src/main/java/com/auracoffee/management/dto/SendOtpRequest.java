package com.auracoffee.management.dto;

import jakarta.validation.constraints.NotNull;

public class SendOtpRequest {

    @NotNull(message = "Mã nhân viên không hợp lệ")
    private Integer maNhanVien;

    public Integer getMaNhanVien() {
        return maNhanVien;
    }

    public void setMaNhanVien(Integer maNhanVien) {
        this.maNhanVien = maNhanVien;
    }
}