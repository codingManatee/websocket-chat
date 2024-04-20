import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import MessageContainer from "./components/messages/MessageContainer";
import ThemeToggle from "./components/theme/ThemeToggle";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <ThemeToggle />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/room/:conversationId"
          element={authUser ? <MessageContainer /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
