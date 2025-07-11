import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CrearCliente from "./components/cliente/CrearCliente.js";
function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Inicio
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/crear-cliente">
                  Crear Cliente
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/crear-producto">
                  Crear Producto
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Bienvenido</h1>} />
        <Route path="/crear-cliente" element={<CrearCliente />} />
      </Routes>
    </div>
  );
}

export default App;
