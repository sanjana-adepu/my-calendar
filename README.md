
# 📅 My Calendar

A full-stack calendar web application built with **Vite.js**, **React**, **Node.js**, **Express**, **MySQL**, and **Material UI (MUI)**. It provides basic **CRUD** operations for managing events.

---

## 🚀 Features

- Add, View, Update, and Delete events
- MySQL backend integration
- Modular structure with separate frontend and backend
- Axios for HTTP requests
- Material UI for modern UI components
- Planned (but not implemented): 
  - Form validation
  - Responsive design

---

## 🛠 Tech Stack

### Frontend
- Vite.js
- React.js
- Axios
- MUI (Material-UI)

### Backend
- Node.js
- Express.js
- MySQL2
- CORS
- dotenv
- nodemon (dev)

---

## 📁 Project Structure

```
my-calendar/
├── my-calendar-backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── eventController.js
│   ├── routes/
│   │   └── eventRoutes.js
│   ├── index.js
│   ├── .env
│   └── package.json
├── src/
│   ├── components/
│   │   ├── AddEvent.jsx
│   │   ├── Calendar.jsx
│   │   ├── EventDetails.jsx
│   │   ├── EventsToday.jsx
│   │   ├── Home.jsx
│   │   ├── Registered.jsx
│   │   ├── RegisteredEvents.jsx
│   │   ├── Schedule.jsx
│   │   └── SearchBar.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/sanjana-adepu/my-calendar.git
cd my-calendar
```

### 2. Frontend Setup

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

### 3. Backend Setup

```bash
mkdir my-calendar-backend
cd my-calendar-backend
npm init -y
npm install express mysql2 cors dotenv
npm install --save-dev nodemon
```

Create `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=mycalendar
PORT=8081
```

Create the database and table in MySQL:

```sql
CREATE DATABASE IF NOT EXISTS mycalendar;

USE mycalendar;

CREATE TABLE IF NOT EXISTS events (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  location VARCHAR(255),
  color VARCHAR(50),
  PRIMARY KEY (id)
);


Run the backend server:

```bash
npx nodemon index.js
```

---

## 📌 Future Improvements

- ✅ Add form validation  
- ✅ Improve responsive design  
- ❌ Add authentication (optional)  
- 🔄 API integration for Search Bar and dropdown options

---

## 📸 Screenshots

- ![Create Event](image.png) – Creating a new event  
- ![Read Event](image-1.png) – Viewing event details  
- ![Update Event](image-2.png) – Editing an existing event  
- ![Delete Event](image-3.png) – Deleting an event  
- ![Calendar View](image-4.png) – Calendar display with today's highlights  
- ![Registered Events](image-5.png) – Viewing registered events via toggle

---

## 📄 License

This project is licensed under the MIT License.
