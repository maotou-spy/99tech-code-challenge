# User Management CRUD API

A robust REST API built with Node.js, Express.js, and TypeScript for managing user resources with full CRUD operations. The API integrates with Microsoft SQL Server for data persistence and provides basic filtering capabilities for user data.

- Complete CRUD operations for user management
- SQL Server integration for data persistence
- RESTful API design
- Environment-based configuration
- Basic filtering capabilities

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- Microsoft SQL Server
- Other dependencies (defined in package.json)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Microsoft SQL Server
- SQL Server Management Studio (SMSS)

## 🔧 Installation & Setup

1. **Database Setup**

   - Open SQL Server Management Studio
   - Connect to your SQL Server instance
   - Execute the `crude_server.sql` script or run the following script to create the database and import sample data.

   ```sql
    -- Run the SQL script
    CREATE DATABASE crude_server;
    GO

    USE crude_server;
    GO

    CREATE TABLE Users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        email NVARCHAR(100) NOT NULL UNIQUE,
        created_at DATETIME DEFAULT GETDATE()
    );
    GO

    -- Insert some sample data
    INSERT INTO Users (name, email) VALUES
        (N'John Doe', 'john@example.com'),
        (N'Jane Smith', 'jane@example.com');
    GO
   ```

2. **Environment Configuration**

   - Copy `.env.txt` to create a new `.env` file
   - Update the environment variables with your configuration:

   ```env
   PORT=3000           # Your preferred port number
   DB_HOST=localhost   # Your SQL Server host
   DB_USER=sa          # Your database username
   DB_PASS=******      # Your database password
   DB_PORT=1433        # Your SQL Server port
   DB_NAME=crude_server
   ```

3. **Project Setup**

   ```bash
   # Clone the repository (if using Git)
   git clone https://github.com/maotou-spy/99tech-code-challenge.git

   # Navigate to project directory
   cd ./src/problem5

   # Install dependencies
   npm install

   # Build TypeScript
   npm run build

   # Start the server
   npm start
   ```

## 🚀 API Endpoints

### User Resources

| Method | Endpoint          | Description                       |
| ------ | ----------------- | --------------------------------- |
| GET    | /api/v1/users     | List all users with basic filters |
| GET    | /api/v1/users/:id | Get user details by ID            |
| POST   | /api/v1/users     | Create a new user                 |
| PUT    | /api/v1/users/:id | Update user details               |
| DELETE | /api/v1/users/:id | Delete a user                     |

# User Management CRUD API

A robust REST API built with Node.js, Express.js, and TypeScript for managing user resources with full CRUD operations. This project demonstrates best practices in building scalable backend services with type safety and SQL Server integration.

## 🚀 Features

- Complete CRUD operations for user management
- Type-safe development with TypeScript
- SQL Server integration for data persistence
- RESTful API design
- Environment-based configuration
- Basic filtering capabilities

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- Microsoft SQL Server
- Other dependencies (defined in package.json)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Microsoft SQL Server
- SQL Server Management Studio (SMSS)

## 🔧 Installation & Setup

1. **Database Setup**

   - Open SQL Server Management Studio
   - Connect to your SQL Server instance
   - Execute the `crude_server.sql` script to create the database and import sample data

   ```sql
   -- Run the SQL script
   USE crude_server.sql
   ```

2. **Environment Configuration**

   - Copy `.env.txt` to create a new `.env` file
   - Update the environment variables with your configuration:

   ```env
   PORT=3000           # Your preferred port number
   DB_HOST=localhost   # Your SQL Server host
   DB_USER=sa         # Your database username
   DB_PASS=******     # Your database password
   DB_PORT=1433       # Your SQL Server port
   DB_NAME=crude_server
   ```

3. **Project Setup**

   ```bash
   # Clone the repository (if using Git)
   git clone <repository-url>

   # Navigate to project directory
   cd user-management-api

   # Install dependencies
   npm install

   # Build TypeScript
   npm run build

   # Start the server
   npm start
   ```

## 🚀 API Endpoints

### User Resources

| Method | Endpoint       | Description                       |
| ------ | -------------- | --------------------------------- |
| GET    | /api/users     | List all users with basic filters |
| GET    | /api/users/:id | Get user details by ID            |
| POST   | /api/users     | Create a new user                 |
| PUT    | /api/users/:id | Update user details               |
| DELETE | /api/users/:id | Delete a user                     |

### Filter Parameters for GET /api/v1/users

| Parameter | Description                          | Example         |
| --------- | ------------------------------------ | --------------- |
| keyword   | Search in both name and email fields | `?keyword=john` |
| orderBy   | Field to sort by (any table column)  | `?orderBy=name` |
| sort      | Sort direction ('asc' or 'desc')     | `?sort=desc`    |

### Request Examples

#### Create User

```http
POST /api/v1/users
Content-Type: application/json

{
  "name": "Nguyen Van A",
  "email": "nguyenvana@example.com"
}
```

## 📦 Project Structure

```
problem5/
├── node_modules/       # Dependencies
├── src/
│   ├── config/
│   │   └── database.ts    # Database configuration
│   ├── controllers/
│   │   └── user.controller.ts    # User-related controllers
│   ├── models/
│   │   └── user.model.ts    # User data model
│   ├── repositories/
│   │   └── user.repository.ts    # User data access layer
│   ├── routes/
│   │   └── user.route.ts    # User route definitions
│   └── app.ts         # Main application file
├── .env               # Environment variables
├── .gitignore         # Git ignore rules
├── .keep              # Git directory placeholder
├── crude_server.sql   # Database initialization script
├── package-lock.json  # Locked dependencies
├── package.json       # Project configuration and dependencies
└── tsconfig.json      # TypeScript configuration
```
