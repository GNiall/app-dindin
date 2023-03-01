import { Link, useNavigate } from "react-router-dom";
import instanceAxios from "../../service";

function SignUp({ state, setState }) {
  const navigate = useNavigate();

  const { nome, email, senha, confirmacaoSenha, showPassword, mensagem } =
    state;

  return (
    <div className="container-signup">
      <form
        className="form-signup"
        onSubmit={async (event) => {
          event.preventDefault();
          if (
            nome === "" ||
            email === "" ||
            senha === "" ||
            confirmacaoSenha === ""
          ) {
            setState({ ...state, mensagem: "Preencha todos os campos!" });
          } else if (senha !== confirmacaoSenha) {
            setState({ ...state, mensagem: "Senha invalida" });
          }
          const { data } = await instanceAxios.post("/usuarios", {
            nome: nome,
            email: email,
            senha: senha,
          });
          setState({
            ...state,
            nome: "",
            email: "",
            senha: "",
            confirmacaoSenha: "",
            mensagem: "",
          });

          if (data) setTimeout(navigate("/signin"), 5000);
        }}
      >
        <h1>Cadastro</h1>

        <label>
          <p>Nome</p>
          <input
            name="nome"
            type="Nome"
            className="input"
            value={nome}
            onChange={(event) =>
              setState({ ...state, [event.target.name]: event.target.value })
            }
          />
        </label>
        <label>
          <p> E-mail</p>
          <input
            name="email"
            type="email"
            className="input"
            value={email}
            onChange={(event) =>
              setState({ ...state, [event.target.name]: event.target.value })
            }
          />
        </label>
        <label>
          <p>Senha</p>
          <input
            name="senha"
            type={!showPassword ? "password" : "text"}
            className="input password"
            value={senha}
            onChange={(event) =>
              setState({ ...state, [event.target.name]: event.target.value })
            }
          />
        </label>
        <label>
          <p> Confirmar senha</p>
          <input
            name="confirmacaoSenha"
            type={!showPassword ? "password" : "text"}
            className="input password"
            value={confirmacaoSenha}
            onChange={(event) =>
              setState({ ...state, [event.target.name]: event.target.value })
            }
          />
        </label>

        <span>
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

        {mensagem ? <span className="alert-signup">{mensagem}</span> : ""}

        <button type="submit" className="btn-cadastrar">
          Cadastrar
        </button>
      </form>

      <h2 className="tem-cadastro">
        Já tem cadastro?
        <Link to={"/signin"}>Clique aqui</Link>
      </h2>
    </div>
  );
}

export default SignUp;
