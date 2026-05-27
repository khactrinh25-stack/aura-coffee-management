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

## 4. Team Collaboration

### 4.1 Development Workflow
This project follows a **Git Feature Branch Workflow** with the following rules:

- **Direct commits to `main` or `develop` branches are strictly prohibited.**
- All feature work must be developed on a feature branch branched out from `develop`.
- Branch naming convention: `feature/your-feature-name` (e.g., `feature/login`, `feature/sales-management`).
- After completing a feature, push the branch to remote and create a Pull Request to merge into `develop`.
- At least one team member must review the PR before merging.
- Squash-merge is recommended to keep the commit history clean.

### 4.2 Commit Message Convention
All commit messages must follow the **Conventional Commits** specification:

| Type       | Usage                              | Example                                  |
|------------|------------------------------------|------------------------------------------|
| `feat`     | A new feature                      | `feat: add login form UI`               |
| `fix`      | A bug fix                          | `fix: correct JWT token expiration`     |
| `chore`    | Routine tasks, build config        | `chore: update pom.xml dependencies`    |
| `docs`     | Documentation changes              | `docs: update README with setup guide`  |
| `refactor` | Code restructuring                 | `refactor: extract cart calculation`    |
| `style`    | Formatting, code style             | `style: fix indentation in App.jsx`     |
| `test`     | Adding or fixing tests             | `test: add unit tests for AuthService`  |
| `perf`     | Performance improvements           | `perf: optimize database query`         |

**Rules:**
- Always use lowercase for the type.
- Keep the description concise (< 72 characters).
- Use the imperative mood ("add" not "added" / "adds").
- For scope-specific changes, add parentheses: `feat(backend): add customer API endpoints`.

### 4.3 Local Setup for New Developers

1. Clone the repository.
2. Ensure you have JDK 17, Node.js, and SQL Server installed.
3. Copy `backend/src/main/resources/application.properties.example` to `backend/src/main/resources/application.properties`.
4. Update the copied file with your SQL Server credentials and a secure JWT secret key.
5. Run the backend using `start-backend.bat`.
6. Run the frontend using `start-frontend.bat`.

## 5. Important Notes
- `application.properties` (backend config) and `.env` files are local-only and **MUST NOT** be committed. Template files (`application.properties.example`) are provided for reference.
- The `.vscode/` directory is shared to ensure consistent editor settings across the team.
- For detailed coding rules and AI-assisted development guidelines, see `.clinerules/default-rules.md`.