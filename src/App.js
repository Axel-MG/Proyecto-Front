import { Route, Routes } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import CrearCliente from "./components/cliente/CrearCliente.js";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Bienvenido</h1>} />
        <Route path="/crear-cliente" element={<CrearCliente />} />
      </Routes>
    </div>
  );
}

export default App;
