import logo from "../../assets/Logo.png";
import profile from "../../assets/profile.png";
import exit from "../../assets/exit.png";

import "./style.header.css";

export default function Header() {
  return (
    <header>
      <img className="logo" src={logo} alt="logo" />
      <section>
        <span className="span-container-logo">
          <img className="profile" src={profile} alt="" />
        </span>
        <h1>Marcus</h1>
        <img
          className="exit"
          src={exit}
          alt="exit"
          onClick={() => console.log("quero sair")}
        />
      </section>
    </header>
  );
}
