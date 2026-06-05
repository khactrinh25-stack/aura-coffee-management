# Aura Coffee Operations Management System

## 1. Project Introduction
The Aura Coffee software is a centralized management system designed for the take-away coffee shop model. The system supports optimizing the sales process, tracking orders, and managing customer and employee information.

## 2. Deployment Technologies
* The user interface utilizes the React library initialized with the Vite tool. The system uses the React Router library for page routing and CSS Modules for interface styling.
* The server system uses the Java Spring Boot version 3 framework and manages software packages with Maven. The system requires the JDK version 17 execution environment.
* The database system uses H2 in-memory database for local development (no SQL Server installation required).

## 3. Project Architecture
* Detailed information regarding source code development standards and system architecture is specified in the docs/DEVELOPMENT_STANDARDS.md file.
* Details regarding software requirements and business rules are specified in the docs/BUSINESS_REQUIREMENTS.md file.

---

## 4. Setup Guide for New Developers

Follow the steps below to set up and run the Aura Coffee system on your local machine.

### Prerequisites

Before starting, make sure you have the following installed:

| Software | Version | Download Link |
|----------|---------|---------------|
| Node.js | 18.x or later | https://nodejs.org/ |
| JDK | 17 (Temurin/Adoptium) | https://adoptium.net/ |
| Apache Maven | 3.8.x or later | https://maven.apache.org/ |
| Git | Latest | https://git-scm.com/ |

> **Note:** Make sure the `JAVA_HOME` environment variable points to JDK 17 path, and `MAVEN_HOME` (or `M2_HOME`) points to your Maven installation directory.

> **Info:** This project uses an **H2 in-memory database** for local development — you do **not** need to install SQL Server or create any database manually. The backend automatically creates tables and seeds sample data on startup.

---

### Step 1: Clone the Repository

Open **Command Prompt (cmd)** or **PowerShell** and run:

```bash
cd C:\Users\%USERNAME%\Desktop
git clone https://github.com/khactrinh25-stack/aura-coffee-management.git
cd aura-coffee-management
```

---

### Step 2: Install Frontend Dependencies

1. Open **Command Prompt** and navigate to the project:

   ```bash
   cd C:\Users\%USERNAME%\Desktop\aura-coffee-management\frontend
   ```

2. Install npm packages:

   ```bash
   npm install
   ```

3. Wait for the installation to complete (may take 1-2 minutes).

---

### Step 3: Install Backend Dependencies

1. Open another **Command Prompt** and navigate to:

   ```bash
   cd C:\Users\%USERNAME%\Desktop\aura-coffee-management\backend
   ```

2. Download Maven dependencies and build the project:

   ```bash
   mvn clean install -DskipTests
   ```

3. The first download may take a few minutes. Wait for `BUILD SUCCESS` to appear.

---

### Step 4: (Optional) Configure Gmail SMTP for Email Verification

The system supports a "Forgot Password" feature that sends OTP codes via email. If you want to use this feature, you need to configure your Gmail SMTP credentials.

1. Open the file:
   ```
   C:\Users\%USERNAME%\Desktop\aura-coffee-management\backend\src\main\resources\application-dev.properties
   ```

2. Find these lines at the bottom of the file:

   ```properties
   spring.mail.username=your-email@gmail.com
   spring.mail.password=your-16-char-gmail-app-password
   ```

3. Replace `your-email@gmail.com` with **your Gmail address**.

4. Replace `your-16-char-gmail-app-password` with a **16-character Gmail App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" as the app and "Windows Computer" as the device
   - Click "Generate" and copy the 16-character password
   - Paste it into the file

5. **Save the file.**

> **If you skip this step**, the email verification feature will not work, but all other features (login, sales, management) will function normally.

---

### Step 5: Run the System

The project includes **two batch files** that will start both the backend and frontend automatically.

#### Start Backend

1. In File Explorer, go to:
   ```
   C:\Users\%USERNAME%\Desktop\aura-coffee-management\
   ```

2. **Double-click** `start-backend.bat`.
   - A command prompt window will open.
   - The script will automatically build and start the backend with the `dev` profile (using H2 in-memory database).
   - Wait until you see a message like:
     ```
     Started ManagementApplication in X.XXX seconds
     ```
   - This means the backend server is running on **http://localhost:8080**.

#### Start Frontend

1. **Double-click** `start-frontend.bat`.
   - Another command prompt window will open.
   - Wait until you see:
     ```
     ➜  Local:   http://localhost:5173/
     ```
   - This means the frontend is running.

> **Note for first-time startup:** When the backend starts for the first time, the `DataInitializer` component will automatically create all necessary tables (NHAN_VIEN, KHACH_HANG, DO_UONG, DANH_MUC, HOA_DON, CHI_TIET_HOA_DON) and seed sample data into the H2 database. You do not need to run any SQL scripts manually.

---

### Step 6: Open the Application

1. Open your browser (Chrome, Edge, etc.).
2. Go to: **http://localhost:5173**
3. You should see the **Aura Coffee Login Page**.

#### Default Login Accounts

The seed data includes two default accounts:

| Role | Username | Password |
|------|----------|----------|
| **Admin** | `admin` | `admin123` |
| **Employee (Nhân viên)** | `nhanvien1` | `employee123` |

> **Note:** These accounts are created automatically by the DataInitializer when the backend starts for the first time with an empty database.

---

### Step 7: Verify Everything Works

1. **Login as Admin**: Select the "Admin" user type on the login page, enter `admin` / `admin123`, click Login. You should see the **Admin Dashboard** with menus for managing products, customers, employees, and invoices.

2. **Login as Employee**: Select the "Employee" user type on the login page, enter `nhanvien1` / `employee123`, click Login. You should see the **Sales Management (POS)** screen where you can:
   - Browse drink products by category
   - Add items to the shopping cart with size customizations
   - Look up customers and create invoices
   - Print receipts

---

### Step 8: (Optional) Access H2 Database Console

The H2 in-memory database includes a web console for debugging and inspecting data.

1. With the backend running, open your browser and go to: **http://localhost:8080/h2-console**
2. Fill in the login fields:
   - **JDBC URL:** `jdbc:h2:mem:aura`
   - **Username:** `sa`
   - **Password:** *(leave blank)*
3. Click **Connect**. You can now browse tables and run SQL queries.

---

## 5. Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend fails to start with "port 8080 already in use" | Close other Java applications or the `start-backend.bat` window, then try again. The batch file will auto-kill processes on port 8080. |
| Frontend shows blank page | Make sure the backend is running first (wait for `Started ManagementApplication`) |
| Login fails with "Bad credentials" | Check that the `DataInitializer` ran successfully (look for seed data logs in the backend console) |
| `npm install` fails with network error | Retry or use a different network. You can also try `npm install --registry=https://registry.npmmirror.com` |
| Maven build fails | Make sure `JAVA_HOME` points to JDK 17, not JDK 21 or later. Run `java -version` to verify. |

---

## 6. Important Notes
- The `.vscode/` directory is shared to ensure consistent editor settings across the team.
- For detailed coding rules and AI-assisted development guidelines, see `.clinerules/default-rules.md`.
- Do NOT commit `.env` files — they contain local credentials and are already in `.gitignore`.
- The `application-dev.properties` file is already on the repository — you only need to modify it if you want to enable Gmail SMTP.