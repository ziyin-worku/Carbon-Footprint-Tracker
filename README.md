# 🌍 Carbon Footprint Tracker

A full‑stack MERN application that helps individuals measure, visualize, and reduce their personal carbon footprint.  
Built to support **UN Sustainable Development Goal 13: Climate Action**.

---

## ✨ Features

- 🔐 **Authentication**: Register/Login with JWT (role‑based: user/admin)
- 📊 **Dashboard**: Visualize footprint breakdown (transport, electricity, food)
- 📅 **Reports**: Weekly/Monthly summaries with charts
- 🎯 **Pledges**: Commit to eco‑friendly actions and track progress
- 🏆 **Gamification**: Badges + streaks to encourage sustainable habits
- 🌐 **Leaderboard**: Compare footprint with community
- 🛡️ **Admin Panel**: Manage users, roles, and activities

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Axios
- Chart.js (react‑chartjs‑2)
- CSS (custom theme)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Dotenv for environment variables

---



---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/ziyin-worku/carbon-footprint-tracker.git
cd carbon-footprint-tracker

Backend setup

cd server
npm install
cp .env.example .env

Edit .env:
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<db>
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=super_long_random_string_here
TOKEN_EXPIRES=7d


Run backend:
npm run dev


Frontend setup

cd ../client
npm install
cp .env.example .env


Edit .env:
VITE_API_BASE=http://localhost:5000


Run frontend:
npm run dev


Open: http://localhost:5173

🔑 Usage
Register/Login with email + password.

Add activities (transport km, electricity kWh, meals).

View dashboard with breakdown + trend charts.

Create pledges and mark them complete.

Explore leaderboard and reports.

If admin, access Admin Panel to manage users/activities.




🌱 Vision
Together, we can make climate action personal.