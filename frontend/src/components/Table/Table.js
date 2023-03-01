import { useState } from "react";
import setaCima from "../../assets/setaCima.png";
import setaBaixo from "../../assets/setaBaixo.png";
import "./style.table.css";
import lapisImagem from "../../assets/lapisImagem.png";
import lixeiraImagem from "../../assets/lixeiraImagem.png";

export default function Table() {
  const [state, setState] = useState({
    imagem: setaCima,
  });

  return (
    <table>
      <thead>
        <tr>
          <th>
            <span
              className="btn-sort-date"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                state.imagem.includes("/EAAAAAElFTkSuQmCC")
                  ? setState({ ...state, imagem: setaBaixo })
                  : setState({ ...state, imagem: setaCima });
              }}
            >
              Data
              <img
                style={{ width: "6px", height: "6px" }}
                src={state.imagem}
                alt=""
              />
            </span>
          </th>
          <th>Dia da Semana</th>
          <th>Descrição</th>
          <th>Valor</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>teste tabela</th>
          <th>teste tabela</th>
          <th>teste tabela</th>
          <th>teste tabela</th>
          <th>
            <span>
              <img onClick={()=>{
               const dialog =  document.querySelector("dialog-")
               dialog.showModal()
              }} src={lapisImagem} alt="" />
              <img onClick={()=>{
               const dialog =  document.querySelector("dialog-")
               dialog.close()
              }} src={lixeiraImagem} alt="" />
            </span>
          </th>
        </tr>

        <tr>
          <th>teste tabela</th>
          <th>teste tabela</th>
          <th>teste tabela</th>
          <th>teste tabela</th>
          <th>
            <span>
              <img onClick={()=>{
               const dialog =  document.querySelector("dialog-")
               dialog.showModal()
              }} src={lapisImagem} alt="" />
              <img onClick={()=>{
               const dialog =  document.querySelector("dialog-")
               dialog.close()
              }} src={lixeiraImagem} alt="" />
            </span>
          </th>
        </tr>

        <tr>
          <th>teste tabela</th>
          <th>teste tabela</th>
          <th>teste tabela</th>
          <th>teste tabela</th>
          <th>
            <span>
              <img onClick={()=>{
               const dialog =  document.querySelector("dialog-")
               dialog.showModal()
              }} src={lapisImagem} alt="" />
              <img onClick={()=>{
               const dialog =  document.querySelector("dialog-")
               dialog.close()
              }} src={lixeiraImagem} alt="" />
            </span>
          </th>
        </tr>
      </tbody>
    </table>
  );
}
