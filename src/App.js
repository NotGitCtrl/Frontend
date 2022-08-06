import "./App.css";
import SignUpStepper from "./Components/Stepper/Stepper";
import Login from "./pages/auth/Login";
import Profile from "./Components/Profile/Profile";
import ForgotPass from "./pages/auth/ForgotPass";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Countries from "./pages/dashboard/Countries";
import States from "./pages/dashboard/States";
import Districts from "./pages/dashboard/Districts";

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
        <Route path="/dashboard/countries" element={<Countries />} />
        <Route path="/dashboard/states" element={<States />} />
        <Route path="/dashboard/districts" element={<Districts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
