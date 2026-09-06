# Subscription Tracker API

A RESTful backend API for managing user subscriptions and recurring bills.

This project was built as a backend development project to practice designing and developing APIs with TypeScript, Node.js, Express.js, and MongoDB.

## Features

User registration and authentication
JWT-based authentication
Password hashing
User management
Subscription creation and management
Subscription CRUD operations
Subscription cancellation
Role-based authorization
Request validation
Centralized error handling
MongoDB database integration
API security middleware
Rate limiting and bot protection with Arcjet
Environment-based configuration
API versioning
Tech Stack
Backend
TypeScript
Node.js
Express.js
Database
MongoDB
Mongoose
Authentication & Security
JSON Web Tokens (JWT)
bcrypt
Helmet
CORS
Arcjet
Development Tools
Git
GitHub
npm

## Project Structure

```
src/
├── config/
│ └── Environment configuration
│
├── controllers/
│ ├── auth.controller.ts
│ ├── subscription.controller.ts
│ └── user.controller.ts
│
├── database/
│ └── MongoDB connection
│
├── interfaces/
│ └── TypeScript interfaces and types
│
├── middlewares/
│ ├── Authentication
│ ├── Authorization
│ ├── Validation
│ ├── Error handling
│ └── API protection
│
├── models/
│ ├── User model
│ └── Subscription model
│
├── routes/
│ ├── Authentication routes
│ ├── User routes
│ └── Subscription routes
│
└── home.ts
```

# Getting Started

## Prerequisites

Before running the project, make sure you have:

Node.js installed
npm installed
Access to a MongoDB database

## Installation

Clone the repository:

git clone https://github.com/dengparek/subscription-tracker-api.git

Navigate into the project:

cd subscription_tracker_api

Install dependencies:

## npm install

## Environment Variables

Create a .env.development.local file in the project root.

Example:

NODE_ENV=development
PORT=5000

MONGO_URI=your_mongodb_connection_string
MONGO_DB_NAME=subscription_tracker_dev

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development

Do not commit environment files containing real credentials.

# Run in Development

npm run dev
Build the Project
npm run build
Run the Production Build
npm start
API

The API is versioned under:

/api/v1

## Authentication

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/v1/auth/sign-up`  | Create a user account |
| POST   | `/api/v1/auth/sign-in`  | Authenticate a user   |
| POST   | `/api/v1/auth/sign-out` | Sign out              |

## Users

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| GET    | `/api/v1/users`     | Retrieve users           |
| GET    | `/api/v1/users/:id` | Retrieve a specific user |

## Subscriptions

| Method | Endpoint                    | Description             |
| ------ | --------------------------- | ----------------------- |
| POST   | `/api/v1/subscriptions`     | Create a subscription   |
| GET    | `/api/v1/subscriptions`     | Retrieve subscriptions  |
| GET    | `/api/v1/subscriptions/:id` | Retrieve a subscription |
| PUT    | `/api/v1/subscriptions/:id` | Update a subscription   |
| DELETE | `/api/v1/subscriptions/:id` | Delete a subscription   |

The exact endpoint behavior and authorization requirements are documented in the source code and may depend on the authenticated user's role and ownership.

## Authentication

Protected endpoints use JWT-based authentication.

After successful authentication, the client receives an authentication token that can be supplied with protected requests.

Authorization: Bearer <token>

## Security

The project includes several security measures as part of the learning and development process:

Password hashing with bcrypt
JWT authentication
Role-based authorization
HTTP security headers with Helmet
CORS configuration
Request validation
Centralized error handling
Arcjet-based API protection
Environment variables for sensitive configuration
Learning Objectives

This project was developed to strengthen practical backend development skills, including:

REST API design
TypeScript application development
Express.js architecture
Authentication and authorization
MongoDB data modeling
Middleware design
Input validation
Error handling
API security
Environment configuration
Future Improvements

## Potential improvements include:

Automated unit and integration testing
API documentation with OpenAPI/Swagger
Improved subscription reminder functionality
Additional authorization rules
Production deployment
Continuous integration and deployment

## Author

**_Deng Parek_**

Self-taught software developer focused on building practical backend and full-stack applications while continuing to develop software engineering skills through independent projects.

GitHub:

**\*https://github.com/dengparek**
