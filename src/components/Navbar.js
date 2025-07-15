import { Link } from "react-router";
import { useContext } from "react";
import { ClienteContext } from "../context/ClienteContext";

const Navbar = () => {
  const { cliente } = useContext(ClienteContext);

  return (
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
            <li className="nav-item">
              <Link className="nav-link" to="/listar-productos">
                Listar Productos
              </Link>
            </li>
          </ul>
        </div>
        <span className="navbar-text">
          {cliente
            ? `Cliente Seleccionado: ${cliente.nombre}`
            : "No hay cliente seleccionado"}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
