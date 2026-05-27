package com.auracoffee.management.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auracoffee.management.config.JwtUtil;
import com.auracoffee.management.dto.ChangePasswordRequest;
import com.auracoffee.management.dto.LoginRequest;
import com.auracoffee.management.dto.LoginResponse;
import com.auracoffee.management.dto.MessageResponse;
import com.auracoffee.management.entity.NhanVien;
import com.auracoffee.management.exception.UnauthorizedException;
import com.auracoffee.management.repository.NhanVienRepository;

@Service
public class AuthService {

	private static final String LOGIN_FAILED_MESSAGE =
			"Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.";

	private final NhanVienRepository nhanVienRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;

	public AuthService(NhanVienRepository nhanVienRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
		this.nhanVienRepository = nhanVienRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil = jwtUtil;
	}

	public LoginResponse login(LoginRequest request) {
		String tenDangNhap = request.getTenDangNhap().trim();

		NhanVien nhanVien = nhanVienRepository.findByTenDangNhap(tenDangNhap)
				.orElseThrow(() -> new UnauthorizedException(LOGIN_FAILED_MESSAGE));

		if (isAccountLocked(nhanVien)) {
			throw new UnauthorizedException(
					"Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên.");
		}

		if (!matchesPassword(request.getMatKhau(), nhanVien.getMatKhau())) {
			throw new UnauthorizedException(LOGIN_FAILED_MESSAGE);
		}

		String token = jwtUtil.generateToken(
				nhanVien.getMaNhanVien(),
				nhanVien.getTenDangNhap(),
				nhanVien.getVaiTro());

		return LoginResponse.from(nhanVien, token);
	}

	public MessageResponse changePassword(ChangePasswordRequest request) {
		if (!request.getMatKhauMoi().equals(request.getXacNhanMatKhauMoi())) {
			throw new IllegalArgumentException("Mật khẩu xác nhận không khớp");
		}

		NhanVien nhanVien = nhanVienRepository.findById(request.getMaNhanVien())
				.orElseThrow(() -> new UnauthorizedException("Không tìm thấy tài khoản"));

		if (!matchesPassword(request.getMatKhauCu(), nhanVien.getMatKhau())) {
			throw new UnauthorizedException("Mật khẩu hiện tại không đúng");
		}

		nhanVien.setMatKhau(passwordEncoder.encode(request.getMatKhauMoi()));
		nhanVienRepository.save(nhanVien);

		return new MessageResponse("Đổi mật khẩu thành công");
	}

	private boolean isAccountLocked(NhanVien nhanVien) {
		return Boolean.FALSE.equals(nhanVien.getTrangThai());
	}

	private boolean matchesPassword(String rawPassword, String storedPassword) {
		if (storedPassword == null) {
			return false;
		}
		if (storedPassword.startsWith("$2a$") || storedPassword.startsWith("$2b$")) {
			return passwordEncoder.matches(rawPassword, storedPassword);
		}
		return rawPassword.equals(storedPassword);
	}
}
