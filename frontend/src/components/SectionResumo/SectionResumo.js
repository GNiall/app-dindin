


export default function SectionResumo({state}){
  return (
    <section className="section-container-resumo">
      <div className="container-resumo">
        <strong>Resumo</strong>
        <span className="span-entrada">
          Entrada <b>R$ {Number(state.resumo.entrada) / 100},00</b>
        </span>
        <span className="span-saida">
          Saida <b>R$ {Number(state.resumo.saida) / 100},00</b>
        </span>
        <span className="span-total">
          <b> Total</b>
          <b>
            R${" "}
            {Number(state.resumo.entrada) / 100 -
              Number(state.resumo.saida) / 100}
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