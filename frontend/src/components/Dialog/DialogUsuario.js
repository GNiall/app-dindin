import { useState } from "react";
import close from "../../assets/close.png";
import "./style.dialog.css";

export default function DialogEditar() {
  const [state, setState] = useState({});

  return (
    <dialog className="dialog-usuario">
      <div className="container-dialog">
        <img
          className="img-close"
          onClick={() => {
            document.querySelector(".dialog-usuario").close();
          }}
          src={close}
          alt="close"
        />

        <h1>Editar Perfil </h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label>
            Nome
            <input
              name="nome"
              type="text"
              value={state.nome && ""}
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
              value={state.email && ""}
              onChange={(event) =>
                setState({ ...state, [event.target.name]: event.target.value })
              }
            />
          </label>
          <label>
            Senha
            <input
              name="senha"
              type="text"
              value={state.senha && ""}
              onChange={(event) =>
                setState({ ...state, [event.target.name]: event.target.value })
              }
            />
          </label>
          <label>
            Confirmação Senha
            <input
              name="confirmacaosenha"
              type="text"
              value={state.confirmacaosenha && ""}
              onChange={(event) =>
                setState({ ...state, [event.target.name]: event.target.value })
              }
            />
          </label>
          <button className="btn-confirmar">Confirmar</button>
        </form>
      </div>
    </dialog>
  );
}
