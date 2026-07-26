import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
