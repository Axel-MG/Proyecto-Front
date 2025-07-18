import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { ClienteContext } from "../../context/ClienteContext";
import { useNavigate } from "react-router";

function ListarClientes() {
  const [clientes, setClientes] = useState([]);
  const [show, setShow] = useState(false);
  const { setCliente } = useContext(ClienteContext);
  const navigate = useNavigate();

  const handleShow = () => {
    setShow(true);
    obtenerClientes(); // 👈 Cargar clientes al abrir el modal
  };

  const handleClose = () => setShow(false);

  const obtenerClientes = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/cliente/listarClientes"
      );
      if (!res.ok) throw new Error("Error al obtener clientes");
      const data = await res.json();
      setClientes(data);
    } catch (err) {
      console.error("Error al obtener clientes:", err);
    }
  };

  const handleSeleccionar = (cliente) => {
    setCliente(cliente);
    alert(`Cliente seleccionado: ${cliente.nombre}`);
  };

  const handleEliminar = async (id) => {
    const confirm = window.confirm("¿Seguro que deseas eliminar este cliente?");
    if (!confirm) return;
    try {
      const res = await fetch(`http://localhost:8080/api/cliente/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Cliente eliminado correctamente");
        // ✅ Filtramos localmente el cliente eliminado
        setClientes((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("No se pudo eliminar el cliente");
      }
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      alert("Error al eliminar cliente");
    }
  };

  const handleEditar = (id) => {
    navigate(`/editar-cliente/${id}`);
  };

  return (
    <div className="mt-4">
      <Button variant="primary" onClick={handleShow}>
        Mostrar lista de clientes
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Clientes Registrados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clientes.length === 0 ? (
            <p className="text-center text-muted">
              No hay clientes registrados.
            </p>
          ) : (
            <div className="row">
              {clientes.map((cliente) => (
                <div className="col-md-6" key={cliente.id}>
                  <div className="card mb-3 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{cliente.nombre}</h5>
                      <p className="card-text">{cliente.correo}</p>
                      <div className="d-flex flex-wrap gap-1">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() =>
                            navigate(`/pedidos-cliente/${cliente.id}`)
                          }
                        >
                          Ver Pedidos
                        </Button>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => handleSeleccionar(cliente)}
                        >
                          Seleccionar
                        </Button>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEditar(cliente.id)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleEliminar(cliente.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListarClientes;
