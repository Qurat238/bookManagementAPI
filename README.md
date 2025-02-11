# 📚 Book Management API

## Overview
The **Book Management API** is a RESTful API built with **Node.js, Express, and MongoDB**.  
It allows users to manage a collection of books with authentication and CRUD functionalities.

---

## 🚀 Features
- **User Authentication** (Register, Login, Logout)
- **JWT Authentication** for securing endpoints
- **CRUD Operations** for managing books
- **Protected Routes** (Only authenticated users can perform actions)

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Token (JWT)
- **Validation:** Express Validator

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```
git clone https://github.com/Qurat238/bookManagementAPI.git
cd bookManagementAPI
```

### 2️⃣ Install Dependencies
```
npm install
```

### 3️⃣ Configure Environment Variables  
Edit environment variables **config.env** file in config folder. Edit **MONGO_URI** and **JWT_SECRET**

```
PORT=4000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
COOKIE_EXPIRE=1d
```

### 4️⃣ Start the Server
```
npm start
```
The API will run at: **http://localhost:4000**

---

## 📚 API Endpoints

### 🔒 Authentication Routes

#### ✅ Register a User
- **URL:** `POST /api/v1/users/register`
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "success": true,
  "user": {
    "_id": "123456",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password(hashed)",
  },
  "token":"your-jwt-token"
}
```

#### ✅ Login User
- **URL:** `POST /api/v1/users/login`
- **Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "success": true,
   "user": {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password(hashed)",
    "_id": "123456",
  },
  "token": "your-jwt-token"
}
```

#### ✅ Logout User
- **URL:** `GET /api/v1/users/logout`
- **Response:**
```json
{
  "success": true,
  "message": "Logged Out"
}
```

---

### 📚 Book Routes (Protected)

#### 📌 Add a New Book
- **URL:** `POST /api/v1/books`
- **Headers:** `{ Authorization: "Bearer your-jwt-token" }`
- **Request Body:**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishedDate": "1925-04-10",
  "numberOfPages": 180
}
```
- **Response:**
```json
{
  "success": true,
  "message":"Book created successfully",
  "book": {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publishedDate": "1925-04-10",
    "numberOfPages": 180,
    "createdBy":"user-id-here",
    "id": "123456",
  }
}
```

#### 📌 Get All Books
- **URL:** `GET /api/v1/books`
- **Headers:** `{ Authorization: "Bearer your-jwt-token" }`
- **Response:**
```json
{
  "success": true,
  "books": [
    {
      "id": "123456",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald"
      "publishedDate": "1925-04-10",
      "numberOfPages": 180,
    }
  ]
}
```

#### 📌 Get a Book by ID
- **URL:** `GET /api/v1/books/{id}`
- **Headers:** `{ Authorization: "Bearer your-jwt-token" }`
- **Response:**
```json
{
  "success": true,
  "book": {
    "id": "123456",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publishedDate": "1925-04-10",
    "numberOfPages": 180,
  }
}
```

#### 📌 Update a Book
- **URL:** `PUT /api/v1/books/{id}`
- **Headers:** `{ Authorization: "Bearer your-jwt-token" }`
- **Request Body (example of updating title & pages):**
```json
{
  "title": "The Great Gatsby - Updated Edition",
  "numberOfPages": 200
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Book Updated Successfully",
  "book": {
    "id": "123456",
    "title": "The Great Gatsby - Updated Edition",
    "author": "F. Scott Fitzgerald",
    "publishedDate": "1925-04-10",
    "numberOfPages": 200
  }
}
```

#### 📌 Delete a Book
- **URL:** `DELETE /api/v1/books/{id}`
- **Headers:** `{ Authorization: "Bearer your-jwt-token" }`
- **Response:**
```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

---

## 🛠 Tools Used
- **Express.js** – Web framework for Node.js
- **MongoDB + Mongoose** – Database & ODM
- **jsonwebtoken** – For user authentication
- **dotenv** – Environment variable management
- **bcryptjs** – Password hashing
- **express-validator** – Data validation

---

## 🐜 License
This project is **open-source** under the **MIT License**.

---

## 🤝 Contributing
Feel free to fork this repository and submit **pull requests**. Contributions are always welcome!

---

