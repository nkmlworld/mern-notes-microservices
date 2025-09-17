# MERN Notes Microservices (PoC)

A **production-style MERN application** built with **microservices architecture**:
- **Auth Service** → user registration & login with JWT
- **Notes Service** → CRUD notes (tags, comments, sharing coming soon)
- **API Gateway** → central entry point, routing, security

This project is built for **learning full-stack MERN + industry practices**:
- Microservices architecture
- Secure APIs (JWT, Helmet, CORS, Rate limiting)
- MongoDB schema design
- Git workflow (branches, PRs)
- Testing (Jest, Supertest, React Testing Library)
- DevOps basics (Docker, CI/CD)

---

## 🚀 Project Structure
mern-notes-microservices/
│
├── gateway/ # API Gateway
│ └── server.js
│
├── services/
│ ├── auth/ # Auth service (register/login)
│ │ ├── models/user.js
│ │ └── server.js
│ │
│ └── notes/ # Notes service (CRUD notes)
│ ├── models/note.js
│ └── server.js
│
├── package.json # Root (concurrently starts all services)
├── README.md
└── .gitignore


---

## 🛠️ Setup & Installation

### 1. Clone repo
```bash
git clone https://github.com/<your-username>/mern-notes-microservices.git
cd mern-notes-microservices

2. Install dependencies

Root (for concurrently):

npm install
Each service:

cd gateway && npm install
cd ../services/auth && npm install
cd ../notes && npm install

3. Run MongoDB

Make sure MongoDB is running locally on mongodb://127.0.0.1:27017.

4. Start all services

From project root:

npm run dev


Gateway → http://localhost:3000

Auth → http://localhost:4000

Notes → http://localhost:5000

🔐 Auth API (via Gateway)
Register
POST /api/auth/register

{
  "username": "test",
  "email": "test@example.com",
  "password": "pass123"
}

Login
POST /api/auth/login


Returns JWT token.

📝 Notes API (via Gateway, JWT required)
Create Note
POST /api/notes/notes
Authorization: Bearer <token>

{
  "userId": "<userId from Auth DB>",
  "title": "My first note",
  "content": "Learning MERN CRUD!",
  "tags": ["learning", "mern"]
}

Get Notes
GET /api/notes/notes/<userId>
Authorization: Bearer <token>

📌 Roadmap

 Auth service with JWT

 Notes CRUD

 API Gateway with JWT protection

 Comments & sharing

 Frontend (React)

 Unit tests (Jest, Supertest, RTL)

 Dockerize services

 GitHub Actions CI/CD

👩‍💻 Git Workflow

main → stable code

feature/* → new features

fix/* → bug fixes

Create PRs for merging into main

📜 License

MIT

