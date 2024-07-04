import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "./store/authSlice";
import { useEffect } from "react";
import AlertSystem from "./components/AlertSystem";
import Logout from "./pages/Logout";
import Settings from "./pages/Settings";
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.auth.mode);
  const isAuth = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (mode) {
      document.body.className = mode;
      console.log("Mode selected by user", mode);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.className = "dark";
      console.log("Mode selected by system");
      dispatch(setMode());
    } else {
      document.body.className = "light";
      console.log("Mode selected by system");
    }
  }, [mode, isAuth]);

  return (
    <>
      <div className="app bg-background-default min-h-full *:px-3 sm:*:px-5 md:*:px-10 lg:*:px-16">
        <AlertSystem />
        <Router>
          {isAuth && <Header />}
          <Routes>
            <Route
              path="/"
              element={isAuth ? <Navigate to={"/home"} /> : <LoginPage />}
            />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to={"/"} />}
            />
            <Route path="/profile/editprofile" element={<Settings />} />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to={"/"} />}
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
