# Hướng Dẫn Cài Đặt Môi Trường Cho Developer Mới

> Tài liệu này dành cho các bạn mới tham gia dự án **Aura Coffee Operations Management System**, sử dụng máy tính mới (chưa cài đặt gì).

---

## Mục Lục

1. [Cài Đặt Công Cụ Cần Thiết](#1-cài-đặt-công-cụ-cần-thiết)
2. [Cài Đặt VS Code & Extension](#2-cài-đặt-vs-code--extension)
3. [Clone Dự Án & Cấu Hình](#3-clone-dự-án--cấu-hình)
4. [Chạy Ứng Dụng Lần Đầu](#4-chạy-ứng-dụng-lần-đầu)
5. [Quy Tắc Làm Việc Chung](#5-quy-tắc-làm-việc-chung)
6. [Xử Lý Lỗi Thường Gặp](#6-xử-lý-lỗi-thường-gặp)

---

## 1. Cài Đặt Công Cụ Cần Thiết

### 1.1 Git

Git dùng để clone mã nguồn và quản lý phiên bản.

- **Link tải:** https://git-scm.com/downloads/win
- **Cài đặt:** Mặc định, Next → Next → Finish
- **Kiểm tra:** Mở `cmd` gõ:
  ```cmd
  git --version
  ```
  Kết quả: `git version 2.x.x`

### 1.2 Node.js

Node.js dùng để chạy frontend React.

- **Link tải:** https://nodejs.org/ (bản LTS, ví dụ 20.x hoặc 22.x)
- **Cài đặt:** Mặc định, Next → Next → Finish
- **Kiểm tra:** Mở `cmd` gõ:
  ```cmd
  node --version
  npm --version
  ```
  Kết quả: `v20.x.x` và `10.x.x`

### 1.3 JDK 17

JDK 17 dùng để chạy backend Spring Boot.

- **Link tải:** https://adoptium.net/temurin/releases/?version=17
  - Chọn **Windows** → **x64** → file `.msi`
- **Cài đặt:** Mặc định, Next → Install
- **Kiểm tra:** Mở `cmd` gõ:
  ```cmd
  java -version
  ```
  Kết quả: `openjdk version "17.x.x"`

### 1.4 Microsoft SQL Server

SQL Server là cơ sở dữ liệu của hệ thống.

**Tùy chọn A — SQL Server Developer (khuyên dùng):**
- **Link tải:** https://go.microsoft.com/fwlink/?linkid=866662
- Chọn phiên bản **Developer** (miễn phí)
- Trong quá trình cài:
  - **Instance:** Chọn `Default instance` (cổng 1433)
  - **Authentication:** Chọn **Mixed Mode (SQL Server and Windows Authentication)**
  - **Nhớ mật khẩu SQL Admin (sa)** bạn đặt — sẽ dùng sau này!

**Tùy chọn B — SQL Server Express:**
- **Link tải:** https://go.microsoft.com/fwlink/?linkid=866658
- Cấu hình tương tự như trên

**Kiểm tra:** Sau cài, mở `cmd` gõ:
```cmd
sqlcmd -S localhost -U sa -P "mật_khẩu_của_bạn"
```
Nếu vào được dấu nhắc `1>`, SQL Server đã chạy. Gõ `exit` để thoát.

### 1.5 SQL Server Management Studio (SSMS) — *Khuyên dùng*

SSMS giúp bạn quản lý database trực quan.

- **Link tải:** https://aka.ms/ssmsfullsetup
- **Cài đặt:** Mặc định, Next → Install

Sau cài đặt, mở SSMS, kết nối:
- **Server name:** `localhost`
- **Authentication:** `SQL Server Authentication`
- **Login:** `sa`
- **Password:** (mật khẩu bạn đã đặt)

### 1.6 Maven

Dự án đã có Maven Wrapper (file `mvnw.cmd` trong thư mục `backend/`), nên bạn **không cần cài Maven riêng**. Nếu muốn cài để chạy độc lập:

- **Link tải:** https://maven.apache.org/download.cgi
- Giải nén và thêm `bin/` vào PATH

---

## 2. Cài Đặt VS Code & Extension

### 2.1 Visual Studio Code

- **Link tải:** https://code.visualstudio.com/
- **Cài đặt:** Mặc định, tick thêm:
  - ☑ Add "Open with Code" action to Windows Explorer file context menu
  - ☑ Add "Open with Code" action to Windows Explorer directory context menu
  - ☑ Register Code as an editor for supported file types
  - ☑ Add to PATH

### 2.2 Extension Cline (AI Coding Assistant)

Đây là extension quan trọng nhất — nó là "bạn đồng hành AI" sẽ giúp bạn viết code.

1. Mở VS Code
2. Nhấn `Ctrl + Shift + X` (Extensions)
3. Gõ tìm: **Cline**
4. Chọn **"Cline"** (tác giả: saoudrizwan.claude-dev) → **Install**

> **Lưu ý:** Cline yêu cầu API Key từ nhà cung cấp (ví dụ: Anthropic Claude, OpenAI, hoặc các nhà cung cấp khác). Hãy liên hệ leader dự án để được cấp API Key hoặc hướng dẫn cấu hình.

### 2.3 Các Extension Hỗ Trợ Khác (Khuyên Dùng)

| Extension | Công Dụng |
|-----------|-----------|
| **ES7+ React/Redux/React-Native snippets** | Gõ nhanh code React |
| **Java Extension Pack** | Hỗ trợ Java (nếu cần debug) |
| **Prettier - Code formatter** | Format code tự động |
| **GitLens** | Xem lịch sử Git trực quan |

---

## 3. Clone Dự Án & Cấu Hình

### 3.1 Clone Repository

```cmd
cd C:\Users\<tên-của-bạn>\Desktop
git clone https://github.com/khactrinh25-stack/aura-coffee-management.git
cd aura-coffee-management
```

Sau đó checkout nhánh `develop` (nhánh chính để phát triển):
```cmd
git checkout develop
```

### 3.2 Tạo Database

1. Mở **SSMS**
2. Kết nối với `localhost` bằng tài khoản `sa`
3. Click **New Query**, paste nội dung sau:

```sql
CREATE DATABASE AuraCoffeeDB;
```

4. Nhấn `F5` (Execute)
5. Refresh danh sách database — sẽ thấy `AuraCoffeeDB` đã xuất hiện.

### 3.3 Mở Dự Án Trong VS Code

```cmd
code .
```

### 3.4 Cấu Hình Backend (Tự Động Bởi Cline)

**Lần đầu mở project bằng Cline, bạn sẽ thấy:**

1. Mở VS Code
2. Nhấn `Ctrl + Shift + P` → gõ `Cline: Start` (hoặc click icon Cline trên thanh bên trái)
3. Cline sẽ tự động:
   - ✅ Kiểm tra file `backend/src/main/resources/application.properties`
   - ✅ Nếu chưa có → copy từ `application.properties.example`
   - ✅ **Hỏi bạn:** SQL Server username/password của bạn?
   - ✅ Cập nhật thông tin vào file

**Hoặc bạn có thể tự làm thủ công:**

1. Vào thư mục `backend/src/main/resources/`
2. Copy file `application.properties.example` → đặt tên `application.properties`
3. Mở `application.properties`, chỉnh sửa:
   ```
   spring.datasource.username=sa
   spring.datasource.password=123456        ← đổi thành mật khẩu SQL của bạn
   jwt.secret=AURA_COFFEE_SECRET_KEY_2026   ← đặt secret bất kỳ (tối thiểu 32 ký tự)
   ```

---

## 4. Chạy Ứng Dụng Lần Đầu

### 4.1 Chạy Database Seed

> **Quan trọng:** Database cần có dữ liệu mẫu (nhân viên, đồ uống,...) trước khi chạy.

**Cách 1 — Dùng Cline (khuyên dùng):**
- Khi bạn mở VS Code và nói với Cline "Hãy chạy seed data", Cline sẽ tự động kết nối database và chạy script.

**Cách 2 — Tự chạy bằng SSMS:**
1. Mở SSMS
2. Mở file `backend/scripts/seed-data.sql` (kéo thả vào SSMS)
3. Nhấn `F5` để chạy

### 4.2 Chạy Backend

**Cách 1 — Click đúp file** `start-backend.bat` (trong thư mục gốc dự án)

**Cách 2 — Bằng tay (cmd):**
```cmd
cd backend
mvnw.cmd spring-boot:run
```

Chờ đến khi thấy:
```
Tomcat started on port 8080 (http)
```
→ Backend đã chạy!

### 4.3 Chạy Frontend

**Cách 1 — Click đúp file** `start-frontend.bat`

**Cách 2 — Bằng tay (cmd):**
```cmd
cd frontend
npm install
npm run dev
```

Chờ đến khi thấy:
```
VITE v6.x.x  ready in 2s
Local: http://localhost:5173
```
→ Frontend đã chạy!

### 4.4 Đăng Nhập Thử

Mở trình duyệt → vào `http://localhost:5173`

Thông tin đăng nhập mẫu:

| Vai trò | Mã NV | Mật khẩu |
|---------|-------|----------|
| **Nhân viên** | `NV001` | `password123` |
| **Admin** | `AD001` | `password123` |

---

## 5. Quy Tắc Làm Việc Chung

### 5.1 Branch Strategy

```
main (production)
  └── develop (staging / dev chính)
        ├── feature/login (đã hoàn thành)
        ├── feature/product-management (bạn làm)
        ├── feature/employee-management (bạn A làm)
        ├── feature/order-management (bạn B làm)
        └── ...
```

- **Tuyệt đối không commit trực tiếp vào `main` hoặc `develop`**
- Mỗi tính năng tạo branch riêng từ `develop`:
  ```cmd
  git checkout develop
  git pull origin develop
  git checkout -b feature/ten-tinh-nang
  ```
- Sau khi xong → push và tạo Pull Request vào `develop`

### 5.2 Commit Message

Dùng chuẩn **Conventional Commits**:

```
feat: thêm chức năng mới
fix: sửa lỗi
chore: cập nhật cấu hình, thư viện
docs: sửa tài liệu
refactor: tái cấu trúc code
style: sửa format code
test: thêm test
```

Ví dụ:
```cmd
git commit -m "feat: add product CRUD API endpoints"
git commit -m "fix: correct invoice total calculation"
```

### 5.3 Trước Khi Bắt Đầu Feature Mới

Khi bạn có feature mới, hãy mở Cline trong VS Code và nói:

> "Em muốn làm feature [tên feature]. Hãy đọc tài liệu hướng dẫn và đặt câu hỏi cho anh trước khi code."

Cline sẽ:
1. Đọc file `.clinerules/default-rules.md` và tài liệu trong `docs/`
2. Hỏi bạn 3-5 câu hỏi để làm rõ business logic
3. Chỉ code khi bạn đã xác nhận

---

## 6. Xử Lý Lỗi Thường Gặp

### ❌ "Port 8080 already in use"
→ Backend khác đang chạy. Mở cmd gõ:
```cmd
netstat -ano | findstr :8080
taskkill /PID <số_PID> /F
```

### ❌ "Cannot connect to database"
→ Kiểm tra SQL Server đã chạy chưa:
```cmd
sqlcmd -S localhost -U sa -P "mật_khẩu"
```
→ Nếu sai mật khẩu, sửa lại trong `application.properties`

### ❌ "npm command not found"
→ Node.js chưa cài hoặc chưa restart máy sau cài. Thử restart lại.

### ❌ "java is not recognized"
→ JDK chưa cài hoặc PATH chưa đúng. Cài lại JDK 17.

### ❌ Frontend không hiển thị dữ liệu
→ Nói với Cline: "Màn hình bán hàng trống, hãy kiểm tra giúp anh". Cline sẽ tự động debug theo quy trình:
1. Kiểm tra backend chạy chưa?
2. API trả dữ liệu đúng không?
3. Có lỗi catch nào bị nuốt không?
4. Seed data đã được chạy chưa?
5. JWT token có được gửi không?

---

> **Liên hệ leader nhóm nếu gặp vấn đề không giải quyết được.**
>
> Chúc các bạn làm việc hiệu quả với dự án Aura Coffee! ☕🚀