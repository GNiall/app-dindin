import { useEffect } from "react";
import setaCima from "../../assets/setaCima.png";
import setaBaixo from "../../assets/setaBaixo.png";
import lapisImagem from "../../assets/lapisImagem.png";
import lixeiraImagem from "../../assets/lixeiraImagem.png";
import "./style.table.css";
import Deletar from "../Dialog/DialogDeletar";
import {
  deleteTransaction,
  loadTransactions,
} from "../../functions/requisicoes";
import {
  formatToDate,
  formatToMoney,
  formatToWeekDay,
} from "../../functions/templates";

function Table({
  stateTransacoes,
  setStateTransacoes,
  stateDialogEditar,
  setStateDialogEditar,
}) {
  useEffect(() => {
    loadTransactions(stateTransacoes, setStateTransacoes);
  }, [stateTransacoes.transacoes, setStateTransacoes]);

  const handleArrowClick = () => {
    const newImage = stateTransacoes.imagem.includes("/EAAAAAElFTkSuQmCC")
      ? setaBaixo
      : setaCima;
    setStateTransacoes({ ...stateTransacoes, imagem: newImage });
  };

  const handleEditClick = (transacao) => {
    setStateDialogEditar({ ...stateDialogEditar, transacao });
    const dialog = document.querySelector(".dialog-editar");
    loadTransactions(stateTransacoes, setStateTransacoes);
    dialog.showModal();
  };

  const handleDeleteClick = async (id) => {
    await deleteTransaction(stateTransacoes, setStateTransacoes, id);
  };

  return (
    <>
      <Deletar />
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
                onClick={handleArrowClick}
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
          {stateTransacoes.transacoes.map((transacao) => (
            <tr key={transacao.id}>
              <th>{formatToDate(transacao.data)}</th>
              <th>{formatToWeekDay(transacao.data)}</th>
              <th>{transacao.descricao}</th>
              <th>{transacao.categoria_nome}</th>
              <th>{formatToMoney(Number(transacao.valor) / 100)}</th>
              <th>
                <span>
                  <img
                    onClick={() => handleEditClick(transacao)}
                    src={lapisImagem}
                    alt=""
                  />
                  <img
                    onClick={() => handleDeleteClick(transacao.id)}
                    src={lixeiraImagem}
                    alt=""
                  />
                </span>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
