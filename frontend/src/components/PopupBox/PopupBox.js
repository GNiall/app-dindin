import "./style.popup.css";
import popup from "../../assets/popup.png";
import { useRef } from "react";
import { deleteTransaction } from "../../functions/requisicoes";
import { useNavigate } from "react-router-dom";

export default function PopupBox({idTransacao,id}) {
  const popupRef = useRef();

  const navigate=useNavigate()
  return (
    <div id={idTransacao} ref={popupRef} className="popup-background hidden">
      <img src={popup} alt="popup" />
      <div className="popup-box">
        <p>Apagar item ?</p>
        <div className="container-btn-sim-nao">
          <button
            className="btn-popup-sim"
            onClick={() =>{
              deleteTransaction(idTransacao)
              navigate("/")
            }}
          >
            Sim
          </button>
          <button
            className="btn-popup-nao"
            onClick={() => popupRef.current.classList.add("hidden")}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
}
