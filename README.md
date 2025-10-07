# 📌 Priority Matrix

> A to-do list app inspired by Stephen Covey’s Priority Matrix, helping users organize tasks by urgency and importance with an intuitive drag-and-drop interface. 

---

## 🚀 Live Demo  
[View Project](https://priority-matrix.netlify.app/)

---

## ✨ Features  
- User authentication with Google SSO for secure, streamlined sign-in
- Drag-and-drop task management for intuitive organization across priority quadrants
- Persistent task storage using Local Storage for quick access without requiring login

---

## 🛠️ Tech Stack  
- **Frontend:** React, JavaScript, Bootstrap, DnD Kit
- **Backend:** Firebase
- **Database:** Firebase 
- **Hosting:** Netlify (frontend), Firebase (backend/database)  

---

## 📸 Screenshots  
![Screenshot 1](https://ethanstewart.dev/mockups/prioritymatrix_mockup_dark.svg) 

---

## ⚡ Getting Started (React + Vite)

Clone the repo:  
```bash
git clone https://github.com/estewart35/PriorityMatrix.git
cd PriorityMatrix
```

Install dependencies and run locally:
```bash
npm install
npm run dev
```

Create a `.env` file in the project root and add the required environment variables:
```bash
# .env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```
*(Refer to `.env.example` if included in the repo for variable names.)*
