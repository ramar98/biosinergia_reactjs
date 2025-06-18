import { useEffect, useState } from 'react';
import "./App.css";
import ControlPanel from './ControlPanel';
import './ControlPanel.css';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Lun", valor: 24 },
  { name: "Mar", valor: 22 },
  { name: "Mié", valor: 25 },
  { name: "Jue", valor: 26 },
  { name: "Vie", valor: 28 },
  { name: "Sáb", valor: 27 },
  { name: "Dom", valor: 23 },
];


function App() {

  const [medition, setMedition] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 1000); // cada 1000 ms = 1 segundo

    return () => clearInterval(interval); // limpieza al desmontar
  }, []);

  const getData = async () => {
    try {
      const response = await fetch('https://biosinergianodejs-production.up.railway.app/api/meditions/3');
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      setMedition(data);
      console.log('Datos obtenidos:', data);
      return data;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      return null;
    }
  };


  return (
    <div className="dashboard-container">
      <div className="centered-logo">
        <img src="/images/logo-biosinergia.png" alt="logo-biosinergia" className="logo-biosinergia" />
        <img src="/images/logo-inta.png" alt="logo-inta" className="logo-inta" />
      </div>
      <h1 className="dashboard-title">🌿 Dashboard BioSinergia</h1>

      <div className="cards-container">
        <div className="card">
          <h3>Temperatura Ambiente</h3>
          <p>{medition.room_temperature} °C</p>
        </div>
        <div className="card">
          <h3>Humedad Ambiente</h3>
          <p>{medition.room_humidity}%</p>
        </div>
        <div className="card">
          <h3>Humedad del Suelo 1</h3>
          <p>{medition.soil_humidity_1}%</p>
        </div>
        <div className="card">
          <h3>Humedad del Suelo 2</h3>
          <p>{medition.soil_humidity_2}%</p>
        </div>
        <div className="card">
          <h3>CO₂</h3>
          <p>{medition.dioxido_carbono} ppm</p>
        </div>
      </div>

      {/*<div className="chart-container">
        <h2>Temperatura semanal</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="valor" stroke="#2e7d32" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis domain={[20, 30]} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>*/}
      <div>
        <h1>Panel de Control</h1>
        <ControlPanel />
      </div>
    </div>
  );
}

export default App;
