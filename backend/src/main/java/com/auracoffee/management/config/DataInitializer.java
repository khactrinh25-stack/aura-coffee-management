package com.auracoffee.management.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.auracoffee.management.entity.ChiTietHoaDon;
import com.auracoffee.management.entity.DanhMuc;
import com.auracoffee.management.entity.DoUong;
import com.auracoffee.management.entity.HoaDon;
import com.auracoffee.management.entity.KhachHang;
import com.auracoffee.management.entity.NhanVien;
import com.auracoffee.management.repository.ChiTietHoaDonRepository;
import com.auracoffee.management.repository.DanhMucRepository;
import com.auracoffee.management.repository.DoUongRepository;
import com.auracoffee.management.repository.HoaDonRepository;
import com.auracoffee.management.repository.KhachHangRepository;
import com.auracoffee.management.repository.NhanVienRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Component
public class DataInitializer implements CommandLineRunner {

    private final NhanVienRepository nhanVienRepository;
    private final DanhMucRepository danhMucRepository;
    private final DoUongRepository doUongRepository;
    private final KhachHangRepository khachHangRepository;
    private final HoaDonRepository hoaDonRepository;
    private final ChiTietHoaDonRepository chiTietHoaDonRepository;
    private final PasswordEncoder passwordEncoder;
    private final Random random = new Random();

    public DataInitializer(NhanVienRepository nhanVienRepository,
                           DanhMucRepository danhMucRepository,
                           DoUongRepository doUongRepository,
                           KhachHangRepository khachHangRepository,
                           HoaDonRepository hoaDonRepository,
                           ChiTietHoaDonRepository chiTietHoaDonRepository,
                           PasswordEncoder passwordEncoder) {
        this.nhanVienRepository = nhanVienRepository;
        this.danhMucRepository = danhMucRepository;
        this.doUongRepository = doUongRepository;
        this.khachHangRepository = khachHangRepository;
        this.hoaDonRepository = hoaDonRepository;
        this.chiTietHoaDonRepository = chiTietHoaDonRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        System.out.println("=== DATA INITIALIZER: Checking and seeding data ===");

        // ============================================================
        // 1. Seed NHAN_VIEN (4 nhân viên) - only if empty
        // ============================================================
        if (nhanVienRepository.count() == 0) {
            System.out.println("  - NHAN_VIEN: seeding...");

            NhanVien admin = new NhanVien();
            admin.setTenDangNhap("admin");
            admin.setMatKhau(passwordEncoder.encode("123456"));
            admin.setHoTen("Admin Aura Coffee");
            admin.setSoDienThoai("0900000001");
            admin.setVaiTro("Admin");
            admin.setTrangThai(true);
            nhanVienRepository.save(admin);

            NhanVien nv1 = new NhanVien();
            nv1.setTenDangNhap("nv01");
            nv1.setMatKhau(passwordEncoder.encode("123456"));
            nv1.setHoTen("Nguyễn Văn An");
            nv1.setSoDienThoai("0900000002");
            nv1.setVaiTro("NhanVien");
            nv1.setTrangThai(true);
            nhanVienRepository.save(nv1);

            NhanVien nv2 = new NhanVien();
            nv2.setTenDangNhap("nv02");
            nv2.setMatKhau(passwordEncoder.encode("123456"));
            nv2.setHoTen("Trần Thị Bích");
            nv2.setSoDienThoai("0900000003");
            nv2.setVaiTro("NhanVien");
            nv2.setTrangThai(true);
            nhanVienRepository.save(nv2);

            NhanVien nv3 = new NhanVien();
            nv3.setTenDangNhap("nv03");
            nv3.setMatKhau(passwordEncoder.encode("123456"));
            nv3.setHoTen("Lê Hoàng Nam");
            nv3.setSoDienThoai("0900000004");
            nv3.setVaiTro("NhanVien");
            nv3.setTrangThai(true);
            nhanVienRepository.save(nv3);
        } else {
            System.out.println("  - NHAN_VIEN: already exists, skipping");
        }

        // ============================================================
        // 2. Seed DANH_MUC (5 danh mục)
        // ============================================================
        DanhMuc dm1, dm2, dm3, dm4, dm5;

        if (danhMucRepository.count() == 0) {
            System.out.println("  - DANH_MUC: seeding...");

            dm1 = new DanhMuc();
            dm1.setTenDanhMuc("Cà phê");
            danhMucRepository.save(dm1);

            dm2 = new DanhMuc();
            dm2.setTenDanhMuc("Trà sữa");
            danhMucRepository.save(dm2);

            dm3 = new DanhMuc();
            dm3.setTenDanhMuc("Sinh tố");
            danhMucRepository.save(dm3);

            dm4 = new DanhMuc();
            dm4.setTenDanhMuc("Đá xay");
            danhMucRepository.save(dm4);

            dm5 = new DanhMuc();
            dm5.setTenDanhMuc("Cacao & Socola");
            danhMucRepository.save(dm5);
        } else {
            System.out.println("  - DANH_MUC: already exists, skipping");
            // Fetch existing categories for reference
            var allDanhMuc = danhMucRepository.findAll();
            dm1 = allDanhMuc.get(0);
            dm2 = allDanhMuc.get(1);
            dm3 = allDanhMuc.get(2);
            dm4 = allDanhMuc.get(3);
            dm5 = allDanhMuc.get(4);
        }

        // ============================================================
        // 3. Seed DO_UONG (25 đồ uống)
        // ============================================================
        // Fix existing DO_UONG records that have null maDoUongCode
        int nullCodeCount = doUongRepository.countByMaDoUongCodeIsNull();
        if (nullCodeCount > 0) {
            System.out.println("  - DO_UONG: fixing " + nullCodeCount + " records with null maDoUongCode...");
            for (var du : doUongRepository.findByMaDoUongCodeIsNull()) {
                String prefix;
                int maDanhMuc = du.getMaDanhMuc();
                if (maDanhMuc == 1 || maDanhMuc == 13) prefix = "CF";
                else if (maDanhMuc == 2 || maDanhMuc == 14) prefix = "TS";
                else if (maDanhMuc == 3 || maDanhMuc == 15 || maDanhMuc == 16) prefix = "ST";
                else if (maDanhMuc == 4 || maDanhMuc == 17) prefix = "DX";
                else prefix = "CS";
                String code = prefix + String.format("%03d", du.getMaDoUong() % 100);
                du.setMaDoUongCode(code);
                doUongRepository.save(du);
            }
            System.out.println("  - DO_UONG: fixed all null maDoUongCode");
        }

        if (doUongRepository.count() == 0) {
            System.out.println("  - DO_UONG: seeding...");

            // --- Cà phê (maDanhMuc = dm1) ---
            saveDoUong("CF001", "Cà phê đen",          25000, dm1.getMaDanhMuc(), "CON_HANG");
            saveDoUong("CF002", "Cà phê sữa đá",       29000, dm1.getMaDanhMuc(), "CON_HANG");
            saveDoUong("CF003", "Bạc xỉu",             35000, dm1.getMaDanhMuc(), "CON_HANG");
            saveDoUong("CF004", "Cà phê espresso",     30000, dm1.getMaDanhMuc(), "CON_HANG");
            saveDoUong("CF005", "Cà phê latte",        39000, dm1.getMaDanhMuc(), "CON_HANG");

            // --- Trà sữa (maDanhMuc = dm2) ---
            saveDoUong("TS001", "Trà sữa trân châu",   50000, dm2.getMaDanhMuc(), "CON_HANG");
            saveDoUong("TS002", "Trà sữa matcha",      55000, dm2.getMaDanhMuc(), "CON_HANG");
            saveDoUong("TS003", "Trà sữa khoai môn",   52000, dm2.getMaDanhMuc(), "CON_HANG");
            saveDoUong("TS004", "Trà sữa thái xanh",   48000, dm2.getMaDanhMuc(), "CON_HANG");
            saveDoUong("TS005", "Trà đào cam sả",      45000, dm2.getMaDanhMuc(), "CON_HANG");

            // --- Sinh tố (maDanhMuc = dm3) ---
            saveDoUong("ST001", "Sinh tố bơ",          45000, dm3.getMaDanhMuc(), "CON_HANG");
            saveDoUong("ST002", "Sinh tố xoài",        40000, dm3.getMaDanhMuc(), "CON_HANG");
            saveDoUong("ST003", "Sinh tố dâu tây",     42000, dm3.getMaDanhMuc(), "CON_HANG");
            saveDoUong("ST004", "Sinh tố mãng cầu",    45000, dm3.getMaDanhMuc(), "CON_HANG");
            saveDoUong("ST005", "Sinh tố cam",         35000, dm3.getMaDanhMuc(), "CON_HANG");
            saveDoUong("ST006", "Sinh tố táo",         35000, dm3.getMaDanhMuc(), "CON_HANG");
            saveDoUong("ST007", "Sinh tố dưa hấu",     35000, dm3.getMaDanhMuc(), "CON_HANG");
            saveDoUong("ST008", "Sinh tố cà rốt",      38000, dm3.getMaDanhMuc(), "CON_HANG");
            saveDoUong("ST009", "Sinh tố ổi",          38000, dm3.getMaDanhMuc(), "CON_HANG");

            // --- Đá xay (maDanhMuc = dm4) ---
            saveDoUong("DX001", "Cà phê đá xay",       49000, dm4.getMaDanhMuc(), "CON_HANG");
            saveDoUong("DX002", "Cookies & Cream",      55000, dm4.getMaDanhMuc(), "CON_HANG");
            saveDoUong("DX003", "Matcha đá xay",       52000, dm4.getMaDanhMuc(), "CON_HANG");

            // --- Cacao & Socola (maDanhMuc = dm5) ---
            saveDoUong("CS001", "Cacao nóng",          35000, dm5.getMaDanhMuc(), "CON_HANG");
            saveDoUong("CS002", "Socola đá xay",       45000, dm5.getMaDanhMuc(), "CON_HANG");
            saveDoUong("CS003", "Socola latte",        42000, dm5.getMaDanhMuc(), "CON_HANG");
        } else {
            System.out.println("  - DO_UONG: already exists, skipping");
        }

        // ============================================================
        // 4. Seed KHACH_HANG (10 khách hàng) - only if empty
        // ============================================================
        if (khachHangRepository.count() == 0) {
            System.out.println("  - KHACH_HANG: seeding...");

            saveKhachHang("Trần Văn Bình",    "0912345678", 120);
            saveKhachHang("Phạm Thị Cúc",     "0912345679", 250);
            saveKhachHang("Hoàng Minh Đức",   "0912345680", 0);
            saveKhachHang("Ngô Thị Hoa",      "0912345681", 75);
            saveKhachHang("Đỗ Văn Hùng",      "0912345682", 30);
            saveKhachHang("Vũ Thị Lan",       "0912345683", 180);
            saveKhachHang("Bùi Quốc Tuấn",    "0912345684", 5);
            saveKhachHang("Dương Thị Mai",    "0912345685", 90);
            saveKhachHang("Lý Văn Tài",       "0912345686", 0);
            saveKhachHang("Mai Thị Thu",      "0912345687", 200);
        } else {
            System.out.println("  - KHACH_HANG: already exists, skipping");
        }

        // ============================================================
        // 5. Seed HOA_DON + CHI_TIET_HOA_DON (10 hóa đơn mẫu) - only if empty
        // ============================================================
        if (hoaDonRepository.count() == 0) {
            System.out.println("  - HOA_DON + CHI_TIET_HOA_DON: seeding...");

            // Get reference data
            List<NhanVien> nhanViens = nhanVienRepository.findAll();
            List<KhachHang> khachHangs = khachHangRepository.findAll();
            List<DoUong> doUongs = doUongRepository.findAll();

            // Filter only employees (maNhanVien >= 2, since id=1 is admin)
            // In our seed: admin=1, nv01=2, nv02=3, nv03=4
            NhanVien nv01 = nhanViens.stream().filter(nv -> nv.getTenDangNhap().equals("nv01")).findFirst().orElse(null);
            NhanVien nv02 = nhanViens.stream().filter(nv -> nv.getTenDangNhap().equals("nv02")).findFirst().orElse(null);
            NhanVien nv03 = nhanViens.stream().filter(nv -> nv.getTenDangNhap().equals("nv03")).findFirst().orElse(null);

            if (nv01 == null || nv02 == null || nv03 == null) {
                System.out.println("  - WARNING: Could not find employee references, skipping invoice seed");
                return;
            }

            // Invoice 1: nv01 - Cash - Walk-in customer (no KhachHang)
            HoaDon hd1 = createHoaDon(LocalDateTime.now().minusDays(5).withHour(8).withMinute(30), 155000, "TienMat", nv01.getMaNhanVien(), null, 0, 155);
            createChiTietHoaDon(hd1.getMaHoaDon(), findDoUongByCode(doUongs, "CF002"), 2, 29000, 58000, null);          // 2x Cà phê sữa đá
            createChiTietHoaDon(hd1.getMaHoaDon(), findDoUongByCode(doUongs, "TS001"), 1, 50000, 50000, "Size L"); // 1x Trà sữa trân châu size L
            createChiTietHoaDon(hd1.getMaHoaDon(), findDoUongByCode(doUongs, "CF003"), 1, 35000, 35000, null);          // Thêm size
            createChiTietHoaDon(hd1.getMaHoaDon(), findDoUongByCode(doUongs, "DX002"), 1, 55000, 55000, null);
            System.out.println("    - Invoice #1: " + hd1.getMaHoaDon() + " - nv01 - 155,000 VND - TienMat");

            // Invoice 2: nv01 - Cash - Customer Trần Văn Bình
            HoaDon hd2 = createHoaDon(LocalDateTime.now().minusDays(4).withHour(10).withMinute(15), 120000, "TienMat", nv01.getMaNhanVien(), khachHangs.get(0).getMaKhachHang(), 20, 100);
            createChiTietHoaDon(hd2.getMaHoaDon(), findDoUongByCode(doUongs, "CF004"), 2, 30000, 60000, null);          // 2x Espresso
            createChiTietHoaDon(hd2.getMaHoaDon(), findDoUongByCode(doUongs, "ST001"), 1, 45000, 45000, "Size L"); // 1x Sinh tố bơ size L
            createChiTietHoaDon(hd2.getMaHoaDon(), findDoUongByCode(doUongs, "CS003"), 1, 42000, 42000, null);
            createChiTietHoaDon(hd2.getMaHoaDon(), findDoUongByCode(doUongs, "DX001"), 1, 49000, 49000, null);
            System.out.println("    - Invoice #2: " + hd2.getMaHoaDon() + " - nv01 - 120,000 VND (after 20pts used) - TienMat");

            // Invoice 3: nv02 - Transfer - Customer Phạm Thị Cúc
            HoaDon hd3 = createHoaDon(LocalDateTime.now().minusDays(3).withHour(14).withMinute(0), 250000, "ChuyenKhoan", nv02.getMaNhanVien(), khachHangs.get(1).getMaKhachHang(), 50, 200);
            createChiTietHoaDon(hd3.getMaHoaDon(), findDoUongByCode(doUongs, "TS002"), 2, 55000, 110000, "Size L"); // 2x Trà sữa matcha size L
            createChiTietHoaDon(hd3.getMaHoaDon(), findDoUongByCode(doUongs, "TS003"), 1, 52000, 52000, null);          // 1x Trà sữa khoai môn
            createChiTietHoaDon(hd3.getMaHoaDon(), findDoUongByCode(doUongs, "DX002"), 1, 55000, 55000, null);          // 1x Cookies & Cream
            createChiTietHoaDon(hd3.getMaHoaDon(), findDoUongByCode(doUongs, "CS002"), 1, 45000, 45000, null);
            System.out.println("    - Invoice #3: " + hd3.getMaHoaDon() + " - nv02 - 250,000 VND (after 50pts used) - ChuyenKhoan");

            // Invoice 4: nv02 - Cash - Walk-in customer
            HoaDon hd4 = createHoaDon(LocalDateTime.now().minusDays(2).withHour(7).withMinute(45), 84000, "TienMat", nv02.getMaNhanVien(), null, 0, 84);
            createChiTietHoaDon(hd4.getMaHoaDon(), findDoUongByCode(doUongs, "CF001"), 2, 25000, 50000, null);          // 2x Cà phê đen
            createChiTietHoaDon(hd4.getMaHoaDon(), findDoUongByCode(doUongs, "CF003"), 1, 35000, 35000, "Size L"); // 1x Bạc xỉu size L
            System.out.println("    - Invoice #4: " + hd4.getMaHoaDon() + " - nv02 - 84,000 VND - TienMat");

            // Invoice 5: nv03 - Transfer - Customer Hoàng Minh Đức
            HoaDon hd5 = createHoaDon(LocalDateTime.now().minusDays(1).withHour(11).withMinute(30), 400000, "ChuyenKhoan", nv03.getMaNhanVien(), khachHangs.get(2).getMaKhachHang(), 0, 400);
            createChiTietHoaDon(hd5.getMaHoaDon(), findDoUongByCode(doUongs, "TS005"), 3, 45000, 135000, null);         // 3x Trà đào cam sả
            createChiTietHoaDon(hd5.getMaHoaDon(), findDoUongByCode(doUongs, "ST003"), 2, 42000, 84000, "Size L"); // 2x Sinh tố dâu tây size L
            createChiTietHoaDon(hd5.getMaHoaDon(), findDoUongByCode(doUongs, "DX003"), 2, 52000, 104000, null);         // 2x Matcha đá xay
            createChiTietHoaDon(hd5.getMaHoaDon(), findDoUongByCode(doUongs, "CS001"), 1, 35000, 35000, null);
            createChiTietHoaDon(hd5.getMaHoaDon(), findDoUongByCode(doUongs, "CF005"), 1, 39000, 39000, null);
            System.out.println("    - Invoice #5: " + hd5.getMaHoaDon() + " - nv03 - 400,000 VND - ChuyenKhoan");

            // Invoice 6: nv01 - Cash - Customer Ngô Thị Hoa (sử dụng điểm)
            HoaDon hd6 = createHoaDon(LocalDateTime.now().minusHours(20).withHour(9).withMinute(0), 180000, "TienMat", nv01.getMaNhanVien(), khachHangs.get(3).getMaKhachHang(), 30, 150);
            createChiTietHoaDon(hd6.getMaHoaDon(), findDoUongByCode(doUongs, "ST004"), 2, 45000, 90000, null);          // 2x Sinh tố mãng cầu
            createChiTietHoaDon(hd6.getMaHoaDon(), findDoUongByCode(doUongs, "ST002"), 1, 40000, 40000, "Size L"); // 1x Sinh tố xoài size L
            createChiTietHoaDon(hd6.getMaHoaDon(), findDoUongByCode(doUongs, "CF005"), 1, 39000, 39000, null);
            createChiTietHoaDon(hd6.getMaHoaDon(), findDoUongByCode(doUongs, "CS002"), 1, 45000, 45000, null);
            System.out.println("    - Invoice #6: " + hd6.getMaHoaDon() + " - nv01 - 180,000 VND (after 30pts used) - TienMat");

            // Invoice 7: nv02 - Cash - Walk-in (khách vãng lai)
            HoaDon hd7 = createHoaDon(LocalDateTime.now().minusHours(15).withHour(15).withMinute(20), 130000, "TienMat", nv02.getMaNhanVien(), null, 0, 130);
            createChiTietHoaDon(hd7.getMaHoaDon(), findDoUongByCode(doUongs, "ST007"), 2, 35000, 70000, null);          // 2x Sinh tố dưa hấu
            createChiTietHoaDon(hd7.getMaHoaDon(), findDoUongByCode(doUongs, "ST009"), 1, 38000, 38000, "Size L"); // 1x Sinh tố ổi size L
            createChiTietHoaDon(hd7.getMaHoaDon(), findDoUongByCode(doUongs, "ST005"), 1, 35000, 35000, null);
            System.out.println("    - Invoice #7: " + hd7.getMaHoaDon() + " - nv02 - 130,000 VND - TienMat");

            // Invoice 8: nv03 - Transfer - Customer Đỗ Văn Hùng
            HoaDon hd8 = createHoaDon(LocalDateTime.now().minusHours(10).withHour(10).withMinute(45), 320000, "ChuyenKhoan", nv03.getMaNhanVien(), khachHangs.get(4).getMaKhachHang(), 10, 310);
            createChiTietHoaDon(hd8.getMaHoaDon(), findDoUongByCode(doUongs, "TS004"), 2, 48000, 96000, null);          // 2x Trà sữa thái xanh
            createChiTietHoaDon(hd8.getMaHoaDon(), findDoUongByCode(doUongs, "TS002"), 1, 55000, 55000, "Size L"); // 1x Trà sữa matcha size L
            createChiTietHoaDon(hd8.getMaHoaDon(), findDoUongByCode(doUongs, "DX001"), 2, 49000, 98000, null);         // 2x Cà phê đá xay
            createChiTietHoaDon(hd8.getMaHoaDon(), findDoUongByCode(doUongs, "ST008"), 1, 38000, 38000, null);
            createChiTietHoaDon(hd8.getMaHoaDon(), findDoUongByCode(doUongs, "CS003"), 1, 42000, 42000, null);
            System.out.println("    - Invoice #8: " + hd8.getMaHoaDon() + " - nv03 - 320,000 VND (after 10pts used) - ChuyenKhoan");

            // Invoice 9: nv01 - Cash - Customer Vũ Thị Lan (sử dụng nhiều điểm)
            HoaDon hd9 = createHoaDon(LocalDateTime.now().minusHours(5).withHour(8).withMinute(0), 560000, "TienMat", nv01.getMaNhanVien(), khachHangs.get(5).getMaKhachHang(), 100, 460);
            createChiTietHoaDon(hd9.getMaHoaDon(), findDoUongByCode(doUongs, "ST006"), 3, 35000, 105000, null);         // 3x Sinh tố táo
            createChiTietHoaDon(hd9.getMaHoaDon(), findDoUongByCode(doUongs, "ST009"), 2, 38000, 76000, null);         // 2x Sinh tố ổi
            createChiTietHoaDon(hd9.getMaHoaDon(), findDoUongByCode(doUongs, "DX003"), 2, 52000, 104000, "Size L"); // 2x Matcha đá xay size L
            createChiTietHoaDon(hd9.getMaHoaDon(), findDoUongByCode(doUongs, "CS002"), 2, 45000, 90000, null);         // 2x Socola đá xay
            createChiTietHoaDon(hd9.getMaHoaDon(), findDoUongByCode(doUongs, "CF002"), 2, 29000, 58000, null);
            createChiTietHoaDon(hd9.getMaHoaDon(), findDoUongByCode(doUongs, "TS001"), 1, 50000, 50000, null);
            System.out.println("    - Invoice #9: " + hd9.getMaHoaDon() + " - nv01 - 560,000 VND (after 100pts used) - TienMat");

            // Invoice 10: nv03 - Cash - Walk-in customer (khách vãng lai, gần đây nhất)
            HoaDon hd10 = createHoaDon(LocalDateTime.now().minusHours(1).withMinute(random.nextInt(60)), 380000, "TienMat", nv03.getMaNhanVien(), null, 0, 380);
            createChiTietHoaDon(hd10.getMaHoaDon(), findDoUongByCode(doUongs, "CF005"), 3, 39000, 117000, null);        // 3x Latte
            createChiTietHoaDon(hd10.getMaHoaDon(), findDoUongByCode(doUongs, "DX002"), 2, 55000, 110000, "Size L"); // 2x Cookies & Cream size L
            createChiTietHoaDon(hd10.getMaHoaDon(), findDoUongByCode(doUongs, "CS001"), 2, 35000, 70000, null);        // 2x Cacao nóng
            createChiTietHoaDon(hd10.getMaHoaDon(), findDoUongByCode(doUongs, "ST003"), 1, 42000, 42000, null);
            createChiTietHoaDon(hd10.getMaHoaDon(), findDoUongByCode(doUongs, "ST001"), 1, 45000, 45000, "Size L");
            System.out.println("    - Invoice #10: " + hd10.getMaHoaDon() + " - nv03 - 380,000 VND - TienMat");

            System.out.println("  - HOA_DON: seeded 10 invoices successfully");
            System.out.println("  - CHI_TIET_HOA_DON: seeded details for all 10 invoices");
        } else {
            System.out.println("  - HOA_DON: already exists, skipping");
        }

        System.out.println("=== DATA INITIALIZER: Seed completed ===");
        System.out.println("  - 4 nhân viên (admin / nv01 / nv02 / nv03, all password: 123456)");
        System.out.println("  - 5 danh mục (Cà phê / Trà sữa / Sinh tố / Đá xay / Cacao & Socola)");
        System.out.println("  - 25 đồ uống");
        System.out.println("  - 10 khách hàng mẫu");
        System.out.println("  - 10 hóa đơn mẫu (with details) spanning 5 days");
    }

    // ============================================================
    // Helper methods
    // ============================================================

    private void saveDoUong(String maCode, String ten, int gia, int maDanhMuc, String trangThai) {
        DoUong du = new DoUong();
        du.setMaDoUongCode(maCode);
        du.setTenDoUong(ten);
        du.setGiaBan(gia);
        du.setMaDanhMuc(maDanhMuc);
        du.setTrangThai(trangThai);
        doUongRepository.save(du);
    }

    private void saveKhachHang(String hoTen, String sdt, int diem) {
        KhachHang kh = new KhachHang();
        kh.setHoTen(hoTen);
        kh.setSoDienThoai(sdt);
        kh.setDiemTichLuy(diem);
        khachHangRepository.save(kh);
    }

    private HoaDon createHoaDon(LocalDateTime ngayTao, int tongTien, String phuongThucThanhToan,
                                 int maNhanVien, Integer maKhachHang, int diemSuDung, int diemCongThem) {
        HoaDon hd = new HoaDon();
        hd.setNgayTao(ngayTao);
        hd.setTongTien(tongTien);
        hd.setPhuongThucThanhToan(phuongThucThanhToan);
        hd.setMaNhanVien(maNhanVien);
        hd.setMaKhachHang(maKhachHang);
        hd.setDiemSuDung(diemSuDung);
        hd.setDiemCongThem(diemCongThem);
        return hoaDonRepository.save(hd);
    }

    private void createChiTietHoaDon(int maHoaDon, DoUong doUong, int soLuong, int donGia, int thanhTien, String ghiChu) {
        ChiTietHoaDon ct = new ChiTietHoaDon();
        ct.setMaHoaDon(maHoaDon);
        ct.setMaDoUong(doUong.getMaDoUong());
        ct.setSoLuong(soLuong);
        ct.setDonGia(donGia);
        ct.setThanhTien(thanhTien);
        ct.setGhiChuThuocTinh(ghiChu);
        chiTietHoaDonRepository.save(ct);
    }

    private DoUong findDoUongByCode(List<DoUong> doUongs, String code) {
        return doUongs.stream()
                .filter(du -> code.equals(du.getMaDoUongCode()))
                .findFirst()
                .orElse(null);
    }
}