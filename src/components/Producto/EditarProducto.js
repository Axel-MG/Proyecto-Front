import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imagenBase64, setImagenBase64] = useState("");

  // Obtener datos del producto al montar
  useEffect(() => {
    fetch(`http://localhost:8080/api/producto/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNombre(data.nombre);
        setPrecio(data.precio);
        setStock(data.stock);
        setImagenBase64(data.imagen || "");
      })
      .catch((err) => {
        console.error("Error al obtener producto", err);
        alert("Producto no encontrado");
        navigate("/");
      });
  }, [id, navigate]);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productoActualizado = {
      id: parseInt(id),
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      imagen: imagenBase64,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/producto/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoActualizado),
      });

      if (response.ok) {
        alert("Producto actualizado");
        navigate("/");
      } else {
        const error = await response.json();
        alert("Error al actualizar: " + (error.message || "verifica los datos"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo actualizar");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Editar Producto</h1>
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImagenChange} />
        </Form.Group>
        <button type="submit" className="btn btn-primary">Actualizar Producto</button>
      </form>
    </div>
  );
}

export default EditarProducto;
