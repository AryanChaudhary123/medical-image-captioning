import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ImageUpload from "./pages/ImageUpload"; // Import as named export
import { AuthProvider } from "./context/AuthContext"; // Import as named export
import ProfileDashboard from "./pages/ProfileDashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <>
                  <ProfileDashboard />
                  <Routes>
                    <Route path="/upload" element={<ImageUpload />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Navigate to="/upload" replace />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;