# AuthStudent - Modern Authentication System

A full-featured authentication system with role-based access control built with React, Redux Toolkit, and Tailwind CSS.

## 🎨 Features

### Authentication
- **User Registration** - Create account with username, password, and role selection
- **User Login** - Secure JWT-based authentication
- **Protected Routes** - Automatic redirect for unauthenticated users
- **Persistent Sessions** - Token stored in localStorage and Redux

### Role-Based Access Control
- **Student Role**
  - View all students in the system
  - Access to student dashboard
  
- **Teacher Role**
  - All student permissions
  - View all users (students + teachers)
  - Promote students to teacher role
  - Delete user accounts
  - Full user management capabilities

### UI/UX
- **Modern Design** - Beautiful gradient backgrounds and smooth animations
- **Responsive Layout** - Works on all devices (mobile, tablet, desktop)
- **Interactive Components** - Hover effects, loading states, and transitions
- **Alert System** - Success and error notifications
- **Intuitive Navigation** - Easy-to-use interface

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server

## 📁 Project Structure

```
client/
├── src/
│   ├── api/
│   │   └── axios.js                 # Axios instance with JWT interceptor
│   ├── components/
│   │   └── ProtectedRoute.jsx       # Route wrapper for authentication
│   ├── pages/
│   │   ├── Home.jsx                 # Landing page
│   │   ├── Login.jsx                # Login page
│   │   ├── Register.jsx             # Registration page
│   │   └── Dashboard.jsx            # Main dashboard (role-based)
│   ├── store/
│   │   ├── store.js                 # Redux store configuration
│   │   └── authSlice.js             # Auth state management
│   ├── App.jsx                      # Main app component with routing
│   ├── main.jsx                     # App entry point
│   └── index.css                    # Tailwind CSS imports
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure API URL**
   
   Update the base URL in `src/api/axios.js` if your backend runs on a different port:
   ```javascript
   baseURL: 'http://localhost:5000/api'
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   
   Navigate to `http://localhost:5173`

## 📡 API Endpoints

The frontend expects the following backend endpoints:

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User Routes (Protected)
- `GET /api/user/students` - Get all students (Student + Teacher)
- `GET /api/user` - Get all users (Teacher only)
- `PUT /api/user/promote/:id` - Promote student to teacher (Teacher only)
- `DELETE /api/user/:id` - Delete user (Teacher only)

## 🎯 How It Works

### 1. Authentication Flow
1. User registers with username, password, and role
2. Password is hashed on backend using bcrypt
3. User logs in with credentials
4. Backend returns JWT token and user data
5. Token stored in localStorage and Redux store
6. Axios automatically attaches token to all requests

### 2. Authorization Flow
1. Middleware verifies JWT token on protected routes
2. User role determines accessible features
3. Teachers have additional management capabilities
4. Students have limited access to view-only features

### 3. State Management
- **Redux Toolkit** manages auth state globally
- **localStorage** persists session across page refreshes
- Automatic logout on token expiration (401 response)
- Seamless state synchronization

## 🎨 Color Scheme

The application uses a modern color palette:

- **Primary**: Indigo (600-700) - Main actions and branding
- **Secondary**: Purple (600-700) - Accents and secondary actions
- **Success**: Green (600-700) - Success messages and confirmations
- **Error**: Red (600-700) - Error states and delete actions
- **Background**: Gradient combinations of indigo, purple, blue, and pink

## 📱 Pages

### Home Page (`/`)
- Landing page with feature showcase
- Call-to-action buttons for login/register
- Responsive hero section

### Register Page (`/register`)
- Username input
- Password input with confirmation
- Role selection (Student/Teacher)
- Form validation
- Redirect to login on success

### Login Page (`/login`)
- Username and password inputs
- Loading state during authentication
- Error message display
- Redirect to dashboard on success

### Dashboard Page (`/dashboard`)
**Student View:**
- List of all students
- User profile information
- Logout functionality

**Teacher View:**
- All student features plus:
- Full user management table
- Promote student button
- Delete user button
- Action confirmations

## 🔒 Security Features

1. **JWT Token** - Secure authentication
2. **Password Hashing** - bcrypt on backend
3. **Protected Routes** - Client-side route guards
4. **Automatic Logout** - On token expiration
5. **CORS Handling** - Cross-origin request security

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📝 Environment Variables

Create a `.env` file if you need to customize:

```env
VITE_API_URL=http://localhost:5000/api
```

Then update `src/api/axios.js`:
```javascript
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
```

## 🐛 Troubleshooting

### Issue: Can't connect to backend
- Ensure backend is running on `http://localhost:5000`
- Check CORS settings on backend
- Verify API URL in `src/api/axios.js`

### Issue: Token not persisting
- Check browser localStorage
- Clear cache and cookies
- Ensure Redux store is properly configured

### Issue: Protected routes not working
- Verify token is in localStorage
- Check Redux auth state
- Ensure ProtectedRoute component is wrapping routes

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build output will be in the `dist` folder, ready to deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📄 License

MIT License - feel free to use this project for learning or production.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ using React, Redux Toolkit, and Tailwind CSS
