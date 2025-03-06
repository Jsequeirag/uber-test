import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Parameters from "./pages/Parameters/Parameters";
import Branches from "./pages/Branches/Branches";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import BottomNav from "./components/Navbar/BottomNavbar.jsx";
import { OpenCloseMenu } from "./utils/responsiveFunctions.js";
import { useEffect } from "react";

import FilterTable from "./components/tables/FilterOrderTable/FilterTable.jsx";
import GetRequest from "./pages/GetRequest/GetRequest.jsx";

function App() {
  useEffect(() => {
    OpenCloseMenu();
  }, []);
  let location = useLocation().pathname;
  /*Rutas protegidas, valida si hay un usuario en el localhost*/
  let storeUser = localStorage.getItem("storeUser");

  const ProtectedRoute = ({ storeUser, redirectPath = "/login" }) => {
    if (!storeUser) {
      return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  };
  //SI ES EXISTE UN USUARIO LOGUEADO
  const LoginSaved = ({ storeUser, redirectPath = "/home" }) => {
    if (storeUser) {
      return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  };
  return (
    <>
      {location === "/login" ? null : <Navbar />}
      <Routes>
        <Route element={<LoginSaved storeUser={storeUser} />}>
          <Route path="/login" element={<Login />}></Route>
        </Route>
        <Route element={<ProtectedRoute storeUser={storeUser} />}>
          <Route path="/home" element={<Dashboard />}></Route>
          <Route path="/parameters" element={<Parameters />}></Route>
          <Route path="/branches" element={<Branches />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/profile" element={<Profile />}></Route>{" "}
          <Route path="/filterOrder" element={<FilterTable />}></Route>{" "}
          <Route path="/getRequest" element={<GetRequest />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" />}></Route>
      </Routes>

      <Footer />
      {location === "/login" ? null : <BottomNav />}
    </>
  );
}

export default App;
