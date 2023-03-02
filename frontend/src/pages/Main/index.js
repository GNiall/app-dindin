import Header from "../../components/Header/Header";
import DialogAdd from "../../components/Dialog/DialogAdd";
import DialogEditar from "../../components/Dialog/DialogEditar";
import DialogUsuario from "../../components/Dialog/DialogUsuario";
import SectionResumo from "../../components/SectionResumo/SectionResumo";

// import { useEffect, useState } from "react";
import "./styles.main.css";
import Filtrar from "../../components/Filtrar/Filtrar";

function Main() {
  return (
    <main>
      <Header />
      <DialogAdd /*state={state} setState={setState}*/ />
      <DialogEditar /*state={state} setState={setState}*/ />
      <DialogUsuario /*state={state} setState={setState} */ />
      <div className="container-main">
        <Filtrar /*state={state} setState={setState}*/ />
        <SectionResumo /*state={state}*/ />
      </div>
    </main>
  );
}

export default Main;
