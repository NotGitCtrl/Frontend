import "./App.css";
import SignUpStepper from "./Components/Stepper/Stepper";
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
import Schemes from "./pages/Schemes";
import Transactions from "./pages/Transactions";
import Phases from "./pages/Phases";
import Projects from "./pages/Projects";
import Reports from "./pages/Reports";
import InviteMember from "./pages/InviteMember";
import ProjectDetail from "./pages/ProjectDetail";
import LandingPage from "./pages/LandingPage";
import ProjectProposal from "./pages/ProjectProposals";
import SolutionList from "./pages/FAViewSolutions";
import SubmitSolution from "./pages/HeiSubmitSolution";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="signup" element={<SignUpStepper />} />
        {/* <Route path="login" element={<Login />} /> */}
        <Route path="profile" element={<Profile />} />
        <Route path="forgot-password" element={<ForgotPass />} />
        <Route path="invite-member" element={<InviteMember />} />
        <Route path="/project-detail/:id" element={<ProjectDetail />} />
        <Route path="/solution-list/:id" element={<SolutionList />} />
        <Route path="/dashboard/projects/:id" element={<SubmitSolution />} />

        <Route path="/dashboard">
          <Route path="countries" element={<Countries />} />
          <Route path="states" element={<States />} />
          <Route path="districts" element={<Districts />} />
          <Route path="streams" element={<Streams />} />
          <Route path="universities" element={<Universities />} />
          <Route path="schemes" element={<Schemes />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="phases" element={<Phases />} />
          <Route path="projects" element={<Projects />} />
          <Route path="proposals" element={<ProjectProposal />} />
          
          <Route path="reports" element={<Reports />} />
        </Route>

        <Route path="/admin/hei" element={<Hei />} />
        <Route path="/admin/fa" element={<FA />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
