-- Tài khoản thử: admin / 123456 và nhanvien01 / 123456
-- trang_thai: 1 = hoạt động, 0 = khóa (không đăng nhập được)
USE AuraCoffeeDB;
GO

IF NOT EXISTS (SELECT 1 FROM NHAN_VIEN WHERE ten_dang_nhap = N'admin')
BEGIN
    INSERT INTO NHAN_VIEN (ten_dang_nhap, mat_khau, ho_ten, so_dien_thoai, vai_tro, trang_thai)
    VALUES (N'admin', N'123456', N'Quản trị viên', N'0900000001', N'Admin', 1);
END
GO

IF NOT EXISTS (SELECT 1 FROM NHAN_VIEN WHERE ten_dang_nhap = N'nhanvien01')
BEGIN
    INSERT INTO NHAN_VIEN (ten_dang_nhap, mat_khau, ho_ten, so_dien_thoai, vai_tro, trang_thai)
    VALUES (N'nhanvien01', N'123456', N'Nguyễn Văn A', N'0900000002', N'NhanVien', 1);
END
GO
