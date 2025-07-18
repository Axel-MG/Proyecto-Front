import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/cliente/${id}`);
        const data = await res.json();
        setNombre(data.nombre);
        setCorreo(data.correo);
      } catch (err) {
        console.error("Error al cargar cliente:", err);
      }
    };
    obtenerCliente();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clienteActualizado = { nombre, correo };
    try {
      const res = await fetch(`http://localhost:8080/api/cliente/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clienteActualizado),
      });
      if (res.ok) {
        alert("Cliente actualizado");
        navigate("/crear-cliente");
      } else {
        alert("Error al actualizar cliente");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Editar Cliente</h1>
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            minLength={3}
            maxLength={35}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </Form.Group>
        <button type="submit" className="btn btn-info">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditarCliente;
