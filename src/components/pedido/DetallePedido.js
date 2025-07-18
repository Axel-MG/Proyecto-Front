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
    <div className="container my-5 d-flex justify-content-center">
      <div
        className="ticket bg-white"
        style={{
          width: "300px",
          padding: "20px",
          fontFamily: "'Roboto Mono', monospace",
          fontSize: "14px",
          lineHeight: "1.4",
          border: "1px solid #ccc",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          whiteSpace: "pre-wrap",
        }}
      >
        <div
          style={{
            textAlign: "center",
            borderBottom: "1px dashed #000",
            paddingBottom: "10px",
            marginBottom: "10px",
          }}
        >
          <img
            src="/logo-empresa.png"
            alt="Logo tienda"
            className="img-fluid w-100 mb-2"
          />
          <strong style={{ fontSize: "16px" }}>TIENDA DE EJEMPLO</strong>
          <div>RFC: XOXOXOXOXOXO</div>
          <div>Dirección: Calle Fictizia 123, TECAMAYORK</div>
          <div>Caja: 1</div>
          <div>Folio: #</div>
          <div>Fecha: {pedido.fecha}</div>
          <div>Hora:</div>
          <div>Atendió: {pedido.empleado}</div>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <strong>Pedido ID:</strong> #{pedido.id}
          <br />
          <strong>Cliente:</strong> {pedido.clienteNombre}
          <br />
          <strong>Tipo comprobante:</strong> Ticket
        </div>

        <div
          style={{
            borderTop: "1px dashed #000",
            borderBottom: "1px dashed #000",
            padding: "10px 0",
          }}
        >
          {pedido.productos.map((detalle, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>{detalle.productoNombre}</strong>
                  <br />
                  Código: {detalle.productoId}
                  <br />
                  {detalle.cantidad} x ${detalle.productoPrecio.toFixed(2)}
                </div>
                <div style={{ textAlign: "right", fontWeight: "bold" }}>
                  ${detalle.subtotal.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "15px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            <div>Total:</div>
            <div>${pedido.total.toFixed(2)}</div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            borderTop: "1px dashed #000",
            marginTop: "15px",
            paddingTop: "10px",
          }}
        >
          <div>¡GRACIAS POR SU COMPRA!</div>
          <div>Vuelva pronto</div>
          <div style={{ fontSize: "12px", marginTop: "5px" }}>
            Visite: www.tienda.com
            <br />
            WhatsApp: 55-0000-0000
            <br />
            Instagram: @tienda_demo
          </div>
          <div
            style={{
              borderTop: "1px dashed #000",
              borderBottom: "1px dashed #000",
              padding: "10px 0",
            }}
          >
            <div style={{ fontSize: "12px" }}>PRECIOS BAJOS TODOS LOS DIAS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallePedido;
