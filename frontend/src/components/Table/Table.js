import { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";

import {
  deleteTransaction,
  loadTransactions,
} from "../../functions/requisicoes";
import {
  formatToDate,
  formatToMoney,
  formatToWeekDay,
} from "../../functions/templates";

import setaCima from "../../assets/setaCima.png";
import setaBaixo from "../../assets/setaBaixo.png";
import lapisImagem from "../../assets/lapisImagem.png";
import lixeiraImagem from "../../assets/lixeiraImagem.png";

import popup from "../../assets/popup.png";
import "./style.popup.css";
import "./style.table.css";

function Table({
  stateTransacoes,
  setStateTransacoes,
  stateDialogEditar,
  setStateDialogEditar,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    loadTransactions(stateTransacoes, setStateTransacoes);
  }, []);

  const handleArrowClick = () => {
    const newImage = stateTransacoes.imagem.includes("/EAAAAAElFTkSuQmCC")
      ? setaBaixo
      : setaCima;

    if (newImage.includes("/EAAAAAElFTkSuQmCC")) {
      localStorage.setItem("oremTabela", true);
    } else {
      localStorage.setItem("oremTabela", false);
    }
    setStateTransacoes({ ...stateTransacoes, imagem: newImage });
  };

  const handleEditClick = (transacao) => {
    const dialog = document.querySelector(".dialog-editar");
    dialog.showModal();
    setStateDialogEditar({
      ...stateDialogEditar,
      transacaoSelecionada: transacao,
    });
    loadTransactions(stateTransacoes, setStateTransacoes);

    const popupBox = document.querySelector(`.popup-box${transacao.id}`);
    popupBox.classList.add("hidden");
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <span
                className="btn-ordem-data"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  handleArrowClick();
                }}
              >
                Data
                <img
                  style={{ width: "6px", height: "6px" }}
                  src={stateTransacoes.imagem}
                  alt=""
                />
              </span>
            </th>
            <th>Dia da Semana</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {stateTransacoes.transacoes.map((transacao) => {
            return (
              <tr key={transacao.id}>
                <th>{formatToDate(transacao.data)}</th>
                <th>{formatToWeekDay(transacao.data)}</th>
                <th>{transacao.descricao}</th>
                <th>{transacao.categoria_nome}</th>
                <th
                  className={
                    transacao.tipo === "saida" ? "th-saida" : "th-entrada"
                  }
                >
                  {formatToMoney(Number(transacao.valor) / 100)}
                </th>
                <th>
                  <span>
                    <img
                      onClick={() => {
                        setStateDialogEditar({
                          ...stateDialogEditar,
                          transacao,
                        });
                        handleEditClick(transacao);
                      }}
                      src={lapisImagem}
                      alt=""
                    />

                    <img
                      onClick={() => {
                        localStorage.setItem("idTransacao", transacao.id);

                        const popupContainer = document.querySelector(
                          `.popup${transacao.id}`
                        );
                        popupContainer.classList.remove("hidden");
                      }}
                      src={lixeiraImagem}
                      alt=""
                    />
                  </span>
                  <div id={transacao.id} className={`popup-background hidden`}>
                    <img src={popup} alt="popup" />
                    <div className={`popup-box `}>
                      <p>Apagar item ?</p>
                      <div className="container-btn-sim-nao">
                        <button
                          className="btn-popup-sim"
                          onClick={() => {
                            deleteTransaction(transacao.id);
                            navigate("/");
                          }}
                        >
                          Sim
                        </button>
                        <button
                          className="btn-popup-nao"
                          onClick={() => {
                            localStorage.setItem("idTransacao", transacao.id);
                            document
                              .querySelector(`.popup-${transacao.id}`)
                              .classList.add("hidden");
                          }}
                        >
                          Não
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    id={transacao.id}
                    className={`popup-background popup${transacao.id} hidden`}
                  >
                    <img src={popup} alt="popup" />
                    <div className={`popup-box `}>
                      <p>Apagar item ?</p>
                      <div className="container-btn-sim-nao">
                        <button
                          className="btn-popup-sim"
                          onClick={() => {
                            deleteTransaction(transacao.id);
                            navigate("/");
                          }}
                        >
                          Sim
                        </button>
                        <button
                          className="btn-popup-nao"
                          onClick={() => {
                            localStorage.setItem("idTransacao", transacao.id);
                            document
                              .querySelector(`.popup${transacao.id}`)
                              .classList.add("hidden");
                          }}
                        >
                          Não
                        </button>
                      </div>
                    </div>
                  </div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default memo(Table);
