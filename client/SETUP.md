# Quick Setup Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Backend URL
Edit `src/api/axios.js` and update the baseURL if your backend runs on a different port:
```javascript
baseURL: 'http://localhost:5000/api', // Change this if needed
```

### Step 3: Run Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

---

## 📋 Prerequisites Checklist

- [ ] Node.js installed (v16+)
- [ ] Backend API running
- [ ] Backend running on `http://localhost:5000` (or update axios.js)
- [ ] CORS enabled on backend for `http://localhost:5173`

---

## 🔧 Backend CORS Configuration

Your backend needs to allow requests from the frontend. Add this to your backend:

**Express.js Example:**
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

---

## 📝 Test Accounts

After starting both frontend and backend:

1. **Create a Student Account:**
   - Go to Register page
   - Username: `student1`
   - Password: `123456`
   - Role: Student
   - Click "Create Account"

2. **Create a Teacher Account:**
   - Go to Register page
   - Username: `teacher1`
   - Password: `123456`
   - Role: Teacher
   - Click "Create Account"

3. **Login and Test:**
   - Login as `student1` → See students list
   - Login as `teacher1` → See all users + management controls

---

## 🎯 Feature Testing Checklist

### As Student:
- [ ] Register new account
- [ ] Login successfully
- [ ] View students list
- [ ] See personal info in header
- [ ] Logout

### As Teacher:
- [ ] Register teacher account
- [ ] Login successfully
- [ ] View students list
- [ ] View all users table
- [ ] Promote a student to teacher
- [ ] Delete a user
- [ ] Logout

---

## ❌ Common Issues

### "Network Error" when logging in
**Solution:** Ensure backend is running and CORS is configured

### "401 Unauthorized" on protected routes
**Solution:** Check that JWT token is being sent in headers

### Pages are blank
**Solution:** Open browser console (F12) to see errors

### Token not persisting after refresh
**Solution:** Check that localStorage is not blocked in browser

---

## 🌐 URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Login:** http://localhost:5173/login
- **Register:** http://localhost:5173/register
- **Dashboard:** http://localhost:5173/dashboard

---

## 📦 Tech Stack

- React 19 + Vite
- Redux Toolkit
- React Router DOM v6
- Axios
- Tailwind CSS v4

---

## 🎨 Pages Overview

1. **Home (/)** - Landing page with features
2. **Register (/register)** - Create new account
3. **Login (/login)** - Sign in to existing account
4. **Dashboard (/dashboard)** - Main app (role-based)

---

## 🔐 Authentication Flow

```
Register → Backend saves user → Redirect to Login
         ↓
Login → Backend returns JWT + user data → Store in Redux + localStorage
         ↓
Dashboard → Axios adds token to headers → Access protected routes
         ↓
Logout → Clear Redux + localStorage → Redirect to Login
```

---

## 💡 Tips

- Use Chrome DevTools (F12) → Network tab to debug API calls
- Check Redux DevTools extension to see state changes
- Use localStorage inspector to verify token storage
- Test with multiple browser tabs to see role differences

---

## 🆘 Need Help?

1. Check browser console for errors
2. Verify backend is running: `http://localhost:5000/api/auth/login`
3. Clear localStorage and try again
4. Restart both frontend and backend servers

---

Happy coding! 🚀
