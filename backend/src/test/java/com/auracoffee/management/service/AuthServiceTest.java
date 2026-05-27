package com.auracoffee.management.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.auracoffee.management.dto.ChangePasswordRequest;
import com.auracoffee.management.dto.LoginRequest;
import com.auracoffee.management.entity.NhanVien;
import com.auracoffee.management.exception.UnauthorizedException;
import com.auracoffee.management.repository.NhanVienRepository;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

	@Mock
	private NhanVienRepository nhanVienRepository;

	@Mock
	private PasswordEncoder passwordEncoder;

	@InjectMocks
	private AuthService authService;

	@Test
	void loginSucceedsWithBcryptPassword() {
		NhanVien nhanVien = buildEmployee("admin", "$2a$10$hash", true);
		LoginRequest request = new LoginRequest();
		request.setTenDangNhap("admin");
		request.setMatKhau("123456");

		when(nhanVienRepository.findByTenDangNhap("admin")).thenReturn(Optional.of(nhanVien));
		when(passwordEncoder.matches("123456", "$2a$10$hash")).thenReturn(true);

		var response = authService.login(request);

		assertEquals("Admin", response.getVaiTro());
	}

	@Test
	void loginFailsWhenAccountIsLocked() {
		NhanVien nhanVien = buildEmployee("staff", "plain", false);
		LoginRequest request = new LoginRequest();
		request.setTenDangNhap("staff");
		request.setMatKhau("123456");

		when(nhanVienRepository.findByTenDangNhap("staff")).thenReturn(Optional.of(nhanVien));

		assertThrows(UnauthorizedException.class, () -> authService.login(request));
	}

	@Test
	void loginSupportsLegacyPlainPassword() {
		NhanVien nhanVien = buildEmployee("legacy", "123456", true);
		LoginRequest request = new LoginRequest();
		request.setTenDangNhap("legacy");
		request.setMatKhau("123456");

		when(nhanVienRepository.findByTenDangNhap("legacy")).thenReturn(Optional.of(nhanVien));

		var response = authService.login(request);

		assertEquals(1, response.getMaNhanVien());
	}

	@Test
	void changePasswordHashesNewPassword() {
		NhanVien nhanVien = buildEmployee("admin", "oldPass", true);
		ChangePasswordRequest request = new ChangePasswordRequest();
		request.setMaNhanVien(1);
		request.setMatKhauCu("oldPass");
		request.setMatKhauMoi("newPass1");
		request.setXacNhanMatKhauMoi("newPass1");

		when(nhanVienRepository.findById(1)).thenReturn(Optional.of(nhanVien));
		when(passwordEncoder.encode("newPass1")).thenReturn("$2a$10$newhash");

		var response = authService.changePassword(request);

		assertEquals("Đổi mật khẩu thành công", response.getMessage());
		verify(nhanVienRepository).save(any(NhanVien.class));
	}

	private NhanVien buildEmployee(String username, String password, boolean active) {
		NhanVien nhanVien = new NhanVien();
		nhanVien.setMaNhanVien(1);
		nhanVien.setTenDangNhap(username);
		nhanVien.setMatKhau(password);
		nhanVien.setHoTen("Nguyễn Văn A");
		nhanVien.setVaiTro("Admin");
		nhanVien.setTrangThai(active);
		return nhanVien;
	}
}
