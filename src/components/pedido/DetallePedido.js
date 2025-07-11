// components/pedido/DetallePedido.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetallePedido() {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const obtenerDetalle = async () => {
      const response = await fetch(`http://localhost:8080/api/pedidos/${id}`);
      const data = await response.json();
      setPedido(data);
    };
    obtenerDetalle();
  }, [id]);

  if (!pedido) return <div className="container mt-5">Cargando...</div>;

  return (
    <div className="container mt-5">
      <h2>Detalle del Pedido #{pedido.id}</h2>
      <p><strong>Cliente:</strong> {pedido.cliente.nombre} ({pedido.cliente.correo})</p>
      <p><strong>Fecha:</strong> {pedido.fecha}</p>

      <h4>Productos</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {pedido.detalles.map((detalle, i) => (
            <tr key={i}>
              <td>{detalle.producto.nombre}</td>
              <td>{detalle.cantidad}</td>
              <td>${detalle.producto.precio.toFixed(2)}</td>
              <td>${detalle.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h5 className="text-end mt-4">Total: <strong>${pedido.total.toFixed(2)}</strong></h5>
    </div>
  );
}

export default DetallePedido;
