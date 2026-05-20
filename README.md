# Aura Coffee - Take-Away Operations Management Software

A robust, enterprise-grade web application designed to streamline point-of-sale operations, optimize counter workflows, and ensure precise transaction handling for take-away coffee shops.

## Tech Stack & Infrastructure
- **Frontend:** React library hosted on Vercel.
- **Backend:** Java Spring Boot framework with Hibernate and Spring Data JPA, deployed on Render Web Services.
- **Database:** Microsoft SQL Server hosted on Somee.

## System Architecture
The system adopts a decoupled Client-Server architecture interacting via RESTful APIs:
- **Frontend Layer:** Built with a responsive grid system optimizing user interaction across desktops, laptops, and tablets.
- **Backend Layer:** Implements the Model-View-Controller pattern to isolate business logic, data models, and request routing.

## Core Git Workflow & Collaboration Rules
To ensure seamless collaboration among 7 full-stack developers, the following rules apply:
1. **Branching Strategy:** Direct commits to the main or develop branches are strictly prohibited. Developers must branch out from develop using the naming convention: feature/your-feature-name.
2. **Page-Based Isolation:** Frontend codebase follows a strict page-based routing mechanism. Developers must isolate their files and UI components inside their designated domain folders to eliminate merge conflicts.
3. **AI Assistance Constraints:** Every team member must feed the AI_GUIDELINES.md file into their AI models before generating any code snippet to preserve system consistency.