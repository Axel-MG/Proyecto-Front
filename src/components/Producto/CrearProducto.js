import Form from "react-bootstrap/Form";
import { useState } from "react";

function CrearProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imagenBase64, setImagenBase64] = useState("");

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenBase64(reader.result); // Base64 completa
      };
      reader.readAsDataURL(file); // Lee imagen como Base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      imagen: imagenBase64, // Enviar imagen como base64
    };

    try {
      const response = await fetch("http://localhost:8080/api/producto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Producto creado:", data);
        alert("Producto creado exitosamente");
        setNombre("");
        setPrecio("");
        setStock("");
        setImagenBase64("");
      } else {
        const error = await response.json();
        alert("Error al crear producto: " + (error.message || "verifica los datos"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Crear Producto</h1>
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            minLength={3}
            maxLength={50}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            min="1"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagen del Producto</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
          />
        </Form.Group>

        <button type="submit" className="btn btn-success">Crear Producto</button>
      </form>
    </div>
  );
}

export default CrearProducto;
