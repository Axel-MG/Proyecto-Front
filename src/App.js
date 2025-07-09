import { Link, Route, Routes } from "react-router";
import "./App.css";
import CrearCliente from "./components/cliente/Cliente.js";
function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/crear-cliente">Crear Cliente</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Bienvenido</h1>} />
        <Route path="/crear-cliente" element={<CrearCliente />} />
      </Routes>
    </div>
  );
}

export default App;
