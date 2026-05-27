package com.auracoffee.management.service;

import com.auracoffee.management.dto.ChiTietHoaDonRequest;
import com.auracoffee.management.dto.ChiTietHoaDonResponse;
import com.auracoffee.management.dto.HoaDonRequest;
import com.auracoffee.management.dto.HoaDonResponse;
import com.auracoffee.management.entity.ChiTietHoaDon;
import com.auracoffee.management.entity.HoaDon;
import com.auracoffee.management.entity.KhachHang;
import com.auracoffee.management.entity.NhanVien;
import com.auracoffee.management.entity.DoUong;
import com.auracoffee.management.repository.ChiTietHoaDonRepository;
import com.auracoffee.management.repository.HoaDonRepository;
import com.auracoffee.management.repository.KhachHangRepository;
import com.auracoffee.management.repository.NhanVienRepository;
import com.auracoffee.management.repository.DoUongRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class HoaDonService {

    private final HoaDonRepository hoaDonRepository;
    private final ChiTietHoaDonRepository chiTietHoaDonRepository;
    private final NhanVienRepository nhanVienRepository;
    private final KhachHangRepository khachHangRepository;
    private final DoUongRepository doUongRepository;

    public HoaDonService(HoaDonRepository hoaDonRepository,
                         ChiTietHoaDonRepository chiTietHoaDonRepository,
                         NhanVienRepository nhanVienRepository,
                         KhachHangRepository khachHangRepository,
                         DoUongRepository doUongRepository) {
        this.hoaDonRepository = hoaDonRepository;
        this.chiTietHoaDonRepository = chiTietHoaDonRepository;
        this.nhanVienRepository = nhanVienRepository;
        this.khachHangRepository = khachHangRepository;
        this.doUongRepository = doUongRepository;
    }

    @Transactional
    public HoaDonResponse create(HoaDonRequest request) {
        HoaDon hoaDon = new HoaDon();
        hoaDon.setNgayTao(LocalDateTime.now());
        hoaDon.setTongTien(request.getTongTien());
        hoaDon.setPhuongThucThanhToan(request.getPhuongThucThanhToan());
        hoaDon.setMaNhanVien(request.getMaNhanVien());
        hoaDon.setMaKhachHang(request.getMaKhachHang());
        hoaDon.setDiemSuDung(request.getDiemSuDung() != null ? request.getDiemSuDung() : 0);
        hoaDon.setDiemCongThem(request.getDiemCongThem() != null ? request.getDiemCongThem() : 0);
        HoaDon savedHoaDon = hoaDonRepository.save(hoaDon);

        for (ChiTietHoaDonRequest ctRequest : request.getChiTietList()) {
            ChiTietHoaDon ct = new ChiTietHoaDon();
            ct.setMaHoaDon(savedHoaDon.getMaHoaDon());
            ct.setMaDoUong(ctRequest.getMaDoUong());
            ct.setSoLuong(ctRequest.getSoLuong());
            ct.setDonGia(ctRequest.getDonGia());
            ct.setThanhTien(ctRequest.getThanhTien());
            ct.setGhiChuThuocTinh(ctRequest.getGhiChuThuocTinh());
            chiTietHoaDonRepository.save(ct);
        }

        updateCustomerPoints(request);

        String tenNhanVien = nhanVienRepository.findById(request.getMaNhanVien())
                .map(NhanVien::getHoTen).orElse(null);

        List<ChiTietHoaDon> savedChiTietList = chiTietHoaDonRepository.findByMaHoaDon(savedHoaDon.getMaHoaDon());
        Map<Integer, String> doUongMap = doUongRepository.findAll().stream()
                .collect(Collectors.toMap(DoUong::getMaDoUong, DoUong::getTenDoUong));

        List<ChiTietHoaDonResponse> chiTietResponses = savedChiTietList.stream()
                .map(ct -> ChiTietHoaDonResponse.from(ct, doUongMap.get(ct.getMaDoUong())))
                .collect(Collectors.toList());

        return HoaDonResponse.from(savedHoaDon, tenNhanVien, chiTietResponses);
    }

    private void updateCustomerPoints(HoaDonRequest request) {
        if (request.getMaKhachHang() == null) return;
        KhachHang kh = khachHangRepository.findById(request.getMaKhachHang()).orElse(null);
        if (kh == null) return;

        int diemHienTai = kh.getDiemTichLuy() != null ? kh.getDiemTichLuy() : 0;
        int diemMoi = diemHienTai;

        if (request.getDiemSuDung() != null && request.getDiemSuDung() > 0) {
            diemMoi = Math.max(0, diemMoi - request.getDiemSuDung());
        }
        if (request.getDiemCongThem() != null && request.getDiemCongThem() > 0) {
            diemMoi += request.getDiemCongThem();
        }
        if (diemMoi != diemHienTai) {
            kh.setDiemTichLuy(diemMoi);
            khachHangRepository.save(kh);
        }
    }

    public List<HoaDonResponse> getAll() {
        List<HoaDon> hoaDons = hoaDonRepository.findAll();
        Map<Integer, String> nhanVienMap = nhanVienRepository.findAll().stream()
                .collect(Collectors.toMap(NhanVien::getMaNhanVien, NhanVien::getHoTen));
        Map<Integer, String> doUongMap = doUongRepository.findAll().stream()
                .collect(Collectors.toMap(DoUong::getMaDoUong, DoUong::getTenDoUong));

        return hoaDons.stream().map(hd -> {
            List<ChiTietHoaDon> chiTietList = chiTietHoaDonRepository.findByMaHoaDon(hd.getMaHoaDon());
            List<ChiTietHoaDonResponse> chiTietResponses = chiTietList.stream()
                    .map(ct -> ChiTietHoaDonResponse.from(ct, doUongMap.get(ct.getMaDoUong())))
                    .collect(Collectors.toList());
            return HoaDonResponse.from(hd, nhanVienMap.get(hd.getMaNhanVien()), chiTietResponses);
        }).collect(Collectors.toList());
    }
}
