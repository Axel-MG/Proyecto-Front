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
    return <div className="text-center mt-5">Cargando...</div>;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="ticket p-4 border rounded shadow-sm bg-white"
        style={{ width: "380px" }}
      >
        <h4 className="text-center mb-3">TICKET DE COMPRA</h4>

        <div className="mb-2">
          <strong>Pedido ID:</strong> #{pedido.id}
          <br />
          <strong>Fecha:</strong> {pedido.fecha}
          <br />
          <strong>Cliente:</strong> {pedido.clienteNombre}
        </div>

        <hr />

        <div>
          {pedido.productos.map((detalle, i) => (
            <div
              key={i}
              className="d-flex justify-content-between border-bottom py-1"
            >
              <div>
                <div style={{ fontWeight: "bold" }}>
                  {detalle.productoNombre}
                </div>
                <div style={{ fontSize: "0.85rem" }}>
                  {detalle.cantidad} x ${detalle.productoPrecio.toFixed(2)}
                </div>
              </div>
              <div className="text-end" style={{ fontWeight: "bold" }}>
                ${detalle.subtotal.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <hr />

        <div className="d-flex justify-content-between mt-2">
          <strong>Total:</strong>
          <strong>${pedido.total.toFixed(2)}</strong>
        </div>

        <p
          className="text-center mt-3"
          style={{ fontSize: "0.8rem", color: "#666" }}
        >
          ¡Gracias por su compra!
        </p>
      </div>
    </div>
  );
}

export default DetallePedido;
