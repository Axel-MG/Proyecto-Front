
import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { ClienteContext } from "../../context/ClienteContext";

function CarritoModal({ show, onClose }) {
  const { carrito, total, eliminarProducto, modificarCantidad, limpiarCarrito } = useContext(CarritoContext);
  const { cliente } = useContext(ClienteContext);
  const [loading, setLoading] = useState(false);

  const handleRealizarPedido = async () => {
    if (!cliente) {
      alert("Debe seleccionar un cliente antes de realizar el pedido.");
      return;
    }
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const pedido = {
      clienteId: cliente.id,
      productos: carrito.map((prod) => ({
        productoId: prod.id,
        cantidad: prod.cantidad,
      })),
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Pedido realizado con éxito. ID: ${data.id}`);
        limpiarCarrito();
        onClose();
      } else {
        const error = await response.json();
        alert("Error al realizar pedido: " + (error.message || "Intente más tarde"));
      }
    } catch (error) {
      alert("Error de conexión con el servidor.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {/* Lista de productos */}
            {carrito.map((prod) => (
              <div
                key={prod.id}
                className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2"
              >
                <div>
                  <strong>{prod.nombre}</strong> <br />
                  Precio: ${prod.precio.toFixed(2)}
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    min="1"
                    className="form-control form-control-sm me-2"
                    style={{ width: "70px" }}
                    value={prod.cantidad}
                    onChange={(e) =>
                      modificarCantidad(prod.id, parseInt(e.target.value))
                    }
                  />
                  <Button variant="danger" size="sm" onClick={() => eliminarProducto(prod.id)}>
                    Eliminar
                  </Button>
                </div>
                <div>Subtotal: ${(prod.precio * prod.cantidad).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="col-md-4 border-start ps-3">
            <h5>Resumen</h5>
            <p>
              Total: <strong>${total.toFixed(2)}</strong>
            </p>
            <Button
              variant="success"
              onClick={handleRealizarPedido}
              disabled={loading || carrito.length === 0 || !cliente}
            >
              {loading ? "Procesando..." : "Realizar pedido"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default CarritoModal;
