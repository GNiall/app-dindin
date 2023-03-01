import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Main from "./pages/Main/index";
import NotFound from "./components/notfound/NotFound";

function ProtectedRoutes({ redirectTo, token }) {
  const isAuthenticated = true;
  // localStorage.getItem("token") === token ? true : false;

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

function MainRoutes() {
  const [signinState, setSigninState] = useState({
    email: "",
    password: "",
    token: "",
    showPassword: false,
  });
  const [signupState, setSignupState] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmacaoSenha: "",
    showPassword: false,
  });

  const [stateMain, setStateMain] = useState({
    valor: "",
    categorias: [
      { id: 1, nome: "alimentação" },
      { id: 2, nome: "casa" },
      { id: 3, nome: "educação" },
      { id: 4, nome: "mercado" },
      { id: 5, nome: "alimentação" },
      { id: 6, nome: "casa" },
      { id: 7, nome: "educação" },
      { id: 8, nome: "mercado" },
    ],

    data: "",
    descrição: "",
    filtrar: false,
    resumo: {
      entrada: "25000",
      saida: "10000",
    },
  });
  return (
    <Routes>
      <Route
        path="/signin"
        element={<SignIn state={signinState} setState={setSigninState} />}
      />
      <Route
        path="/signup"
        element={<SignUp state={signupState} setState={setSignupState} />}
      />
      <Route
        element={
          <ProtectedRoutes redirectTo="/signin" token={signinState.token} />
        }
      >
        <Route
          path="/main"
          element={<Main state={stateMain} setState={setStateMain} />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default MainRoutes;
