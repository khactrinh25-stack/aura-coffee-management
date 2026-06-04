package com.auracoffee.management.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auracoffee.management.dto.ChangePasswordRequest;
import com.auracoffee.management.dto.LoginRequest;
import com.auracoffee.management.dto.LoginResponse;
import com.auracoffee.management.dto.MessageResponse;
import com.auracoffee.management.dto.UpdateProfileRequest;
import com.auracoffee.management.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
		return ResponseEntity.ok(authService.login(request));
	}

	@PutMapping("/update-profile")
	public ResponseEntity<?> updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
		try {
			return ResponseEntity.ok(authService.updateProfile(request));
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest()
					.body(new MessageResponse(e.getMessage()));
		}
	}

	@PutMapping("/change-password")
	public ResponseEntity<MessageResponse> changePassword(
			@Valid @RequestBody ChangePasswordRequest request) {
		return ResponseEntity.ok(authService.changePassword(request));
	}
}
