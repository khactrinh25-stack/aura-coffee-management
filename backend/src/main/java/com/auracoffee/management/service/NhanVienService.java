package com.auracoffee.management.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auracoffee.management.dto.MessageResponse;
import com.auracoffee.management.dto.NhanVienRequest;
import com.auracoffee.management.dto.NhanVienResponse;
import com.auracoffee.management.dto.ResetPasswordRequest;
import com.auracoffee.management.entity.NhanVien;
import com.auracoffee.management.repository.NhanVienRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class NhanVienService {

    private final NhanVienRepository nhanVienRepository;
    private final PasswordEncoder passwordEncoder;

    public NhanVienService(NhanVienRepository nhanVienRepository, PasswordEncoder passwordEncoder) {
        this.nhanVienRepository = nhanVienRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<NhanVienResponse> getAll(String search, String vaiTro) {
        String searchParam = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        String vaiTroParam = (vaiTro != null && !vaiTro.trim().isEmpty()) ? vaiTro.trim() : null;
        List<NhanVien> list = nhanVienRepository.searchEmployees(searchParam, vaiTroParam);
        return list.stream().map(NhanVienResponse::from).collect(Collectors.toList());
    }

    public NhanVienResponse getById(Integer id) {
        NhanVien nv = nhanVienRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy nhân viên với mã " + id));
        return NhanVienResponse.from(nv);
    }

    public NhanVienResponse create(NhanVienRequest request) {
        // Check duplicate username
        if (nhanVienRepository.findByTenDangNhap(request.getTenDangNhap().trim()).isPresent()) {
            throw new IllegalArgumentException("Tên đăng nhập đã tồn tại trong hệ thống");
        }

        // Check duplicate phone number
        if (request.getSoDienThoai() != null && !request.getSoDienThoai().trim().isEmpty()) {
            if (nhanVienRepository.findBySoDienThoai(request.getSoDienThoai().trim()).isPresent()) {
                throw new IllegalArgumentException("Số điện thoại đã tồn tại trong hệ thống");
            }
        }

        NhanVien nv = new NhanVien();
        nv.setTenDangNhap(request.getTenDangNhap().trim());
        nv.setMatKhau(passwordEncoder.encode(request.getMatKhau()));
        nv.setHoTen(request.getHoTen());
        nv.setSoDienThoai(request.getSoDienThoai());
        nv.setVaiTro(request.getVaiTro() != null ? request.getVaiTro() : "NhanVien");
        nv.setTrangThai(true); // Default active

        nv = nhanVienRepository.save(nv);
        return NhanVienResponse.from(nv);
    }

    public NhanVienResponse update(Integer id, NhanVienRequest request) {
        NhanVien nv = nhanVienRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy nhân viên với mã " + id));

        // Check duplicate username if changed
        if (request.getTenDangNhap() != null && !request.getTenDangNhap().trim().equals(nv.getTenDangNhap())) {
            if (nhanVienRepository.findByTenDangNhap(request.getTenDangNhap().trim()).isPresent()) {
                throw new IllegalArgumentException("Tên đăng nhập đã tồn tại trong hệ thống");
            }
            nv.setTenDangNhap(request.getTenDangNhap().trim());
        }

        // Check duplicate phone number if changed
        if (request.getSoDienThoai() != null && !request.getSoDienThoai().trim().equals(nv.getSoDienThoai())) {
            if (!request.getSoDienThoai().trim().isEmpty()
                    && nhanVienRepository.findBySoDienThoai(request.getSoDienThoai().trim()).isPresent()) {
                throw new IllegalArgumentException("Số điện thoại đã tồn tại trong hệ thống");
            }
            nv.setSoDienThoai(request.getSoDienThoai().trim());
        }

        if (request.getHoTen() != null)
            nv.setHoTen(request.getHoTen());
        if (request.getVaiTro() != null)
            nv.setVaiTro(request.getVaiTro());

        nv = nhanVienRepository.save(nv);
        return NhanVienResponse.from(nv);
    }

    public MessageResponse resetPassword(ResetPasswordRequest request) {
        NhanVien nv = nhanVienRepository.findById(request.getMaNhanVien())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Không tìm thấy nhân viên với mã " + request.getMaNhanVien()));

        nv.setMatKhau(passwordEncoder.encode(request.getMatKhauMoi()));
        nhanVienRepository.save(nv);
        return new MessageResponse("Cấp lại mật khẩu thành công");
    }

    public MessageResponse toggleStatus(Integer id) {
        NhanVien nv = nhanVienRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy nhân viên với mã " + id));

        boolean newStatus = !Boolean.TRUE.equals(nv.getTrangThai());
        nv.setTrangThai(newStatus);
        nhanVienRepository.save(nv);

        String message = newStatus ? "Mở khóa tài khoản thành công" : "Khóa tài khoản thành công";
        return new MessageResponse(message);
    }
}