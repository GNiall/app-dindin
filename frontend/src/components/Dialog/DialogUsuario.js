import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import closeIcon from "../../assets/close.png";
import { editUser } from "../../functions/requisicoes";
import "./style.dialog.css";

export default function UserDialog({ state, setState }) {
  const navigate = useNavigate();
  useEffect(() => {
    editUser(state, setState);
  }, []);
  return (
    <dialog className="dialog-usuario">
      <div className="container-dialog">
        <img
          className="img-close"
          onClick={() => {
            document.querySelector(".dialog-usuario").close();
          }}
          src={closeIcon}
          alt="close"
        />

        <h1>Edit Profile</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (
              state.nome === "" ||
              state.email === "" ||
              state.senha === "" ||
              state.confirmarSenha === ""
            ) {
              return;
            }
            localStorage.setItem("nome", state.nome);
            editUser(state, setState);
            document.querySelector(".dialog-usuario").close();
            navigate("/");
          }}
        >
          <label>
            Nome
            <input
              name="nome"
              type="text"
              value={state.nome}
              onChange={(event) =>
                setState({ ...state, [event.target.name]: event.target.value })
              }
            />
          </label>

          <label>
            E-mail
            <input
              name="email"
              type="text"
              value={state.email}
              onChange={(event) =>
                setState({ ...state, [event.target.name]: event.target.value })
              }
            />
          </label>
          <label>
            Senha
            <input
              name="senha"
              type="password"
              value={state.senha}
              onChange={(event) =>
                setState({ ...state, [event.target.name]: event.target.value })
              }
            />
          </label>
          <label>
            Confirmar Senha
            <input
              name="confirmarSenha"
              type="password"
              value={state.confirmarSenha}
              onChange={(event) =>
                setState({ ...state, [event.target.name]: event.target.value })
              }
            />
          </label>
          <button type="submit" className="btn-confirmar">
            confirmar
          </button>
        </form>
      </div>
    </dialog>
  );
}
