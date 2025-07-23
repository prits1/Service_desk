import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import RaiseTicket from "./pages/RaiseTicket";
import TicketDetails from "./pages/TicketDetails";
import Payment from "./pages/Payment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/raise-ticket" element={<RaiseTicket />} />
      <Route path="/ticket/:id" element={<TicketDetails />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}

export default App;
