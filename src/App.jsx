import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "./store/authSlice";
import { useEffect } from "react";

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
  }, [mode]);
  return (
    <>
      <div className="app bg-background-default *:px-24">
        <Router>
          <Routes>
            <Route
              path="/"
              element={isAuth ? <Navigate to={"/home"} /> : <LoginPage />}
            />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to={"/"} />}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
