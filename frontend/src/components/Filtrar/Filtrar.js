import Table from "../Table/Table";
import icone from "../../assets/icons8-filtro-48 1.png";
import "./style.css";
import plus from "../../assets/plus.png";
import { useEffect } from "react";
import { loadCategories, loadTransactions } from "../../functions/requisicoes";

export default function Filtrar({
  state,
  setState,
  stateTransacoes,
  setStateTransacoes,
  stateDialogEditar,
  setStateDialogEditar,
}) {
  const { categorias } = state;
  let arrayTransacaoFiltrado = [];
  useEffect(() => {
    loadCategories(state, setState);
  }, []);
  return (
    <>
      <span
        className="span-container-filtrar"
        onClick={() => {
          if (state.filtrar === false) {
            setState({ ...state, filtrar: true });
          } else {
            setState({ ...state, filtrar: false });
          }
        }}
      >
        <img src={icone} alt="filtrar" />
        filtrar
      </span>
      <section className="section-container-filtrar">
        {state.filtrar ? (
          <div className="container-filtrar">
            <h1>Categorias</h1>
            <section className="container-btn-categoria">
              {categorias.map((categoria) => {
                return (
                  <span
                    key={categoria.id}
                    className={`btn-filtrar-categoria  selecionado-span${categoria.id} `}
                    onClick={(event) => {
                      const span = document.querySelector(
                        `.selecionado-span${categoria.id}`
                      );

                      if (
                        event.type === "click" &&
                        span.style.background !== "rgb(121, 120, 217)"
                      ) {
                        span.style.color = "white";
                        span.style.background = "#7978D9";
                        span.style.boxShadow =
                          "0px 2px 11px rgba(0, 0, 0, 0.1)";
                        span.style.borderRadius = "10px";
                        arrayTransacaoFiltrado.push(categoria.descricao);
                      } else if (
                        event.type === "click" &&
                        span.style.background === "rgb(121, 120, 217)"
                      ) {
                        const novoArray = arrayTransacaoFiltrado.filter(
                          (item) => item !== categoria.descricao
                        );
                        arrayTransacaoFiltrado = novoArray;
                        span.style.background = "none";
                        span.style.color = "black";
                        span.style.background = "";
                      }
                    }}
                  >
                    {categoria.descricao}
                    <img src={plus} alt="plus" />
                  </span>
                );
              })}
            </section>
            <span>
              <button
                onClick={() => {
                  const spans = document.querySelectorAll(
                    ".btn-filtrar-categoria"
                  );
                  spans.forEach((span) => {
                    span.style.background = "none";
                    span.style.color = "black";
                    span.style.background = "";
                  });
                  arrayTransacaoFiltrado = [];
                }}
                className="btn-limpar-filtros"
              >
                Limpar Filtros
              </button>
              <button
              type="submit"
                onClick={(event) => {
                  loadTransactions(state, setState, arrayTransacaoFiltrado);
                  const spans = document.querySelectorAll(
                    ".btn-filtrar-categoria"
                  );
                  spans.forEach((span) => {
                    span.style.background = "none";
                    span.style.color = "black";
                    span.style.background = "";
                  });
                }}
                className="btn-aplicar-filtros"
              >
                Aplicar Filtros
              </button>
            </span>
          </div>
        ) : (
          <div
            style={{ display: "none", background: "black" }}
            className="container-filtrar"
          ></div>
        )}
        <Table
          stateDialogEditar={stateDialogEditar}
          setStateDialogEditar={setStateDialogEditar}
          stateTransacoes={stateTransacoes}
          setStateTransacoes={setStateTransacoes}
        />
      </section>
    </>
  );
}
