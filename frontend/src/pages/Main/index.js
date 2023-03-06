import Header from "../../components/Header/Header"
import DialogAdd from "../../components/Dialog/DialogAdd";
import DialogEditar from "../../components/Dialog/DialogEditar";
import DialogUsuario from "../../components/Dialog/DialogUsuario";
import SectionResumo from "../../components/Resumo/Resumo";
import setaCima from "../../assets/setaCima.png";
import "./styles.main.css";
import Filtrar from "../../components/Filtrar/Filtrar";
import { useState, memo } from "react";

// function Main() {
//   const [stateDialogEditar, setStateDialogEditar] = useState({
//     valor: "",
//     categoria: "",
//     data: "",
//     descricao: "",
//   });
//   const [stateDialogUsuario, setStateDialogUsuario] = useState({
//     nome: localStorage.getItem("nome"),
//     email: localStorage.getItem("email"),
//   });

//   const [stateDialogAdd, setStateDialogAdd] = useState({
//     categorias: [],

//     descricao: "",
//     valor: "",
//     dataTransacao: "",
//     categoriaId: "",
//     tipo: "saida",

//     entradaSelecionada: false,
//     saidaSelecionada: true,
//     enviado: false,
//   });

//   const [stateFiltrar, setStateFiltrar] = useState({
//     filtrar: false,
//     categorias: [],
//   });

//   const [stateResumo, setStateResumo] = useState({
//     extrato: {
//       entrada: null,
//       saida: null,
//     },
//   });
//   const [stateTransacoes, setStateTransacoes] = useState({
//     imagem: setaCima,
//     transacoes: [],
//   });

//   useEffect(() => {
//    loadCategories(stateFiltrar, setStateFiltrar);
//    loadResume(stateResumo, setStateResumo);
//    loadTransactions(stateTransacoes, setStateTransacoes);
//   }, []);

//   return (
//     <main>
//       <Header />
//       <DialogAdd state={stateDialogAdd} setState={setStateDialogAdd} />
//       <DialogEditar state={stateDialogEditar} setState={setStateDialogEditar} />
//       <DialogUsuario
//         state={stateDialogUsuario}
//         setState={setStateDialogUsuario}
//       />
//       <div className="container-main">
//         <Filtrar
//           state={stateFiltrar}
//           setState={setStateFiltrar}
//           stateDialogEditar={stateDialogEditar}
//           setStateDialogEditar={setStateDialogEditar}
//           stateTransacoes={stateTransacoes}
//           setStateTransacoes={setStateTransacoes}
//         />
//         <SectionResumo state={stateResumo} setState={setStateResumo} />
//       </div>
//     </main>
//   );
// }
const MemoizedHeader = memo(Header);
const MemoizedSectionResumo = memo(SectionResumo);
const MemoizedDialogAdd = memo(DialogAdd);
const MemoizedDialogEditar = memo(DialogEditar);
const MemoizedDialogUsuario = memo(DialogUsuario);
const MemoizedFiltrar = memo(Filtrar);

function Main() {
  const [stateDialogEditar, setStateDialogEditar] = useState({
    valor: "",
    categoria: "",
    data: "",
    descricao: "",
    categorias: [],
  });
  const [stateDialogUsuario, setStateDialogUsuario] = useState({
    nome: localStorage.getItem("nome"),
    email: localStorage.getItem("email"),
    senha:"",
    confirmarSenha:""
  });

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
      entrada: null,
      saida: null,
    },
  });
  const [stateTransacoes, setStateTransacoes] = useState({
    imagem: setaCima,
    transacoes: [],
  });

  return (
    <main>
      <MemoizedHeader />
      <MemoizedDialogAdd
        state={stateDialogAdd}
        setState={setStateDialogAdd}
        stateTransacoes={stateTransacoes}
        setStateTransacoes={setStateTransacoes}
        stateResumo={stateResumo}
        setStateResumo={setStateResumo}
      />
      <MemoizedDialogEditar
        state={stateDialogEditar}
        setState={setStateDialogEditar}
      />
      <MemoizedDialogUsuario
        state={stateDialogUsuario}
        setState={setStateDialogUsuario}
      />
      <div className="container-main">
        <MemoizedFiltrar
          state={stateFiltrar}
          setState={setStateFiltrar}
          stateDialogEditar={stateDialogEditar}
          setStateDialogEditar={setStateDialogEditar}
          stateTransacoes={stateTransacoes}
          setStateTransacoes={setStateTransacoes}
        />
        <MemoizedSectionResumo state={stateResumo} setState={setStateResumo} />
      </div>
    </main>
  );
}

export default Main;