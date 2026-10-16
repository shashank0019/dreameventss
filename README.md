# 🎉 Dream Events — Event Management & Booking Platform

<p align="center">
  <strong>Plan Beautiful Moments. Create Unforgettable Memories.</strong>
</p>

<p align="center">
  A full-stack event decoration and booking platform built with React, Spring Boot, Java 21, and PostgreSQL.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java 21" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.3.2-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Authentication-JWT-black?style=flat-square&logo=jsonwebtokens" alt="JWT Authentication" />
  <img src="https://img.shields.io/badge/Media-Cloudinary-blue?style=flat-square&logo=cloudinary" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/Deployment-Vercel-black?style=flat-square&logo=vercel" alt="Vercel" />
  <img src="https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render&logoColor=black" alt="Render" />
</p>

---

## 📌 Overview

**Dream Events** is a full-stack event management and booking application designed to simplify how customers discover event decoration services, explore packages, and submit booking requests.

The platform provides a modern customer-facing website alongside a secure administration dashboard. Customers can browse event packages, explore galleries, view testimonials, and submit booking requests with optional reference attachments. Administrators can manage bookings, packages, services, categories, gallery images, testimonials, and contact information from a centralized dashboard.

This project demonstrates practical full-stack development, REST API design, database management, authentication, file uploads, and deployment architecture.

## ✨ Key Features

### 👤 Customer Experience

- 🏠 Responsive homepage showcasing event services and featured packages.
- 🎊 Browse event packages with pricing, descriptions, tiers, and images.
- 🔎 Search, filter, sort, and paginate package listings.
- 🖼️ Explore event galleries and customer testimonials.
- 📅 Submit booking requests with event details and guest information.
- 📎 Upload optional reference images or event briefs.
- 📩 Receive booking submission feedback and access a success page.
- 📱 Access business contact details and social or WhatsApp links.

### 🔐 Admin Dashboard

- 🔑 JWT-based administrator authentication.
- 📊 Dashboard statistics for bookings, statuses, revenue, and recent activity.
- 📋 Search, filter, and paginate booking records.
- 🔄 Update booking statuses: Pending, Approved, Completed, or Cancelled.
- 📦 Create, update, and delete event packages.
- 🗂️ Manage categories and services.
- 🖼️ Upload and manage gallery images and package media.
- ⭐ Manage customer testimonials.
- ⚙️ Update public contact and business information.
- ☁️ Manage associated Cloudinary media assets.

### 🛡️ Backend Capabilities

- RESTful API architecture.
- Server-side request validation.
- BCrypt password hashing.
- JWT authentication and role-based authorization.
- PostgreSQL persistence through Spring Data JPA and Hibernate.
- Centralized exception handling.
- Multipart file upload support.
- Cloudinary media storage.
- Email notifications for new bookings.
- Pagination and optional search/filter queries.
- Swagger UI and OpenAPI documentation.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, JavaScript, JSX |
| Build Tool | Vite |
| Styling | Tailwind CSS, CSS |
| Routing | React Router DOM |
| API Communication | Axios |
| Form Management | React Hook Form, Zod |
| Animations | Framer Motion |
| Backend | Java 21, Spring Boot 3.3.2 |
| Security | Spring Security, JJWT |
| Database | PostgreSQL |
| ORM | Spring Data JPA, Hibernate |
| Validation | Jakarta Bean Validation |
| Media Storage | Cloudinary |
| Email | Spring Mail |
| API Documentation | Springdoc OpenAPI, Swagger UI |
| Deployment | Vercel, Render, Docker |
| Database Hosting | Supabase or another PostgreSQL provider |

## 🏗️ System Architecture

```text
                   ┌──────────────────────┐
                   │   Customer / Admin   │
                   │       Browser        │
                   └──────────┬───────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │    React Frontend    │
                   │   Vite + Tailwind    │
                   └──────────┬───────────┘
                              │
                         Axios / REST
                              │
                              ▼
                   ┌──────────────────────┐
                   │ Spring Boot REST API │
                   │ Java 21 + Security   │
                   └──────────┬───────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
      ┌──────────────┐ ┌─────────────┐ ┌──────────────┐
      │ PostgreSQL   │ │ Cloudinary  │ │ SMTP Server  │
      │ Business Data│ │ Media Files │ │ Notifications│
      └──────────────┘ └─────────────┘ └──────────────┘

      Frontend Hosting: Vercel
      Backend Hosting:  Render / Docker
```

### 🔄 How the Booking Process Works

1. The customer selects an event package and completes the booking form.
2. The frontend validates the submitted data and sends a multipart request.
3. The backend validates the request and checks whether the selected package exists.
4. An optional attachment is uploaded to Cloudinary.
5. The booking is persisted in PostgreSQL with `PENDING` status.
6. An owner notification email is triggered.
7. The API returns a booking response.
8. The customer is redirected to the booking success page.

### 🔒 How Admin Authentication Works

1. The administrator submits login credentials.
2. Spring Security verifies the credentials against the stored admin account.
3. The backend generates a signed JWT.
4. The frontend includes the token in protected API requests.
5. The JWT authentication filter validates the token and establishes the security context.
6. Spring Security enforces administrator access on protected API endpoints.

**Important:** Frontend route protection improves navigation, but backend authorization is responsible for securing administrative operations.

## 🗄️ Database Design

The application uses PostgreSQL to store structured business data.

| Entity | Responsibility |
|---|---|
| `Admin` | Administrator credentials and role |
| `Category` | Event and package categories |
| `Package` | Event package details, pricing, tier, and status |
| `PackageImage` | Images associated with event packages |
| `Booking` | Customer information and event booking requests |
| `Service` | Decoration services and descriptions |
| `Gallery` | Event portfolio images and metadata |
| `Testimonial` | Customer feedback and reviews |
| `ContactInfo` | Public contact and business information |

### 🔗 Key Relationships

- One category can contain multiple packages.
- Each package belongs to a category.
- One package can have multiple images.
- Each booking references one package.
- PostgreSQL stores structured data and Cloudinary stores media files.
- Cloudinary URLs and public IDs are stored to support image display and asset deletion.

## 🌐 REST API Overview

All API endpoints use the `/api` prefix.

### 🔓 Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticate an administrator |
| `GET` | `/api/categories` | Retrieve categories |
| `GET` | `/api/packages` | Retrieve packages with search and pagination |
| `GET` | `/api/packages/{id}` | Retrieve package details |
| `GET` | `/api/packages/{id}/related` | Retrieve related packages |
| `GET` | `/api/services` | Retrieve public services |
| `GET` | `/api/gallery` | Retrieve gallery content |
| `GET` | `/api/testimonials` | Retrieve testimonials |
| `GET` | `/api/contact-info` | Retrieve contact information |
| `POST` | `/api/bookings` | Submit a booking request |

### 🔐 Admin Endpoints

All endpoints below require a valid JWT and administrator authorization.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/dashboard` | Retrieve dashboard statistics |
| `GET` | `/api/admin/bookings` | Search and paginate bookings |
| `GET` | `/api/admin/bookings/{id}` | Retrieve booking details |
| `PATCH` | `/api/admin/bookings/{id}/status` | Update booking status |
| `DELETE` | `/api/admin/bookings/{id}` | Delete a booking |
| `POST / PUT / DELETE` | `/api/admin/categories` | Manage categories |
| `POST / PUT / DELETE` | `/api/admin/packages` | Manage packages |
| `PATCH` | `/api/admin/packages/{id}/status` | Update package status |
| `POST / PUT / DELETE` | `/api/admin/services` | Manage services |
| `POST / DELETE` | `/api/admin/gallery` | Manage gallery content |
| `POST / PUT / DELETE` | `/api/admin/testimonials` | Manage testimonials |
| `PUT` | `/api/admin/contact-info` | Update contact information |

For the complete request and response schemas, use the Swagger UI endpoint when the backend is running.

## 📂 Project Structure

```text
Dream-Events/
│
├── dream-events-frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── dream-events-backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── .../
│   │   │   │       ├── controller/
│   │   │   │       ├── dto/
│   │   │   │       ├── entity/
│   │   │   │       ├── exception/
│   │   │   │       ├── mapper/
│   │   │   │       ├── repository/
│   │   │   │       ├── security/
│   │   │   │       └── service/
│   │   │   └── resources/
│   │   └── test/
│   ├── Dockerfile
│   └── pom.xml
│
└── README.md
```

*The structure above illustrates the logical organization; adjust directory names to match the actual repository.*

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Install the following:

- Java Development Kit (JDK) 21
- Maven
- Node.js 18 or newer
- PostgreSQL
- Git
- A Cloudinary account for media uploads
- SMTP credentials for email notifications

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_REPOSITORY_FOLDER>
```

Replace the placeholders with your actual GitHub repository URL and folder name.

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd dream-events-backend
```

Configure the required environment variables:

```properties
SPRING_PROFILES_ACTIVE=local

SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/dream_events
SPRING_DATASOURCE_USERNAME=your_db_username
SPRING_DATASOURCE_PASSWORD=your_db_password

JWT_SECRET=your_strong_generated_secret

ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_admin_password
ADMIN_EMAIL=your_admin_email

OWNER_NOTIFICATION_EMAIL=your_notification_email

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Ensure the database exists and your application's configuration reads these variables. Set up any required email and media credentials before testing those features.

Start the backend:

```bash
mvn spring-boot:run
```

### 3. Configure the Frontend

Open a new terminal:

```bash
cd dream-events-frontend
npm install
```

Create a `.env` file if required by your configuration:

```env
VITE_API_URL=http://localhost:8080/api
```

If your local setup uses the Vite development proxy, follow the existing proxy configuration instead.

Start the frontend:

```bash
npm run dev
```

### 4. Open the Application

| Resource | Local URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8080 |
| Swagger UI | http://localhost:8080/swagger-ui/index.html |
| Admin Login | http://localhost:5173/admin/login |

**Note:** Administrator account initialization depends on your backend configuration. Use the credentials configured for your local environment.

## ☁️ Deployment

The project is designed around the following deployment architecture:

| Component | Platform | Purpose |
|---|---|---|
| Frontend | Vercel | Build and serve the React application |
| Backend | Render with Docker | Run the Spring Boot REST API |
| Database | Supabase or another PostgreSQL provider | Store business records |
| Media | Cloudinary | Store and deliver uploaded images |
| Email | Configured SMTP provider | Send booking notifications |

### Deployment Checklist

- [ ] Configure all environment variables in the hosting providers.
- [ ] Set the frontend API URL to the deployed backend.
- [ ] Configure CORS to allow the deployed frontend origin.
- [ ] Confirm database connectivity and schema initialization.
- [ ] Configure Cloudinary credentials.
- [ ] Configure SMTP credentials and notification email.
- [ ] Verify public routes and protected admin routes.
- [ ] Test booking creation and optional attachment uploads.
- [ ] Verify frontend routing and backend health.
- [ ] Ensure no secrets are committed to GitHub.

## 🛡️ Security Considerations

Security is an important part of the application architecture.

- Passwords are stored using BCrypt hashing.
- JWT authentication protects administrative API requests.
- Spring Security enforces authorization on the backend.
- Request validation helps prevent invalid booking data.
- Environment variables are used for sensitive configuration.
- Production deployments should use HTTPS and restricted CORS.
- Login and public booking endpoints should have rate limiting and abuse protection.
- File uploads should be validated for type, size, and content.
- Production database schema changes should use versioned migrations such as Flyway or Liquibase.

Never publish real database passwords, JWT secrets, admin credentials, SMTP credentials, or Cloudinary secrets in the repository.

## 🧠 Engineering Decisions

### Why React and Spring Boot?

React supports reusable UI components and responsive customer experiences, while Spring Boot provides a structured backend for REST APIs, business logic, authentication, and persistence.

### Why PostgreSQL?

PostgreSQL provides relational integrity and reliable structured storage for packages, bookings, categories, and associated records.

### Why JWT?

JWT supports stateless authentication and avoids maintaining a server-side HTTP session for every administrator. Token expiration, revocation, and secure storage remain important considerations.

### Why DTOs?

DTOs separate API requests and responses from database entities, improve validation, and help prevent accidental exposure of persistence details.

### Why Cloudinary?

Cloudinary handles media storage and delivery while PostgreSQL stores metadata and references. Keeping media outside the relational database avoids storing large image binaries directly in database records.

### Why Pagination and Filtering?

Pagination reduces response sizes as booking records grow. Optional search and status filters help administrators locate relevant records efficiently.

## 🔮 Future Improvements

- [ ] Add comprehensive unit, integration, and end-to-end tests.
- [ ] Introduce Flyway or Liquibase database migrations.
- [ ] Add refresh-token rotation and token revocation.
- [ ] Implement rate limiting and stronger abuse protection.
- [ ] Improve file-upload validation and private attachment handling.
- [ ] Add a queue or transactional outbox for reliable email delivery.
- [ ] Add booking audit history and explicit status-transition rules.
- [ ] Add database indexes for frequently queried fields.
- [ ] Introduce structured logging, metrics, and monitoring.
- [ ] Improve accessibility and performance optimization.
- [ ] Add automated deployment and testing workflows with GitHub Actions.

## 💼 Resume Highlights

- Developed a full-stack event management and booking platform using React, Java 21, Spring Boot, PostgreSQL, and REST APIs.
- Implemented JWT-secured administrative workflows for booking management and content administration.
- Integrated Cloudinary for media uploads and Spring Mail for booking notifications.
- Designed searchable and paginated booking management with dashboard statistics.
- Configured a deployment architecture using Vercel, Render/Docker, PostgreSQL, and environment-based configuration.

## 👨‍💻 Developer

**Shashank CF**

Full-stack development project focused on modern web technologies, REST API architecture, secure authentication, database design, and practical business workflows.

---

<p align="center">
  <strong>Dream Events — Turning Special Moments Into Lasting Memories ✨</strong>
</p>

<p align="center">
  ⭐ If you find this project interesting, consider giving the repository a star!
</p>
