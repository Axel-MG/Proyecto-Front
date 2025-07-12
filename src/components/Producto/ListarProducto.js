import { useEffect, useState } from "react";

function ListarProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/producto/lista")

      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al obtener productos", err));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Lista de Productos</h1>
      <div className="row">
        {productos.map((prod) => (
          <div key={prod.id} className="col-md-4">
            <div className="card mb-3">
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
