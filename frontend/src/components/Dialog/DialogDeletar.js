export default function Deletar() {
  return (
    <dialog className="dialog-deletar">
      <div className="container-dialog-deletar">
        <h1>Apagar item</h1>
        <span>
          <button
            className="btn-deletar-Sim"
            onClick={async () => {
              console.log("Sim");
            }}
          >
            Sim
          </button>
          <button
            className="btn-deletar-Não"
            onClick={() => {
              console.log("Não");
            }}
          >
            Não
          </button>
        </span>
      </div>
    </dialog>
  );
}
