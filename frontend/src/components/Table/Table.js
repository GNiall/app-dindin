import { useEffect, useState } from "react";
import setaCima from "../../assets/setaCima.png";
import setaBaixo from "../../assets/setaBaixo.png";
import lapisImagem from "../../assets/lapisImagem.png";
import lixeiraImagem from "../../assets/lixeiraImagem.png";
import "./style.table.css";
import Deletar from "../Dialog/DialogDeletar";
import { loadTransactions } from "../../functions/requisicoes";

export default function Table() {
  const [state, setState] = useState({
    imagem: setaCima,
    transacoes: [],
  });

  const { imagem, transacoes } = state;

  useEffect(() => {
    loadTransactions(state, setState);
  }, []);

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
                onClick={() => {
                  imagem.includes("/EAAAAAElFTkSuQmCC")
                    ? setState({ ...imagem, imagem: setaBaixo })
                    : setState({ ...imagem, imagem: setaCima });
                }}
              >
                Data
                <img
                  style={{
                    width: "6px",
                    height: "6px",
                    marginLeft: "5px",
                  }}
                  src={imagem}
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
          {transacoes.map((transacao) => {
            return (
              <tr key={transacao.id}>
                <th>{transacao.data}</th>
                <th>Terça</th>

                <th>{transacao.descricao}</th>
                <th>{transacao.categoria_id}</th>
                <th>{transacao.valor}</th>
                <th>
                  <span>
                    <img
                      onClick={() => {
                        const dialog = document.querySelector(".dialog-editar");
                        dialog.showModal();
                      }}
                      src={lapisImagem}
                      alt=""
                    />
                    <img
                      onClick={() => {
                        const dialog =
                          document.querySelector(".dialog-deletar");
                        dialog.showModal();
                      }}
                      src={lixeiraImagem}
                      alt=""
                    />
                  </span>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
