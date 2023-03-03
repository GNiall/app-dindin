import { useState } from "react";

export default function SectionResumo() {
  const [state] = useState({
    entrada: 0,
    saida: 0,
  });

  return (
    <section className="section-container-resumo">
      <div className="container-resumo">
        <strong>Resumo</strong>
        <span className="span-entrada">
          Entradas <b>R$ {Number(state.entrada) / 100},00</b>
        </span>
        <span className="span-saida">
          Saídas <b>R$ {Number(state.saida) / 100},00</b>
        </span>
        <span className="span-total">
          Total
          <b>
            R$ {Number(state.entrada) / 100 - Number(state.saida) / 100}
            ,00
          </b>
        </span>
      </div>
      <button
        onClick={() => {
          const dialog = document.querySelector(".dialog-add");
          dialog.showModal();
        }}
      >
        Adicionar Registro
      </button>
    </section>
  );
}
