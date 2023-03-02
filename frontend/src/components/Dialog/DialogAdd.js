import { useRef, useState } from "react";
import close from "../../assets/close.png";
import "./style.dialog.css";

export default function DialogAdd() {
  const ref = useRef("");
  const [state, setState] = useState({});

  return (
    <dialog ref={ref}>
      <div className="container-dialog">
        <img
          className="img-close"
          onClick={() => {
            ref.current.close();
          }}
          src={close}
          alt="close"
        />

        <h1>Adicionar Registro </h1>
        <span className="container-btn-registros">
          <button type="button" className="btn-entrada">
            Entrada
          </button>
          <button type="button" className="btn-saida">
            Saida
          </button>
        </span>
        <form>
          <label>
            valor
            <input
              name="valor"
              type="number"
              value={state.valor && ""}
              onChange={(event) =>
                setState({ ...state, [event.target.name]: event.target.value })
              }
            />
          </label>
          <label>
            categoria
            <select>
              <option value="empty"></option>
              {state.categorias ? (
                state.categorias.map((categoria) => {
                  return (
                    <option key={categoria.id} value={categoria.nome}>
                      {categoria.nome && ""}
                    </option>
                  );
                })
              ) : (
                <></>
              )}
            </select>
          </label>
          <label>
            data
            <input
              name="data"
              type="text"
              value={state.data && ""}
              onChange={(event) =>
                setState({ ...state, [event.target.name]: event.target.value })
              }
            />
          </label>
          <label>
            descrição
            <input
              name="descricao"
              type="text"
              value={state.descricao && ""}
              onChange={(event) =>
                setState({ ...state, [event.target.name]: event.target.value })
              }
            />
          </label>
          <button className="btn-confirmar" type="submit">
            Confirmar
          </button>
        </form>
      </div>
    </dialog>
  );
}
