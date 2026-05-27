package com.auracoffee.management.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ChangePasswordRequest {

	@NotNull(message = "Mã nhân viên không hợp lệ")
	private Integer maNhanVien;

	@NotBlank(message = "Mật khẩu hiện tại không được để trống")
	private String matKhauCu;

	@NotBlank(message = "Mật khẩu mới không được để trống")
	@Size(min = 6, message = "Mật khẩu mới phải có ít nhất 6 ký tự")
	private String matKhauMoi;

	@NotBlank(message = "Xác nhận mật khẩu không được để trống")
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
