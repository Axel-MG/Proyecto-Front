import { Route, Routes } from "react-router";
import { Link } from "react-router-dom"; // necesario si usas <Link>
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import CrearCliente from "./components/cliente/CrearCliente.js";
import CrearProducto from "./components/Producto/CrearProducto.js";


import PedidosCliente from "./components/pedido/PedidosCliente.js";
import DetallePedido from "./components/pedido/DetallePedido.js";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<h1>Bienvenido</h1>} />
        <Route path="/crear-cliente" element={<CrearCliente />} />
        <Route path="/crear-producto" element={<CrearProducto />} />
        <Route path="/pedidos-cliente/:id" element={<PedidosCliente />} />
        <Route path="/detalle-pedido/:id" element={<DetallePedido />} />
      </Routes>
    </div>
  );
}

export default App;
