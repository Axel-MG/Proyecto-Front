import { Link } from "react-router";
import { useContext, useState } from "react";
import { ClienteContext } from "../context/ClienteContext";
import { CarritoContext } from "../context/CarritoContext";
import { Modal, Button, Badge } from "react-bootstrap";
import CarritoModal from "./pedido/CarritoModal";

const Navbar = () => {
  const { cliente } = useContext(ClienteContext);
  const { carrito, total } = useContext(CarritoContext);
  const [showCarrito, setShowCarrito] = useState(false);

  const handleCerrar = () => setShowCarrito(false);
  const handleMostrar = () => setShowCarrito(true);

  return (
    <>
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
        <div className="d-flex align-items-center">
          <span className="navbar-text me-3">
           {cliente
             ? `Cliente Seleccionado: ${cliente.nombre}`
             : "No hay cliente seleccionado"}
         </span>
          <Button variant="outline-light" onClick={handleMostrar} style={{ position: "relative" }}>
              🛒 Carrito - ${total.toFixed(2)}
              {carrito.length > 0 && (
                <Badge bg="danger" pill style={{ position: "absolute", top: 0, right: 0 }}>
                  {carrito.reduce((acc, p) => acc + p.cantidad, 0)}
                </Badge>
              )}
          </Button>
          </div>
        </div>
    </nav>
    {/* Modal carrito */}
      <Modal show={showCarrito} onHide={handleCerrar} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Carrito de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CarritoModal />
        </Modal.Body>
      </Modal>
  </>
  );
};

export default Navbar;
