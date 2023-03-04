import Header from "../../components/Header/Header";
import DialogAdd from "../../components/Dialog/DialogAdd";
import DialogEditar from "../../components/Dialog/DialogEditar";
import DialogUsuario from "../../components/Dialog/DialogUsuario";
import SectionResumo from "../../components/Resumo/Resumo";
import setaCima from "../../assets/setaCima.png";
import "./styles.main.css";
import Filtrar from "../../components/Filtrar/Filtrar";
import { useState } from "react";

function Main() {
  const [stateDialogEditar, setStateDialogEditar] = useState({
    valor: "",
    categorias: "",
    data: "",
    descricao: "",
  });
  const [stateDialogUsuario, setStateDialogUsuario] = useState({});

  const [stateDialogAdd, setStateDialogAdd] = useState({
    categorias: [],

    descricao: "",
    valor: "",
    dataTransacao: "",
    categoriaId: "",
    tipo: "saida",

    entradaSelecionada: false,
    saidaSelecionada: true,
    enviado: false,
  });

  const [stateFiltrar, setStateFiltrar] = useState({
    filtrar: false,
    categorias: [],
  });

  const [stateResumo, setStateResumo] = useState({
    extrato: {
      entrada: [],
      saida: [],
      total: "",
    },
  });
  const [stateTransacoes, setStateTransacoes] = useState({
    imagem: setaCima,
    transacoes: [],
  });
  return (
    <main>
      <Header />
      <DialogAdd state={stateDialogAdd} setState={setStateDialogAdd} />
      <DialogEditar state={stateDialogEditar} setState={setStateDialogEditar} />
      <DialogUsuario
        state={stateDialogUsuario}
        setState={setStateDialogUsuario}
      />
      <div className="container-main">
        <Filtrar
          state={stateFiltrar}
          setState={setStateFiltrar}
          stateDialogEditar={stateDialogEditar}
          setStateDialogEditar={setStateDialogEditar}
          stateTransacoes={stateTransacoes}
          setStateTransacoes={setStateTransacoes}
        />
        <SectionResumo state={stateResumo} setState={setStateResumo} />
      </div>
    </main>
  );
}

export default Main;
