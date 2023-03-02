import { useState } from "react";



export default function SectionResumo(){
const [state]= useState({
  entrada:0,
  saida:0
})
  return (
    <section className="section-container-resumo">
      <div className="container-resumo">
        <strong>Resumo</strong>
        <span className="span-entrada">
          Entrada <b>R$ {Number(state.entrada) / 100},00</b>
        </span>
        <span className="span-saida">
          Saida <b>R$ {Number(state.saida) / 100},00</b>
        </span>
        <span className="span-total">
           Tota
          <b>
            R${" "}
            {Number(state.entrada) / 100 -
              Number(state.saida) / 100}
            ,00
          </b>
        </span>
      </div>
      <button
        onClick={() => {
          const dialog = document.querySelector("dialog");
          dialog.showModal();
        }}
      >
        Adicionar Registro
      </button>
    </section>
  );
}