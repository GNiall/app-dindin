import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import instanceAxios from "../../service/index";
import "./styles.signin.css";
function SignIn() {
  const [state, setState] = useState({
    email: "",
    password: "",
    showPassword: false,
    mensagem:""
  });
  const { email, senha, showPassword, mensagem } = state;
  const navigate = useNavigate();

  return (
    <div className="container-signin">
      <img className="logo" src={logo} alt="logo" />
      <div className="container-texto">
        <h1>
          Controle suas <b>finanças</b>,<br />
          sem planilha chata.
        </h1>
        <span>
          Organizar as suas finanças nunca foi tão fácil,
          <br /> com o DINDIN, você tem tudo num único lugar
          <br /> e em um clique de distância.
        </span>
        <button onClick={() => navigate("/sign-up")}>Cadastre-se</button>
      </div>

      <div className="container-form-signin">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (email === "" || senha === "") {
              setState({ ...state, mensagem: "Preencha todos os campos!" });
              return;
            }
            try {
              const { data } = await instanceAxios.post("/login", {
                email: email,
                senha: senha,
              });
              localStorage.setItem("token", data.token);
              localStorage.setItem("nome", data.usuarioLogado.nome);
              localStorage.setItem("id", data.usuarioLogado.id);
              setState({
                ...state,
                email: "",
                senha: "",
              });

              navigate("/main");
            } catch (error) {
              if (
                error.message.includes(`Request failed with status code 400`)
              ) {
                setState({ ...state, mensagem: "Email/Senha invalido" });
                return;
              }

              console.log(error.message);
            }
          }}
        >
          <strong>Login</strong>
          <label>
            <p>E-mail</p>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email ?? ""}
              onChange={(event) =>
                setState({ ...state, email: event.target.value })
              }
            />
          </label>

          <label>
            <p>Senha</p>
            <input
              type={!showPassword ? "password" : "text"}
              className="input password"
              name="senha"
              placeholder="Senha"
              value={senha ?? ""}
              onChange={(event) =>
                setState({ ...state, senha: event.target.value })
              }
            />
          </label>
          <span className="container-checkbox">
            <input
              onClick={(event) => {
                if (event.target.checked) {
                  setState({ ...state, showPassword: true });
                } else {
                  setState({ ...state, showPassword: false });
                }
              }}
              style={{ width: "30px" }}
              type="checkbox"
            />
            Exibir Senha
          </span>

          <button className="login" type="submit">
            Login
          </button>
          {mensagem ? <span className="alert-signin">{mensagem}</span> : ""}
        </form>
      </div>
    </div>
  );
}

export default SignIn;
