import NavBar from "./components/NavBar/NavBar";
import MisTurnos from "./views/MisTurnosView/MisTurnos";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterFormView from "./views/RegisterFormView/RegisterFormView";
import AboutUs from "./views/AboutUsView/AboutUs";
import Appointments from "./components/Appointments/Appointments";
import Footer from "./components/Footer/Footer";
import Home from "./views/HomeView/Home"
import { Routes, Route, useLocation } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage/NorFoundPage";
import Profile from "./components/Profile/Profile";

function App() {
  const location = useLocation();

  return (
    <>
      { location.pathname !== "/" && location.pathname !== "/register" && location.pathname !== "/login" && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Appointments/>} />
        <Route path="/turnos" element={<MisTurnos/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterFormView/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
      <Footer />
    </> 
  );
}

export default App;
