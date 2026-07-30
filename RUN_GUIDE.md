# Dream Events Booking Website - Startup Guide

This document describes how to launch both the Spring Boot REST API backend and the React SPA client locally.

---

## 1. Prerequisites

- **Java SDK**: Version 21.
- **Node.js**: Version 18+.
- **Database**: PostgreSQL database. Set up a database named `dreamevents`.
  - Alternatively, if you do not have PostgreSQL installed locally, you can change the connection details in [application-dev.yml](file:///c:/Users/shash/OneDrive/Desktop/Projects/EventManagment/dream-events-backend/src/main/resources/application-dev.yml) to use an H2 database or Docker container instance.

---

## 2. Launch the Backend API

1. Navigate to the backend directory:
   ```bash
   cd dream-events-backend
   ```
2. Set up your database credentials or environments (e.g. `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`).
3. Run the Spring Boot application using Maven:
   ```bash
   mvn spring-boot:run
   ```
   - The API server will start on port **`8080`**.
   - Database tables will be automatically created by Hibernate, and seeded with default categories, packages, testimonials, and contact details via `data.sql`.
   - Swagger API Documentation will be accessible at: `http://localhost:8080/swagger-ui/index.html`

---

## 3. Launch the Frontend Client

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd dream-events-frontend
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   - The application will boot up at **`http://localhost:5173`**.
   - The development server is pre-configured to proxy all requests starting with `/api` to the Spring Boot API running on port `8080`.

---

## 4. Default Admin Credentials

- **Sign In page**: `http://localhost:5173/admin/login`
- **Username**: `admin`
- **Password**: `AdminPass123!`
