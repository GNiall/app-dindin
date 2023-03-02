import logo from "../../assets/Logo.png";
import profile from "../../assets/profile.png";
import exit from "../../assets/exit.png";

import "./style.header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <img className="logo-header" src={logo} alt="logo" />
      <section>
        <span className="span-container-logo">
          <img
            className="profile"
           onClick={()=>{
            const dialog = document.querySelector(".dialog-usuario")
            dialog.showModal()
           }}
            src={profile}
            alt=""
          />
        </span>
        <h1>{localStorage.getItem("nome")}</h1>
        <img
          className="exit"
          src={exit}
          alt="exit"
          onClick={() => {
            localStorage.clear();
            navigate("/sign-in");
          }}
        />
      </section>
    </header>
  );
}
