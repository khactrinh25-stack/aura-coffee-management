# AURA COFFEE PROJECT CONTEXT

## 1. Project Information and Roles
- Software name: Aura Coffee Take-Away Coffee Shop Operations Management.
- User role: Responsible for Full-stack programming for the Login feature and Sales Management feature. The user has no programming background and relies entirely on the Cline software's artificial intelligence to write source code.
- Reference documents: Software Requirements Specification, Figma design, AI_GUIDELINES.md, and the decomposition document set in the docs/features/ folder (AUTH, PRODUCT, SALES, CUSTOMER, INVOICE, EMPLOYEE, REPORT).

## 2. Technology Decisions
- Frontend: React library initialized with the Vite tool. Uses react-router-dom for page routing and CSS Modules for interface styling.
- Backend: Java Spring Boot 3 framework managed with Maven. Uses JDK 17.
- Database: Microsoft SQL Server management system.

## 3. Current System Status
- GitHub repository has been set up with separate frontend and backend directory structures.
- The AuraCoffeeDB database includes 6 tables: NHAN_VIEN, KHACH_HANG, DO_UONG, DANH_MUC, HOA_DON, and CHI_TIET_HOA_DON, which have been initialized on the local server.
- The centralized HTTP protocol configuration file apiClient.js has been pre-created in the frontend/src/api directory.
- The user is currently on a personal feature branch to begin creating source code.

## 4. Mandatory Requirements for the Artificial Intelligence System
- Act as a Full-stack programmer providing complete source code, explaining logic directly, and using no redundant wording.
- Strictly adhere to the Page-based Routing architecture rules for the frontend directory.
- Prohibited from creating individual network connection files or functions on its own. All HTTP protocol interactions must go through the existing configuration in the apiClient.js file.
- Prioritize using the Local State mechanism on top-level management screens and pass data through Props for the sales function interface logic.
- Beverage size surcharge logic and exact-match product aggregation logic in the shopping cart must follow the attached documentation.
- When requested to write source code, prioritize implementing the frontend directory or the backend directory sequentially to avoid system conflicts.
- **During work, if the AI needs to ask something not related to code (e.g., asking the user to check the server, run a script, confirm environment conditions), it is allowed to pause and ask the user immediately without permission.**

## INFORMATION VERIFICATION PROCESS BEFORE CODING

1. It is strictly prohibited to arbitrarily assume unclear information regarding software architecture, database, user interface, or business workflows.
2. For any source code generation request, the AI must analyze and cross-reference that request against system configuration files including AI_GUIDELINES.md and .clinerules.
3. If any technical gaps or ambiguities are detected, the AI must not generate source code immediately. The AI must stop and list clarifying questions in a numbered list format to the user.
4. The AI is only permitted to proceed with writing source code after the user has responded and provided sufficient information for the questions raised.
5. Technical aspects that must be clarified for every feature include:
   - Data structure and data flow between frontend and backend.
   - Security constraints and user authorization logic for the feature.
   - Navigation flow and user interface state changes after business logic execution.
   - Error handling mechanism, exception handling, and error message display format.
   - Impact of the new feature on existing source code components or systems.
6. **Mandatory requirement:** Before writing any code for a new feature, the AI must ask at least 3-5 business clarification questions to the user. Only code after the user has confirmed.
7. **Mandatory requirement:** After coding a feature (or a group of features), the AI must list all implemented business logic as a checklist for the user to review and confirm if it is correct.
8. **Mandatory requirement:** The AI must actively detect and update the rules files (.clinerules) and technical documentation (.md files in docs/) whenever new context, new business logic, or new rules arise during interaction with the user. Do not wait for the user to request it.

## INVOICE BUSINESS LOGIC (CLARIFIED)
- Invoices are **automatically created** when the employee clicks "Complete" in the Invoice popup after completing a sale.
- **Employee:** Can only view invoices they have created on the current day (Order Management feature - not yet coded).
- **Admin:** Cannot create invoices (does not have the Sales Management menu). Admin can view all invoices (entire time range) and can perform advanced search by date range (Order Management feature - not yet coded).
- Backend RBAC has blocked Admin from POST /api/hoa-don, and NhanVien from POST/PUT/PATCH/DELETE other management APIs.

## AUTOMATIC TECHNICAL DOCUMENTATION UPDATE PROCESS

1. During exchanges with the user, if the Agent and the user agree on new business logic, a new coding rule, or discover that current guidance documentation is incomplete, the Agent must perform the documentation update step.
2. The Agent must not ask the user to open files themselves to edit. The Agent must automatically analyze the newly agreed content and propose writing it directly into the corresponding .md or .clinerules file.
3. Before overwriting the file, the Agent must output the intended content changes to the screen for the user to confirm.
4. This process runs continuously to ensure project documentation always accurately reflects the existing source code structure.

## NON-FUNCTIONAL REQUIREMENTS (NFR)

### Performance
- Interface operation response time (add item, checkout) must be < 3 seconds under stable network conditions.
- The system handles smoothly with at least 5 concurrent users.
- Frontend prioritizes Local State + Props to reduce synchronization load (already applied at POS).
- Backend Spring Boot with default connection pool (HikariCP) supports 5+ concurrent users.

### Security
- All user passwords must be encrypted using BCrypt (already configured in SecurityBeansConfig).
- **Role-Based Access Control (RBAC)**: Backend API must check roles before processing requests.
  - GET /api/do-uong, /api/danh-muc, /api/khach-hang (lookup), /api/hoa-don (POS): Admin + NhanVien
  - POST/PUT/PATCH/DELETE management APIs: Admin only
  - POST /api/hoa-don: NhanVien only (Admin does not handle sales)
- Frontend route authorization via ProtectedRoute component (already implemented).

## DEBUG & ERROR HANDLING RULES

1. When debugging a frontend that does not display data (e.g., empty Products Area), the mandatory check process is:
   - Step 1: Is the backend server running? (curl localhost:8080)
   - Step 2: Is the API endpoint working and returning the correct data?
   - Step 3: Is error handling in the frontend silently swallowing errors (catch {...})? If so, add error state + error display UI.
   - Step 4: Does seed data exist in the database? (DataInitializer only seeds when count() == 0)
   - Step 5: Is the JWT token being sent with the request? (JwtAuthFilter requires Bearer token for /api/* except /api/auth/login)
2. Every catch block in the frontend must not be empty. It must include at least:
   - Store the error in error state.
   - Display an error message for the user.
   - Provide a "Refresh page" button to retry.
3. When suspecting an environment-related error (server not running, database not seeded, port occupied), the AI is allowed to pause and ask the user to check.

## RULES FOR INSTALLING/REMOVING LIBRARIES

1. After installing or removing npm libraries, **always delete the Vite cache** (the `node_modules/.vite` directory in `frontend/`) so Vite does not retain references to old modules.
2. Also check for and remove leftover modules in the root `node_modules` directory (at the workspace root `package.json` level) if any.
3. Then ask the user to re-run the `.bat` startup file to test.
4. **If changing npm libraries or configuration breaks the startup `.bat` files (start-frontend.bat, start-backend.bat), the AI must automatically update/fix these `.bat` files.**

## CLEANUP RULES AFTER FIXING ERRORS

1. After completing a fix (including debug, DB fix, code fix), the AI must delete generated files that were only used to support the debugging process, such as temporary SQL scripts, debug log files, notes files, etc.
2. The only files to be kept are:
   - Official source code (frontend/src, backend/src)
   - Official seed data SQL script (backend/scripts/seed-data.sql)
   - Technical documentation (docs/, .clinerules/)
   - Official build/deploy configuration files (pom.xml, package.json, start-*.bat, vite.config.js)
3. The AI must proactively perform cleanup without the user having to remind them.
4. If there is any doubt about whether to keep or delete a file, the AI asks the user for confirmation before deleting.

---

## LANGUAGE RULE FOR PROJECT DOCUMENTATION

**Important:** All content in this file and any other documentation files (.md files in docs/, .clinerules/) must be written in **English**. The project language for all technical documentation is English. Any future additions of new content, new rules, new business logic, or any other updates to these files must also be written in English. This ensures consistency and accessibility for the international open-source community.

## GIT COLLABORATION WORKFLOW

### Branch Strategy
- **Direct commits to `main` or `develop` branches are strictly prohibited.**
- All feature work must be developed on a feature branch branched out from `develop`.
- Branch naming convention: `feature/your-feature-name` (e.g., `feature/login`, `feature/sales-management`).
- After completing a feature, push the branch to remote and create a Pull Request to merge into `develop`.

### Pull Request Process
- Before merging, ensure the PR is reviewed by at least one other team member.
- The PR must pass all checks (if CI is configured).
- Squash-merge is recommended to keep the commit history clean.

### Local Setup for New Developers (AI-Automated)
- When a developer opens this project for the first time via Cline, the AI must:
  1. Check if `backend/src/main/resources/application.properties` exists.
  2. If NOT found, check if `backend/src/main/resources/application.properties.example` exists.
  3. If the example file exists, **copy it to `application.properties`** and update the `DB_USER`, `DB_PASSWORD`, `jwt.secret`, and SQL Server connection URL accordingly based on the developer's local environment.
  4. Ask the developer for their SQL Server credentials if needed, and update the file.
  5. This ensures every new team member can run the backend without manual configuration.

### Commit Message Convention (Conventional Commits)
All commit messages MUST follow the **Conventional Commits** specification:

The message structure when `git commit -m "type: message"` is executed:
- **feat**: A new feature (e.g., `feat: add login form UI`)
- **fix**: A bug fix (e.g., `fix: correct JWT token expiration check`)
- **chore**: Routine tasks, build config, dependencies (e.g., `chore: update pom.xml dependencies`)
- **docs**: Documentation changes (e.g., `docs: update README with setup instructions`)
- **refactor**: Code restructuring without changing behavior (e.g., `refactor: extract cart calculation logic`)
- **style**: Formatting, indentation, missing semicolons (no production code change)
- **test**: Adding or fixing tests (e.g., `test: add unit tests for AuthService`)
- **perf**: Performance improvements

Rules:
- Always use lowercase for the type.
- Keep the description concise (< 72 characters recommended).
- Use the imperative mood ("add" not "added" / "adds").
- If a commit relates to a specific scope, add it in parentheses (e.g., `feat(backend): add customer API endpoints`).

### Files That MUST NOT Be Committed
The following files are local environment-specific and MUST NOT be pushed to the repository. They are already listed in `.gitignore`:
- `backend/src/main/resources/application.properties` (contains local DB credentials and JWT secret)
- `frontend/.env` and `frontend/.env.*` (contains local API keys)
- `node_modules/`, `backend/target/` (build artifacts)

### VS Code Workspace Settings (`.vscode/`)
The `.vscode/` directory is included in the repository to ensure all team members share consistent editor configurations (formatting rules, tab size, linting, etc.). This prevents merge conflicts caused by different code formatting settings.

## GIT AUTOMATION RULES FOR AI (DEVELOPER-FRIENDLY)

Since most developers on this project have no Git background, the AI (Cline) **MUST proactively handle all Git operations** for them. Developers only need to describe what they want in plain language.

### General Rules
- The AI MUST NOT ask the developer to run Git commands manually.
- The AI MUST execute all Git operations itself using tool calls (execute_command).
- The AI MUST provide simple explanations of what was done after each operation.

### Branch Management (AI-Automated)
- When a developer says "start a new feature called [name]", the AI MUST:
  1. Run `git checkout develop`
  2. Run `git pull origin develop`
  3. Run `git checkout -b feature/[name]`
  4. Tell the developer: "Done! You are now on branch feature/[name]"

- When a developer says "push my code" or "commit my code", the AI MUST:
  1. Run `git add -A` to stage all changes
  2. Check what files were changed: `git status --short`
  3. Ask the developer what message to use (or suggest a Conventional Commits message based on the changes)
  4. Run `git commit -m "type: message"` using Conventional Commits format
  5. Run `git push origin [current-branch]`
  6. Tell the developer: "Done! Code pushed to [branch]. Link: [GitHub URL]"

- When a developer says "pull the latest code", the AI MUST:
  1. Determine the current branch: `git branch --show-current`
  2. Run `git stash` if there are uncommitted changes (to avoid conflicts)
  3. Run `git pull origin [current-branch]`
  4. Run `git stash pop` if stashed
  5. Tell the developer: "Done! Latest code pulled successfully."

- When a developer says "switch to [branch]" or "change branch to [branch]", the AI MUST:
  1. Run `git stash` if there are uncommitted changes
  2. Run `git checkout [branch-name]`
  3. Run `git stash pop` if stashed
  4. Tell the developer: "Done! Now on branch [branch-name]"

- When a developer says "create a Pull Request", the AI MUST:
  1. Run `git push origin [current-branch]` (ensure latest code is pushed)
  2. Use GitHub CLI or open the PR URL for the developer:
     - The AI provides the URL: `https://github.com/khactrinh25-stack/aura-coffee-management/pull/new/[current-branch]`
  3. Tell the developer: "Done! Go to this link to create the PR: [URL]. Select `develop` as the base branch."

- When a developer says "I want to merge my feature into develop", the AI MUST:
  1. Ensure all changes are committed and pushed: `git push origin [current-branch]`
  2. Switch to develop: `git checkout develop`
  3. Pull latest develop: `git pull origin develop`
  4. Merge the feature branch: `git merge [current-branch]`
  5. Push develop: `git push origin develop`
  6. Tell the developer: "Done! Feature merged into develop."

- When a developer says "sync my branch with develop" (to get latest changes), the AI MUST:
  1. Run `git stash` if there are uncommitted changes
  2. Run `git checkout develop`
  3. Run `git pull origin develop`
  4. Run `git checkout [original-branch]`
  5. Run `git merge develop`
  6. Resolve any merge conflicts by asking the developer for guidance
  7. Run `git stash pop` if stashed
  8. Tell the developer: "Done! Branch synced with latest develop."

### Important Git Safety Rules for AI
- Before running `git checkout`, always check for uncommitted changes first with `git status`.
- If there are uncommitted changes, run `git stash` first, then `git stash pop` after switching.
- Never use `git push --force` unless explicitly instructed by the developer.
- Always confirm destructive operations (reset, rebase, force push) with the developer before proceeding.
- After creating a new feature branch, remind the developer to tell Cline "push my code" when they want to commit.
