import { useRef } from "react";
import close from "../../assets/close.png";
import "./style.dialog.css";
export default function DialogEditar({ state, setState }) {
  const ref = useRef("");

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
          <button>Entrada</button>
          <button>Saida</button>
        </span>
        <form>
          <label>
            valor
            <input
              name="valor"
              type="number"
              value={state.valor}
              onChange={(event) =>
                setState({ ...state, [event.target.name]: event.target.value })
              }
            />
          </label>
          <label>
            categoria
            <select>
              <option value="empty">Selecione uma categoria</option>
              {state.categorias ? (
                state.categorias.map((categoria) => {
                  return (
                    <option key={categoria.id} value={categoria.nome}>
                      {categoria.nome}
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
              type="date"
              value={state.data}
              onChange={(event) =>
                setState({ ...state, [event.target.name]: event.target.value })
              }
            />
          </label>
          <label>
            descrição
            <input
              name="descrição"
              type="text"
              value={state.descrição}
              onChange={(event) =>
                setState({ ...state, [event.target.name]: event.target.value })
              }
            />
          </label>
          <button>Confirmar</button>
        </form>
      </div>
    </dialog>
  );
}
