import "./App.css";
import SignUpStepper from "./Components/Stepper/Stepper";
import Login from "./Components/Login/Login";
import ForgotPass from "./Components/ForgotPassword/ForgotPass";
import ReactDOM from "react-dom/client";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
