import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ListarProductos() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/producto/lista")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al obtener productos", err));
  }, []);

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/producto/${id}`, {
        method: "DELETE",
      });

      if (res.status === 204) {
        setProductos(productos.filter((p) => p.id !== id));
        alert("Producto eliminado");
      } else {
        alert("Error al eliminar el producto");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("No se pudo eliminar");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Lista de Productos</h1>
      <div className="row">
        {productos.map((prod) => (
          <div key={prod.id} className="col-md-4 position-relative">
            <div className="card mb-3">
              {/* Botón eliminar (esquina superior izquierda) */}
              <button
                onClick={() => eliminarProducto(prod.id)}
                className="position-absolute"
                style={{
                  top: "5px",
                  left: "5px",
                  background: "transparent",
                  border: "none",
                  color: "red",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                title="Eliminar producto"
              >
                ✖
              </button>

              {/* Botón editar (esquina superior derecha) */}
              <button
                onClick={() => navigate(`/editar-producto/${prod.id}`)}
                className="position-absolute"
                style={{
                  top: "5px",
                  right: "5px",
                  background: "transparent",
                  border: "none",
                  color: "#0d6efd", // azul
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                title="Editar producto"
              >
                ✏️
              </button>

              {prod.imagen && (
                <img
                  src={prod.imagen}
                  alt={prod.nombre}
                  className="card-img-top"
                  style={{ maxHeight: "200px", objectFit: "contain" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text">Precio: ${prod.precio}</p>
                <p className="card-text">Stock: {prod.stock}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListarProductos;
