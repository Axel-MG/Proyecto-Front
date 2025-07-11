import Form from "react-bootstrap/form";
import { useState } from "react";
import ListarClientes from "./ListarClientes";

function CrearCliente() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoCliente = {
      nombre: nombre,
      correo: correo,
    };
    try {
      const response = await fetch("http://localhost:8080/api/cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoCliente),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Cliente creado:", data);
        setNombre("");
        setCorreo("");
        alert("Cliente creado exitosamente");
      } else {
        alert("Error al crear el cliente");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear el cliente");
    }
  };
  return (
    <div className="container mt-5">
      <ListarClientes />
      <h1>Crear Cliente</h1>
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre del cliente"
            value={nombre}
            minLength={3}
            maxLength={35}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese el correo electrónico del cliente"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </Form.Group>
        <button type="submit" className="btn btn-primary">
          Crear Cliente
        </button>
      </form>
    </div>
  );
}
export default CrearCliente;
