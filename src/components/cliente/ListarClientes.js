import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ClienteContext } from "../../context/ClienteContext";
import { useNavigate } from "react-router";
function ListarClientes() {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { setCliente } = useContext(ClienteContext);
  const navigate = useNavigate();

  const handleClienteClick = (cliente) => {
    setCliente(cliente);
    alert(`Cliente seleccionado: ${cliente.nombre}`);
    console.log("Cliente seleccionado:", cliente);
  };

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const respuesta = await fetch(
          "http://localhost:8080/api/cliente/listarClientes"
        );
        if (!respuesta.ok) {
          throw new Error("No hay clientes");
        }
        const data = await respuesta.json();
        setClientes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };
    obtenerClientes();
  }, []);

  if (cargando) {
    return <p>Cargando</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="container mt-5">
      <h1>Lista de Clientes</h1>
      <Button variant="primary" onClick={handleShow}>
        Mostrar lista de clientes
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Clientes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group">
            {clientes.map((cliente) => (
              <li
                key={cliente.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                onClick={() => handleClienteClick(cliente)}
              >
                <div>
                  {cliente.nombre} - {cliente.correo}
                </div>
                <Button
                  variant="success"
                  onClick={() => navigate(`/pedidos-cliente/${cliente.id}`)}
                >
                  Ver Pedidos
                </Button>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ListarClientes;
