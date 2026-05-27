-- ============================================================
-- FILE: seed-data.sql
-- MÔ TẢ: Dữ liệu mẫu cho Aura Coffee Management
-- CÁCH DÙNG: Chạy file này trên SQL Server khi cần seed
--            thủ công (không dùng DataInitializer Java)
-- ============================================================

USE AuraCoffeeDB;
GO

-- ============================================================
-- 1. NHAN_VIEN (4 nhân viên)
--    LƯU Ý: Mật khẩu dưới đây là BCrypt hash của "123456"
--    KHI NHÂN BẢN: Chạy backend Java để có BCrypt hash đúng
-- ============================================================
INSERT INTO NHAN_VIEN (ten_dang_nhap, mat_khau, ho_ten, so_dien_thoai, vai_tro, trang_thai)
VALUES
    ('admin',   '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36PQm4sEPhMNPfFhpYN76u', N'Admin Aura Coffee', '0900000001', 'Admin', 1),
    ('nv01',    '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36PQm4sEPhMNPfFhpYN76u', N'Nguyễn Văn An',    '0900000002', 'NhanVien', 1),
    ('nv02',    '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36PQm4sEPhMNPfFhpYN76u', N'Trần Thị Bích',   '0900000003', 'NhanVien', 1),
    ('nv03',    '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36PQm4sEPhMNPfFhpYN76u', N'Lê Hoàng Nam',    '0900000004', 'NhanVien', 1);
GO

-- ============================================================
-- 2. DANH_MUC (6 danh mục)
-- ============================================================
INSERT INTO DANH_MUC (ten_danh_muc)
VALUES
    (N'Cà phê'),
    (N'Trà sữa'),
    (N'Nước ép'),
    (N'Sinh tố'),
    (N'Đá xay'),
    (N'Cacao & Socola');
GO

-- ============================================================
-- 3. DO_UONG (25 đồ uống)
-- ============================================================
-- Lấy ma_danh_muc tương ứng
DECLARE @caPheId INT, @traSuaId INT, @nuocEpId INT, @sinhToId INT, @daXayId INT, @cacaoId INT;
SELECT @caPheId = ma_danh_muc FROM DANH_MUC WHERE ten_danh_muc = N'Cà phê';
SELECT @traSuaId = ma_danh_muc FROM DANH_MUC WHERE ten_danh_muc = N'Trà sữa';
SELECT @nuocEpId = ma_danh_muc FROM DANH_MUC WHERE ten_danh_muc = N'Nước ép';
SELECT @sinhToId = ma_danh_muc FROM DANH_MUC WHERE ten_danh_muc = N'Sinh tố';
SELECT @daXayId = ma_danh_muc FROM DANH_MUC WHERE ten_danh_muc = N'Đá xay';
SELECT @cacaoId = ma_danh_muc FROM DANH_MUC WHERE ten_danh_muc = N'Cacao & Socola';

-- Cà phê
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Cà phê đen',        25000, @caPheId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Cà phê sữa đá',     29000, @caPheId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Bạc xỉu',           35000, @caPheId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Cà phê espresso',   30000, @caPheId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Cà phê latte',      39000, @caPheId, 'HOAT_DONG');

-- Trà sữa
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Trà sữa trân châu', 50000, @traSuaId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Trà sữa matcha',    55000, @traSuaId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Trà sữa khoai môn', 52000, @traSuaId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Trà sữa thái xanh', 48000, @traSuaId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Trà đào cam sả',    45000, @traSuaId, 'HOAT_DONG');

-- Nước ép
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Nước ép cam',       35000, @nuocEpId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Nước ép táo',       35000, @nuocEpId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Nước ép dưa hấu',   35000, @nuocEpId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Nước ép cà rốt',    38000, @nuocEpId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Nước ép ổi',        38000, @nuocEpId, 'HOAT_DONG');

-- Sinh tố
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Sinh tố bơ',        45000, @sinhToId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Sinh tố xoài',      40000, @sinhToId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Sinh tố dâu tây',   42000, @sinhToId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Sinh tố mãng cầu',  45000, @sinhToId, 'HOAT_DONG');

-- Đá xay
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Cà phê đá xay',     49000, @daXayId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Cookies & Cream',    55000, @daXayId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Matcha đá xay',     52000, @daXayId, 'HOAT_DONG');

-- Cacao & Socola
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Cacao nóng',        35000, @cacaoId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Socola đá xay',     45000, @cacaoId, 'HOAT_DONG');
INSERT INTO DO_UONG (ten_do_uong, gia_ban, ma_danh_muc, trang_thai) VALUES (N'Socola latte',      42000, @cacaoId, 'HOAT_DONG');
GO

-- ============================================================
-- 4. KHACH_HANG (10 khách hàng)
-- ============================================================
INSERT INTO KHACH_HANG (ho_ten, so_dien_thoai, diem_tich_luy)
VALUES
    (N'Trần Văn Bình',  '0912345678', 120),
    (N'Phạm Thị Cúc',   '0912345679', 250),
    (N'Hoàng Minh Đức', '0912345680', 0),
    (N'Ngô Thị Hoa',    '0912345681', 75),
    (N'Đỗ Văn Hùng',    '0912345682', 30),
    (N'Vũ Thị Lan',     '0912345683', 180),
    (N'Bùi Quốc Tuấn',  '0912345684', 5),
    (N'Dương Thị Mai',  '0912345685', 90),
    (N'Lý Văn Tài',     '0912345686', 0),
    (N'Mai Thị Thu',    '0912345687', 200);
GO

PRINT '=== SEED DATA COMPLETED ===';
PRINT '- 4 nhân viên';
PRINT '- 6 danh mục, 25 đồ uống';
PRINT '- 10 khách hàng';
GO