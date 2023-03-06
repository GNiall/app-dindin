import { useEffect, useCallback, memo } from "react";
import { loadResume } from "../../functions/requisicoes";

function SectionResumo({ state, setState }) {
  const loadResumeCallback = useCallback(() => {
    loadResume(state, setState);
  }, [state, setState]);

  useEffect(() => {
    loadResumeCallback();
  }, []);

  return (
    <section className="section-container-resumo">
      <div className="container-resumo">
        <strong>Resumo</strong>
        <span className="span-entrada">
          Entrada{" "}
          <b>
            {parseFloat(Number(state.extrato.entrada) / 100).toLocaleString(
              "pt-Br",
              { style: "currency", currency: "BRL" }
            )}
          </b>
        </span>
        <span className="span-saida">
          Saida{" "}
          <b>
            {parseFloat(Number(state.extrato.saida) / 100).toLocaleString(
              "pt-Br",
              { style: "currency", currency: "BRL" }
            )}
          </b>
        </span>
        <span className="span-total">
          Total
          <b>
            {(
              parseFloat(Number(state.extrato.entrada)) / 100 -
              parseFloat(Number(state.extrato.saida)) / 100
            ).toLocaleString("pt-Br", { style: "currency", currency: "BRL" })}
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

export default memo(SectionResumo);
