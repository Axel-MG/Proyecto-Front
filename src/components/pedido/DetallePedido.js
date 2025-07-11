// components/pedido/DetallePedido.js
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function DetallePedido() {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const obtenerDetalle = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/pedido/pedido/${id}`
        );
        if (!response.ok)
          throw new Error("Error al obtener el detalle del pedido");
        const data = await response.json();
        setPedido(data);
      } catch (error) {
        console.error("Error:", error);
        setPedido(null);
      }
    };
    obtenerDetalle();
  }, [id]);

  if (!pedido || !Array.isArray(pedido.productos))
    return <div>Cargando...</div>;

  return (
    <div className="container mt-5">
      <h2>Detalle del Pedido #{pedido.id}</h2>
      <p>
        <strong>Fecha:</strong> {pedido.fecha}
      </p>

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
          {pedido.productos.map((detalle, i) => (
            <tr key={i}>
              <td>{detalle.productoNombre}</td>
              <td>{detalle.cantidad}</td>
              <td>${detalle.productoPrecio}</td>
              <td>${detalle.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h5 className="text-end mt-4">
        Total: <strong>${pedido.total}</strong>
      </h5>
    </div>
  );
}

export default DetallePedido;
