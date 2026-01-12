import { useState } from "react";

const SERVIDOR = "http://localhost:8000";

function App() {
  const [ruta, setRuta] = useState("");
  const [contenido, setContenido] = useState("");
  const [resultado, setResultado] = useState("");

  // ======================
  // GET → abrir archivo
  // ======================
  const hacerGET = async () => {
    if (!ruta) return alert("Escribe la ruta del archivo");

    window.open(SERVIDOR + ruta, "_blank");

    const res = await fetch(SERVIDOR + ruta);
    mostrarRespuesta(res);
  };

  // ======================
  // PUT → crear / modificar archivo
  // ======================
  const hacerPUT = async () => {
    if (!ruta) return alert("Escribe la ruta del archivo");

    const res = await fetch(SERVIDOR + ruta, {
      method: "PUT",
      body: contenido,
    });

    mostrarRespuesta(res);
  };

  // ======================
  // POST → enviar datos
  // ======================
  const hacerPOST = async () => {
    const res = await fetch(SERVIDOR, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: contenido,
    });

    mostrarRespuesta(res);
  };

  // ======================
  // DELETE → eliminar archivo
  // ======================
  const hacerDELETE = async () => {
    if (!ruta) return alert("Escribe la ruta del archivo");

    const res = await fetch(SERVIDOR + ruta, { method: "DELETE" });
    mostrarRespuesta(res);
  };

  // ======================
  // Mostrar respuesta HTTP
  // ======================
  const mostrarRespuesta = async (res) => {
    let texto = `STATUS: ${res.status}\n\nHEADERS:\n`;

    res.headers.forEach((v, k) => {
      texto += `${k}: ${v}\n`;
    });

    try {
      const body = await res.text();
      texto += `\nBODY:\n${body}`;
    } catch {}

    setResultado(texto);
  };

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <div className="logo">HTTP</div>
          <div className="titles">
            <h1>Panel de Pruebas HTTP</h1>
            <p>GET · POST · PUT · DELETE — Cliente React</p>
          </div>
        </div>

        <div className="serverChip" title="Servidor configurado en App.jsx">
          <span className="dot" />
          <span>{SERVIDOR}</span>
        </div>
      </header>

      <main className="grid">
        <section className="panel">
          <div className="panelHeader">
            <h2>Solicitud</h2>
            <span className="hint">Tip: usa rutas como /index.htm, /react.txt, /archivo.pdf</span>
          </div>

          <div className="field">
            <label>Ruta del recurso</label>
            <div className="inputRow">
              <span className="prefix">/</span>
              <input
                placeholder="Cuestionario_C_B25.pdf"
                value={ruta.startsWith("/") ? ruta.slice(1) : ruta}
                onChange={(e) => {
                  const v = e.target.value.trim();
                  setRuta(v ? (v.startsWith("/") ? v : "/" + v) : "");
                }}
              />
            </div>
            <small>Se usará para GET / PUT / DELETE</small>
          </div>

          <div className="field">
            <label>Contenido</label>
            <textarea
              placeholder="Escribe aquí el contenido para PUT/POST…"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
            />
            <small>Se usará para PUT / POST</small>
          </div>

          <div className="actions">
            <button className="btn btnGet" onClick={hacerGET}>
              GET
            </button>
            <button className="btn btnPut" onClick={hacerPUT}>
              PUT
            </button>
            <button className="btn btnPost" onClick={hacerPOST}>
              POST
            </button>
            <button className="btn btnDel" onClick={hacerDELETE}>
              DELETE
            </button>
          </div>
        </section>

        <section className="panel">
          <div className="panelHeader">
            <h2>Respuesta</h2>
            <span className="hint">Status · Headers · Body</span>
          </div>

          <div className="terminal">
            <div className="terminalBar">
              <span className="lamp red" />
              <span className="lamp yellow" />
              <span className="lamp green" />
              <span className="terminalTitle">http-response.log</span>
            </div>
            <pre className="terminalBody">{resultado || "Ejecuta una petición para ver el resultado aquí…"}</pre>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Práctica 4 — Servidor HTTP en Java + Cliente React</span>
      </footer>
    </div>
  );
}

export default App;
