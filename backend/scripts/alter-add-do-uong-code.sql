-- ============================================================
-- ALTER TABLE: Thêm cột ma_do_uong_code vào bảng DO_UONG
-- Chạy script này 1 lần duy nhất để cập nhật DB schema
-- ============================================================

USE AuraCoffeeDB;
GO

-- 1. Thêm cột ma_do_uong_code (cho phép NULL trước khi update)
IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'DO_UONG' AND COLUMN_NAME = 'ma_do_uong_code'
)
BEGIN
    ALTER TABLE DO_UONG ADD ma_do_uong_code VARCHAR(20) NULL;
    PRINT 'Added column ma_do_uong_code to DO_UONG table';
END
ELSE
BEGIN
    PRINT 'Column ma_do_uong_code already exists';
END
GO

-- 2. Cập nhật mã code cho các đồ uống đã có (dựa vào ma_do_uong và danh mục)
-- Cà phê (danh mục 1) -> CF + số thứ tự
UPDATE DO_UONG SET ma_do_uong_code = 'CF001' WHERE ma_do_uong = 1 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'CF002' WHERE ma_do_uong = 2 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'CF003' WHERE ma_do_uong = 3 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'CF004' WHERE ma_do_uong = 4 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'CF005' WHERE ma_do_uong = 5 AND ma_do_uong_code IS NULL;

-- Trà sữa (danh mục 2) -> TS + số thứ tự
UPDATE DO_UONG SET ma_do_uong_code = 'TS001' WHERE ma_do_uong = 6 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'TS002' WHERE ma_do_uong = 7 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'TS003' WHERE ma_do_uong = 8 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'TS004' WHERE ma_do_uong = 9 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'TS005' WHERE ma_do_uong = 10 AND ma_do_uong_code IS NULL;

-- Nước ép (danh mục 3) -> NE + số thứ tự
UPDATE DO_UONG SET ma_do_uong_code = 'NE001' WHERE ma_do_uong = 11 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'NE002' WHERE ma_do_uong = 12 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'NE003' WHERE ma_do_uong = 13 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'NE004' WHERE ma_do_uong = 14 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'NE005' WHERE ma_do_uong = 15 AND ma_do_uong_code IS NULL;

-- Sinh tố (danh mục 4) -> ST + số thứ tự
UPDATE DO_UONG SET ma_do_uong_code = 'ST001' WHERE ma_do_uong = 16 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'ST002' WHERE ma_do_uong = 17 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'ST003' WHERE ma_do_uong = 18 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'ST004' WHERE ma_do_uong = 19 AND ma_do_uong_code IS NULL;

-- Đá xay (danh mục 5) -> DX + số thứ tự
UPDATE DO_UONG SET ma_do_uong_code = 'DX001' WHERE ma_do_uong = 20 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'DX002' WHERE ma_do_uong = 21 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'DX003' WHERE ma_do_uong = 22 AND ma_do_uong_code IS NULL;

-- Cacao & Socola (danh mục 6) -> CS + số thứ tự
UPDATE DO_UONG SET ma_do_uong_code = 'CS001' WHERE ma_do_uong = 23 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'CS002' WHERE ma_do_uong = 24 AND ma_do_uong_code IS NULL;
UPDATE DO_UONG SET ma_do_uong_code = 'CS003' WHERE ma_do_uong = 25 AND ma_do_uong_code IS NULL;
GO

-- 3. Cập nhật trạng thái từ HOAT_DONG (cũ) sang CON_HANG (mới)
UPDATE DO_UONG SET trang_thai = 'CON_HANG' WHERE trang_thai = 'HOAT_DONG';
GO

-- 4. Kiểm tra kết quả
SELECT ma_do_uong, ma_do_uong_code, ten_do_uong, trang_thai FROM DO_UONG ORDER BY ma_do_uong;
GO

PRINT '=== DB SCHEMA UPDATE COMPLETED ===';
PRINT '- Added ma_do_uong_code column';
PRINT '- Updated status from HOAT_DONG to CON_HANG';
PRINT '- Assigned codes for all existing beverages';
GO