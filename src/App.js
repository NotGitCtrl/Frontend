import "./App.css";
import SignUpStepper from "./Components/Stepper/Stepper";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import ForgotPass from "./Components/ForgotPassword/ForgotPass";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // return <ForgotPass />;
  // return <Login />;
  // return <SignUpStepper />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpStepper />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="forgot-password" element={<ForgotPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
