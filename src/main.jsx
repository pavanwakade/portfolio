import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx';
import ProtectedRoute from './admin/ProtectedRoute.jsx';
import AdminLogin from './admin/AdminLogin.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />

          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          <Route path="/login" element={<AdminLogin />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </HelmetProvider>
  </StrictMode>,
)
