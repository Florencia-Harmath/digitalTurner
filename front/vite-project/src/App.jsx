import NavBar from "./components/NavBar/NavBar";
import MisTurnos from "./views/MisTurnosView/MisTurnos";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterFormView from "./views/RegisterFormView/RegisterFormView";
import AboutUs from "./views/AboutUsView/AboutUs";
import Appointments from "./components/Appointments/Appointments";
import Footer from "./components/Footer/Footer";
import Home from "./views/HomeView/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage/NorFoundPage";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from "./redux/authSlice";
import PrivateRoute from "./PrivateRoute";


function App() {
  const location = useLocation();

  const dispatch = useDispatch();
  const { token, isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );

  if(user) console.log(user)
  
  useEffect(() => {
    if (token && !isAuthenticated) {
      dispatch(fetchUserData(token));
    }
  }, [token, isAuthenticated, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {location.pathname !== "/" &&
        location.pathname !== "/register" &&
        location.pathname !== "/login" && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/schedule"
          element={
            <PrivateRoute requiredRole="user">
              <Appointments />
            </PrivateRoute>
          }
        />
        <Route
          path="/turnos"
          element={
            <PrivateRoute requiredRole="user">
              <MisTurnos />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterFormView />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
