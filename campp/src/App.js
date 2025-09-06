import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MentorDashboard from './pages/MentorDashboard'; // Import MentorDashboard
import Courses from './pages/Courses';
import Mentors from './pages/Mentors';
import Jobs from './pages/Jobs';
import Events from './pages/Events';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 200px)' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardRouter />
                  </ProtectedRoute>
                }
              />
              <Route path="/courses" element={<Courses />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/events" element={<Events />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPanel />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

// Component to handle dashboard routing based on user role
const DashboardRouter = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Should ideally be handled by ProtectedRoute, but good for a fallback
    return null;
  }

  if (currentUser.role === 'mentor') {
    return <MentorDashboard />;
  } else {
    return <Dashboard />;
  }
};

export default App;
