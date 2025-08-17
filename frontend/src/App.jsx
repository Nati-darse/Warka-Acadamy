import { Routes, Route } from "react-router-dom";
import Pages from "./pages";
import Navbar from "./components/navbar";
import BackToTop from "./components/ui/backToTop";
import DashboardPage from "./pages/dashboardPage.jsx";
import TeacherRoutes from "./pages/Teacher/TeacherRoutes.jsx";

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Pages.HomePage />} />
        <Route path="/signup" element={<Pages.SignupPage />} />
        <Route path="/login" element={<Pages.LoginPage />} />
        <Route path="/about" element={<Pages.AboutPage />} />
        <Route path="/livingStatus" element={<Pages.LivingSituationPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/student-dashboard" element={<DashboardPage />} />
        <Route path="/teacher/*" element={<TeacherRoutes />} />
        <Route path="/parent-dashboard" element={<DashboardPage />} />
        <Route path="/admin-dashboard" element={<DashboardPage />} />
      </Routes>
      <BackToTop />
    </div>
  );
}

export default App;
