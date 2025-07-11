import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function PedidosCliente() {
  const { id } = useParams();
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPedidos = async () => {
      const response = await fetch(
        `http://localhost:8080/api/pedido/pedidosCliente/${id}`
      );
      const data = await response.json();
      setPedidos(data);
    };
    obtenerPedidos();
  }, [id]);

  return (
    <div className="container mt-5">
      <h1>Pedidos del Cliente</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th># Pedido</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.fecha}</td>
              <td>${pedido.total.toFixed(2)}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => navigate(`/detalle-pedido/${pedido.id}`)}
                >
                  Ver Detalles
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PedidosCliente;
