import { useEffect, useRef, useState } from "react";
import close from "../../assets/close.png";
import { createTransaction, loadCategories } from "../../functions/requisicoes";
import "./style.dialog.css";

export default function DialogAdd() {
  const ref = useRef("");
  const btnEntradaRef = useRef("");
  const btnSaidaRef = useRef("");
  const [state, setState] = useState({
    categorias: [{
      id:1,
      descricao:"vendas"
    }],
   
      descricao: "",
      valor: "",
      data: "",
      categoria_id: "",
      usuario_id: "",
      tipo: "saida",
    
  });
  const { descricao, valor, data, categoria_id, usuario_id, tipo } = state
  useEffect(() => {
    createTransaction(state, setState);
    loadCategories(state, setState);
  },[]);
  return (
    <dialog className="dialog-add" ref={ref}>
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
          <button ref={btnEntradaRef} onChange={(event)=>{
            if(state.tipo === "saida"){
btnEntradaRef.current.style.background = "#3a9ff1"
            }else{
              btnEntradaRef.current.style.background = "#484848"
            }
          }} type="button" className="btn-entrada">
            Entrada
          </button>
          <button ref={btnSaidaRef} onChange={(event)=>{
            if(state.tipo === "saida"){
btnSaidaRef.current.style.background = "#ff576b"
 

            }else{
              btnSaidaRef.current.style.background = "#484848"
            }
          }} type="button" className="btn-saida">
            Saida
          </button>
        </span>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (!valor || !data || !categoria_id || !usuario_id || !tipo)
              return;
          }}
        >
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
                  <option key={categoria.id} value={categoria.nome}>
                    {categoria.nome}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            data
            <input
              name="data"
              type="text"
              value={data}
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
