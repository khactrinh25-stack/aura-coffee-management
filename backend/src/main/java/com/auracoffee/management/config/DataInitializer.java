package com.auracoffee.management.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.auracoffee.management.entity.DanhMuc;
import com.auracoffee.management.entity.DoUong;
import com.auracoffee.management.entity.KhachHang;
import com.auracoffee.management.entity.NhanVien;
import com.auracoffee.management.repository.DanhMucRepository;
import com.auracoffee.management.repository.DoUongRepository;
import com.auracoffee.management.repository.KhachHangRepository;
import com.auracoffee.management.repository.NhanVienRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final NhanVienRepository nhanVienRepository;
    private final DanhMucRepository danhMucRepository;
    private final DoUongRepository doUongRepository;
    private final KhachHangRepository khachHangRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(NhanVienRepository nhanVienRepository,
                           DanhMucRepository danhMucRepository,
                           DoUongRepository doUongRepository,
                           KhachHangRepository khachHangRepository,
                           PasswordEncoder passwordEncoder) {
        this.nhanVienRepository = nhanVienRepository;
        this.danhMucRepository = danhMucRepository;
        this.doUongRepository = doUongRepository;
        this.khachHangRepository = khachHangRepository;
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
        // 2. Seed DANH_MUC (6 danh mục) - only if empty
        // ============================================================
        DanhMuc dm1, dm2, dm3, dm4, dm5, dm6;

        if (danhMucRepository.count() == 0) {
            System.out.println("  - DANH_MUC: seeding...");

            dm1 = new DanhMuc();
            dm1.setTenDanhMuc("Cà phê");
            danhMucRepository.save(dm1);

            dm2 = new DanhMuc();
            dm2.setTenDanhMuc("Trà sữa");
            danhMucRepository.save(dm2);

            dm3 = new DanhMuc();
            dm3.setTenDanhMuc("Nước ép");
            danhMucRepository.save(dm3);

            dm4 = new DanhMuc();
            dm4.setTenDanhMuc("Sinh tố");
            danhMucRepository.save(dm4);

            dm5 = new DanhMuc();
            dm5.setTenDanhMuc("Đá xay");
            danhMucRepository.save(dm5);

            dm6 = new DanhMuc();
            dm6.setTenDanhMuc("Cacao & Socola");
            danhMucRepository.save(dm6);
        } else {
            System.out.println("  - DANH_MUC: already exists, skipping");
            // Fetch existing categories for reference
            var allDanhMuc = danhMucRepository.findAll();
            dm1 = allDanhMuc.get(0);
            dm2 = allDanhMuc.get(1);
            dm3 = allDanhMuc.get(2);
            dm4 = allDanhMuc.get(3);
            dm5 = allDanhMuc.get(4);
            dm6 = allDanhMuc.get(5);
        }

        // ============================================================
        // 3. Seed DO_UONG (25 đồ uống với giá thực tế) - only if empty
        // ============================================================
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

            // --- Nước ép (maDanhMuc = dm3) ---
            saveDoUong("NE001", "Nước ép cam",         35000, dm3.getMaDanhMuc(), "CON_HANG");
            saveDoUong("NE002", "Nước ép táo",         35000, dm3.getMaDanhMuc(), "CON_HANG");
            saveDoUong("NE003", "Nước ép dưa hấu",     35000, dm3.getMaDanhMuc(), "CON_HANG");
            saveDoUong("NE004", "Nước ép cà rốt",      38000, dm3.getMaDanhMuc(), "CON_HANG");
            saveDoUong("NE005", "Nước ép ổi",          38000, dm3.getMaDanhMuc(), "CON_HANG");

            // --- Sinh tố (maDanhMuc = dm4) ---
            saveDoUong("ST001", "Sinh tố bơ",          45000, dm4.getMaDanhMuc(), "CON_HANG");
            saveDoUong("ST002", "Sinh tố xoài",        40000, dm4.getMaDanhMuc(), "CON_HANG");
            saveDoUong("ST003", "Sinh tố dâu tây",     42000, dm4.getMaDanhMuc(), "CON_HANG");
            saveDoUong("ST004", "Sinh tố mãng cầu",    45000, dm4.getMaDanhMuc(), "CON_HANG");

            // --- Đá xay (maDanhMuc = dm5) ---
            saveDoUong("DX001", "Cà phê đá xay",       49000, dm5.getMaDanhMuc(), "CON_HANG");
            saveDoUong("DX002", "Cookies & Cream",      55000, dm5.getMaDanhMuc(), "CON_HANG");
            saveDoUong("DX003", "Matcha đá xay",       52000, dm5.getMaDanhMuc(), "CON_HANG");

            // --- Cacao & Socola (maDanhMuc = dm6) ---
            saveDoUong("CS001", "Cacao nóng",          35000, dm6.getMaDanhMuc(), "CON_HANG");
            saveDoUong("CS002", "Socola đá xay",       45000, dm6.getMaDanhMuc(), "CON_HANG");
            saveDoUong("CS003", "Socola latte",        42000, dm6.getMaDanhMuc(), "CON_HANG");
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

        System.out.println("=== DATA INITIALIZER: Seed completed ===");
        System.out.println("  - 4 nhân viên (admin / nv01 / nv02 / nv03, all password: 123456)");
        System.out.println("  - 6 danh mục, 25 đồ uống");
        System.out.println("  - 10 khách hàng mẫu");
    }

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
}