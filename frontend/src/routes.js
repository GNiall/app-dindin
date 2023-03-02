import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Main from "./pages/Main/index";
import NotFound from "./components/Notfound/NotFound";

function ProtectedRoutes() {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to={"/sign-in"} />;
}
function RedirectRoute() {
  const isAuthenticated = !localStorage.getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to={"/main"} />;
}

function MainRoutes() {
  return (
    <Routes>
      <Route element={<RedirectRoute />}>
        <Route path="/" element={<SignIn />}>
        </Route>
          <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/main" element={<Main />} />
      </Route>
      <Route path="/*" element={<NotFound/>}/>
    </Routes>
  );
}

export default MainRoutes;
