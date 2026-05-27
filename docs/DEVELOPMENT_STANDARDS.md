# Aura Coffee Software Development Standards

## 1. General Source Code Standards
* Use modern ECMAScript technical specifications for all JavaScript operations.
* Write clear source code structures and strictly define data types for the server architecture using standard Java language specifications.
* Prioritize evidence-based processing logic, clear error handling, and strict exception mapping.

## 2. User Interface Architectural Constraints
* Directory isolation: The source code must adhere to the Page-based Routing architecture. Do not design overlapping interfaces. All business interfaces must be completely isolated within dedicated directory structures.
* Centralized HTTP connection protocol: Creating individual data fetching logic or initializing internal fetch or axios connection instances is strictly prohibited. All server interactions must stream through a centralized network configuration file defined at the apiClient.js file.
* State management: Use Local State React Hooks at the highest-level container components to minimize synchronization costs. Pass data states down to child components via Props in read-only mode.

## 3. Database Architecture
The system maps directly to 6 relational entities. The database schema design and entity definitions must accurately reflect the following parameters:
* The NHAN_VIEN table includes the columns: ma_nhan_vien, ten_dang_nhap, mat_khau, ho_ten, so_dien_thoai, vai_tro, trang_thai.
* The DANH_MUC table includes the columns: ma_danh_muc, ten_danh_muc.
* The DO_UONG table includes the columns: ma_do_uong, ten_do_uong, gia_ban, ma_danh_muc, trang_thai.
* The KHACH_HANG table includes the columns: ma_khach_hang, ho_ten, so_dien_thoai, diem_tich_luy.
* The HOA_DON table includes the columns: ma_hoa_don, ngay_tao, tong_tien, phuong_thuc_thanh_toan, ma_nhan_vien, ma_khach_hang.
* The CHI_TIET_HOA_DON table includes the columns: ma_chi_tiet, so_luong, don_gia, thanh_tien, ghi_chu_thuoc_tinh, ma_hoa_don, ma_do_uong.

## 4. Interaction Rules for Artificial Intelligence Programming Assistants
Before proceeding to generate source code, if the Markdown formatting documents or configurations have not clarified specific deployment details for the interface or data flow, the artificial intelligence system must ask clarifying questions to the user. Arbitrarily assuming business requirements or interface designs without clear confirmation information is strictly prohibited.