import Table from "../Table/Table";
import icone from "../../assets/icons8-filtro-48 1.png";
import "./style.css";
import plus from "../../assets/plus.png";
// import instanceAxios from "../../service";
import { useState } from "react";
// async function loadCategories(state, setState) {
//   try {
//     const { data } = await instanceAxios.get("/categoria", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     return data.sort((a, b) => a - b);
//   } catch (error) {
//     console.log(error);
//   }
// }
export default function Filtrar() {
  const [state, setState] = useState({
    filtrar: false,
    categorias: []
  });
  const { categorias } = state;
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
            <section>
              {categorias.map((categoria) => {
                return (
                  <span
                    key={categoria.id}
                    className="btn-selecionar-categorias "
                  >
                    <input
                      name={`input ${categoria.descricao}`}
                      className="input-checkbox"
                      type={"checkbox"}
                      onClick={(event) => {
                        if (event.target.checked){
                          setState({
                            ...state,
                            [event.target.name]: "selecionado",
                           
                          })
                           console.log(event.target.name+" selecionado");}else{
                            setState({
                              ...state,
                              [event.target.name]: "",
                            });
                             console.log(event.target.name+" Não selecionado");
                          }
                        setState({...state})
                      }}
                    />
                    {categoria.descricao}
                    <img src={plus} alt="plus" />
                  </span>
                );
              })}
            </section>
            <span>
              <button>Limpar Filtros</button>
              <button>Aplicar Filtros</button>
            </span>
          </div>
        ) : (
          <div
            style={{ display: "none", background: "black" }}
            className="container-filtrar"
          ></div>
        )}
        <Table />
      </section>
    </>
  );
}
