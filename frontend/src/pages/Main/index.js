// import { useEffect, useState } from "react";
// import loadingApi from "../../functions/LoadingApi";
import "./styles.main.css";
import "../SignIn/styles.signin.css";
import "../SignUp/styles.signup.css";
import Header from "../../components/Header/Header";
import icone from "../../assets/icons8-filtro-48 1.png";
import Table from "../../components/Table/Table";
import Dialog from "../../components/Dialog/Dialog";
import instanceAxios from "../../service";
import { useEffect } from "react";
import SectionResumo from "../../components/SectionResumo/SectionResumo";
async function loadingApi(state, setState) {
  
  try {
    const { data } = await instanceAxios.get("/usuario", {
      headers: {
        Authorization: `Basic ${localStorage.getItem("token")}`,
      },
    });
    setState({ ...state, data });
  } catch (error) {
    console.log(error);
  }
}
function Main({ state, setState }) {
  useEffect(() => {
    loadingApi(state, setState);
  }, [state.data]);

  return (
    <main>
      <Dialog state={state} setState={setState} />

      <Header />
      <div className="container-main">
        <span
          className="span-container-filtrar"
          onClick={() => {
            if (state.filtrar === false) {
              setState({ ...state, filtrar: true });
            } else {
              setState({ ...state, filtrar: false });
            }
          }}
        >
          <img src={icone} alt="filtrar" />
          filtrar
        </span>
        <section className="section-container-filtrar">
          {state.filtrar ? (
            <div className="container-filtrar"></div>
          ) : (
            <div
              style={{ display: "none", background: "black" }}
              className="container-filtrar"
            ></div>
          )}
          <Table />
        </section>
        <SectionResumo state={state} />
      </div>
    </main>
  );
}

export default Main;
