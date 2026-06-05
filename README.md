# Aura Coffee Operations Management System

## 1. Project Introduction
The Aura Coffee software is a centralized management system designed for the take-away coffee shop model. The system supports optimizing the sales process, tracking orders, and managing customer and employee information.

## 2. Deployment Technologies
* The user interface utilizes the React library initialized with the Vite tool. The system uses the React Router library for page routing and CSS Modules for interface styling.
* The server system uses the Java Spring Boot version 3 framework and manages software packages with Maven. The system requires the JDK version 17 execution environment.
* The database system uses the Microsoft SQL Server management system.

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
| Microsoft SQL Server | 2019 or later (Express edition is sufficient) | https://www.microsoft.com/en-us/sql-server/sql-server-downloads |
| SQL Server Management Studio (SSMS) | Latest | https://aka.ms/ssmsfullsetup |
| Git | Latest | https://git-scm.com/ |

> **Note:** Make sure the `JAVA_HOME` environment variable points to JDK 17 path, and `MAVEN_HOME` (or `M2_HOME`) points to your Maven installation directory.

---

### Step 1: Clone the Repository

Open **Command Prompt (cmd)** or **PowerShell** and run:

```bash
cd C:\Users\%USERNAME%\Desktop
git clone https://github.com/khactrinh25-stack/aura-coffee-management.git
cd aura-coffee-management
```

---

### Step 2: Create the Database in SQL Server

1. Open **SQL Server Management Studio (SSMS)** and connect to your local SQL Server instance.
2. In the "Connect to Server" dialog:
   - **Server type:** Database Engine
   - **Server name:** `localhost` (or `.\SQLEXPRESS` if using SQL Server Express)
   - **Authentication:** Windows Authentication (or SQL Server Authentication if you have a SQL login)

3. After connecting, click **New Query** and run the following SQL script to create the database:

```sql
CREATE DATABASE AuraCoffeeDB;
GO
```

4. Click **Execute** (or press F5). You should see "Commands completed successfully."

5. You can verify the database was created by expanding **Databases** in the Object Explorer — you should see `AuraCoffeeDB`.

---

### Step 3: Configure the Backend Connection

1. Navigate to the project folder in File Explorer:
   ```
   C:\Users\%USERNAME%\Desktop\aura-coffee-management\backend\src\main\resources\
   ```

2. You will see a file named **`application.properties.example`**. This is a template file.

3. **Copy** `application.properties.example` and rename the copy to **`application.properties`**.

4. Open **`application.properties`** with Notepad or any text editor.

5. Update the following fields with **your local SQL Server credentials**:

   ```properties
   spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=AuraCoffeeDB;encrypt=true;trustServerCertificate=true
   spring.datasource.username=sa
   spring.datasource.password=your-sql-server-password
   jwt.secret=YourSuperSecretKeyThatIsAtLeast32CharactersLong
   ```

   > **Note:** 
   > - If using SQL Server Express, change `localhost:1433` to `localhost\SQLEXPRESS:1433` or remove the instance name.
   > - If using Windows Authentication, use these settings instead:
   >   ```
   >   spring.datasource.username=DESKTOP-XXXXX\YourName
   >   spring.datasource.password=
   >   ```
   >   (You may also need to add `;integratedSecurity=true` to the URL)
   > - The `jwt.secret` can be any random string at least 32 characters long.

6. **Save the file.**

---

### Step 4: Install Frontend Dependencies

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

### Step 5: Install Backend Dependencies

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

### Step 6: Run the System

The project includes **two batch files** that will start both the backend and frontend automatically.

#### Start Backend

1. In File Explorer, go to:
   ```
   C:\Users\%USERNAME%\Desktop\aura-coffee-management\
   ```

2. **Double-click** `start-backend.bat`.
   - A command prompt window will open.
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

> **Note for first-time startup:** When the backend starts for the first time, the `DataInitializer` component will automatically create all necessary tables (NHAN_VIEN, KHACH_HANG, DO_UONG, DANH_MUC, HOA_DON, CHI_TIET_HOA_DON) and seed sample data into the AuraCoffeeDB database. You do not need to run any SQL scripts manually.

---

### Step 7: Open the Application

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

### Step 8: Verify Everything Works

1. **Login as Admin**: Select the "Admin" user type on the login page, enter `admin` / `admin123`, click Login. You should see the **Admin Dashboard** with menus for managing products, customers, employees, and invoices.

2. **Login as Employee**: Select the "Employee" user type on the login page, enter `nhanvien1` / `employee123`, click Login. You should see the **Sales Management (POS)** screen where you can:
   - Browse drink products by category
   - Add items to the shopping cart with size customizations
   - Look up customers and create invoices
   - Print receipts

---

## 5. Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend fails to start with "port 8080 already in use" | Close other Java applications or change the port in `application.properties` |
| Frontend shows blank page | Make sure the backend is running first (wait for `Started ManagementApplication`) |
| Login fails with "Bad credentials" | Check that the `DataInitializer` ran successfully (check backend console logs for errors) |
| Database connection error | Verify SQL Server is running (check services.msc for "SQL Server (MSSQLSERVER)") |
| "Login failed for user 'sa'" | Enable SQL Server Authentication in SSMS and set a password for the `sa` account |

---

## 6. Important Notes
- The `.vscode/` directory is shared to ensure consistent editor settings across the team.
- For detailed coding rules and AI-assisted development guidelines, see `.clinerules/default-rules.md`.
- Do NOT commit `application.properties` or `.env` files — they contain local credentials and are already in `.gitignore`.