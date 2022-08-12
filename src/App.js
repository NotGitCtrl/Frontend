import "./App.css";
import SignUpStepper from "./Components/Stepper/Stepper";
import Login from "./pages/auth/Login";
import Profile from "./Components/Profile/Profile";
import ForgotPass from "./pages/auth/ForgotPass";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Countries from "./pages/baseTables/Countries";
import States from "./pages/baseTables/States";
import Districts from "./pages/baseTables/Districts";
import Streams from "./pages/baseTables/Streams";
import Universities from "./pages/baseTables/Universities";
import Hei from "./pages/Hei";
import FA from "./pages/FA";

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
        <Route path="/dashboard/streams" element={<Streams />} />
        <Route path="/dashboard/universities" element={<Universities />} />

        <Route path="/admin/hei" element={<Hei />} />
        <Route path="/admin/fa" element={<FA />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
