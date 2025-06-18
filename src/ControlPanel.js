import React, { useEffect, useState } from 'react';

const ControlPanel = () => {
  const [states, setStates] = useState({
    actuador_1: false,
    actuador_2: false
  });

  // Nombres personalizados
  const labels = {
    actuador_1: 'Actuador 1',
    actuador_2: 'Actuador 2',
  };

  // GET inicial al cargar
  useEffect(() => {
    const fetchControlStates = async () => {
      try {
        const response = await fetch('https://biosinergianodejs-production.up.railway.app/api/controls/3');
        const data = await response.json();

        // Actualizamos los estados con los valores de la API
        setStates({
          actuador_1: data.actuador_1 === 1,
          actuador_2: data.actuador_2 === 1,
        });
      } catch (err) {
        console.error('❌ Error al obtener el estado de los controles:', err);
      }
    };

    fetchControlStates();
  }, []);

  // PATCH al cambiar
  const toggleSwitch = async (key) => {
    const newState = { ...states, [key]: !states[key] };
    setStates(newState);

    try {
      await fetch('https://biosinergianodejs-production.up.railway.app/api/controls/3', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [key]: newState[key] ? 1 : 0,
        }),
      });
      console.log(`✅ ${key} actualizado a ${newState[key] ? 'ENCENDIDO' : 'APAGADO'}`);
    } catch (err) {
      console.error(`❌ Error actualizando ${key}:`, err);
    }
  };

  return (
    <div className="control-panel">
      {Object.keys(states).map((key) => (
        <button
          key={key}
          onClick={() => toggleSwitch(key)}
          className={states[key] ? 'on' : 'off'}
        >
          {labels[key]} {states[key] ? '🔛' : '🔘'}
        </button>
      ))}
    </div>
  );
};

export default ControlPanel;
