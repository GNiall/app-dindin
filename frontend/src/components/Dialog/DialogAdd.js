import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import close from "../../assets/close.png";
import { createTransaction, loadCategories } from "../../functions/requisicoes";
import "./style.dialog.css";

export default function DialogAdd({ state, setState }) {
  const ref = useRef("");
  const navigate = useNavigate();
  const { descricao, valor, dataTransacao } = state;
  useEffect(() => {
    createTransaction(state, setState);
    loadCategories(state, setState);
  }, []);
  return (
    <dialog className="dialog-add" ref={ref}>
      <div className="container-dialog">
        <img
          className="img-close"
          onClick={() => {
            setState({
              ...state,
              tipo: "saida",
              entradaSelecinada: false,
              saidaSelecionada: true,
            });
            ref.current.close();
          }}
          src={close}
          alt="close"
        />

        <h1>Adicionar Registro </h1>

        <form
          onSubmit={async (event) => {
            event.preventDefault();
            document.querySelectorAll("option").forEach((element) => {
              if (element.selected && element.id > 0) {
                createTransaction(state, setState, element.id);
              }
              return;
            });

            setState({
              ...state,
              descricao: "",
              valor: "",
              dataTransacao: "",
              categoriaId: "",
              tipo: "saida",
              saidaSelecionada: true,
              entradaSelecinada: false,
            });
            navigate("/");
            ref.current.close();
          }}
        >
          <div className="container-botoes-entrada-saida">
            <button
              type="button"
              className={
                state.entradaSelecinada ? "btn-entrada entrada " : "btn-entrada"
              }
              name="Entrada"
              onClick={() => {
                setState({
                  ...state,
                  tipo: "entrada",
                  entradaSelecinada: true,
                  saidaSelecionada: false,
                });
              }}
            >
              Entrada
            </button>

            <button
              onClick={() => {
                setState({
                  ...state,
                  tipo: "saida",
                  entradaSelecinada: false,
                  saidaSelecionada: true,
                });
              }}
              type="button"
              className={
                state.saidaSelecionada ? "btn-saida saida " : "btn-saida"
              }
            >
              Saida
            </button>
          </div>
          <label>
            valor
            <input
              name="valor"
              type="number"
              value={valor}
              onChange={(event) =>
                setState({ ...state, [event.target.name]: event.target.value })
              }
            />
          </label>
          <label>
            categoria
            <select>
              <option value="empty"></option>
              {state.categorias.map((categoria) => {
                return (
                  <option
                    key={categoria.id}
                    id={categoria.id}
                    value={categoria.descricao}
                  >
                    {categoria.descricao}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            data
            <input
              name="dataTransacao"
              type="date"
              value={dataTransacao}
              onChange={(event) => {
                setState({ ...state, [event.target.name]: event.target.value });
              }}
            />
          </label>
          <label>
            descrição
            <input
              name="descricao"
              type="text"
              value={descricao}
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
