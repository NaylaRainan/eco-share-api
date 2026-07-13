# 🌱 EcoShare

> **EcoShare** adalah aplikasi penyewaan barang berbasis web yang dikembangkan menggunakan **Vue.js**, **Express.js**, **Sequelize**, dan **MySQL**.  
Aplikasi ini menerapkan **JWT Authentication** dan **Role Based Access Control (RBAC)** sehingga setiap pengguna memiliki hak akses sesuai perannya.

---

## ✨ Features

### 🔐 Authentication
- Register
- Login
- JWT Authentication
- Role Based Access Control (RBAC)

### 👤 Owner
- Dashboard
- CRUD Item
- Melihat daftar rental
- Approve Rental
- Finish Rental
- Melihat total pendapatan
- Melihat jumlah item
- Melihat jumlah rental
- Melihat pending rental

### 🙋 Renter
- Dashboard
- Melihat daftar item
- Mengajukan rental
- Melihat total rental
- Melihat rental aktif
- Melihat rental terakhir

---

# 🛠 Tech Stack

| Frontend | Backend | Database |
|----------|----------|----------|
| Vue 3 | Node.js | MySQL |
| Vite | Express.js | Sequelize ORM |
| Vue Router | JWT | |
| Pinia | bcrypt | |
| Axios | REST API | |
| Bootstrap 5 | | |

---

# 📁 Project Structure

```text
eco-share
│
├── backend
│   ├── config
│   ├── migrations
│   ├── models
│   ├── src
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── routes
│   │   ├── services
│   │   └── app.js
│   └── package.json
│
└── frontend
    ├── src
    │   ├── api
    │   ├── router
    │   ├── services
    │   ├── stores
    │   ├── views
    │   ├── components
    │   └── App.vue
    └── package.json
```

---

# 🗄 Database

### Main Tables

- Users
- Items
- Rentals
- RentalHistories

### Database Relationship

```text
Owner (User)
      │
      ▼
    Items
      │
      ▼
   Rentals
      ▲
      │
Renter (User)
```

---

# 🚀 Installation

## 1. Clone Repository

```bash
git clone https://github.com/NaylaRainan/eco-share-api.git
```

---

## 2. Backend Setup

```bash
cd backend

npm install

npx sequelize db:create

npx sequelize db:migrate

npm start
```

Backend running at:

```
http://localhost:3000
```

---

## 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend running at:

```
http://localhost:5173
```

---

# 👥 User Roles

| Role | Description |
|------|-------------|
| 👤 Owner | Mengelola item dan memproses rental |
| 🙋 Renter | Melakukan penyewaan barang |

---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint |
|--------|----------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |

---

## Dashboard

| Method | Endpoint |
|--------|----------|
| GET | `/api/dashboard` |

---

## Items

| Method | Endpoint |
|--------|----------|
| GET | `/api/items` |
| GET | `/api/items/:id` |
| POST | `/api/items` |
| PUT | `/api/items/:id` |
| DELETE | `/api/items/:id` |

---

## Rentals

| Method | Endpoint |
|--------|----------|
| GET | `/api/rentals` |
| POST | `/api/rentals` |
| PUT | `/api/rentals/:id/status` |

---

# 📸 Application Flow

### Owner

```text
Login
   │
   ▼
Dashboard
   │
   ▼
CRUD Item
   │
   ▼
Approve Rental
   │
   ▼
Finish Rental
```

### Renter

```text
Login
   │
   ▼
Dashboard
   │
   ▼
Browse Items
   │
   ▼
Create Rental
   │
   ▼
Waiting Approval
```

---

# 🔒 Authentication

EcoShare menggunakan **JSON Web Token (JWT)**.

Setelah login berhasil, server akan mengembalikan token yang digunakan untuk mengakses endpoint yang memerlukan autentikasi.

---

# 👩‍💻 Author

**Nayla Raina Nazhirah**  
NIM: **411231018**

Project UAS — **Fullstack Web Development**