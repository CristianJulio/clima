import React, { useState, useEffect } from "react";
import Clima from "./components/Clima";
import Error from "./components/Error";
import Header from "./components/Header";
import Formulario from "./components/Formulario";

const App = () => {
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarApi = async () => {
      const appid = "b72c6947bbe6a741832980d5337d6318";
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`;

      const consultarApi = await fetch(url);
      const datos = await consultarApi.json();

      setResultado({ ...datos });
      setConsultar(false);

      if (datos.cod === "404") {
        setError(true);
      } else {
        setError(false);
      }
    };

    if (consultar) consultarApi();
    // eslint-disable-next-line
  }, [consultar]);

  let componente;

  if (error) {
    componente = <Error mensaje="No hay resultados" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <>
      <Header titulo="Clima React App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
