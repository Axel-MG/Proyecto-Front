// App.js
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/Navbar";
import CrearCliente from "./components/cliente/CrearCliente";
import CrearProducto from "./components/Producto/CrearProducto";
import ListarProductos from "./components/Producto/ListarProducto";
import EditarProducto from "./components/Producto/EditarProducto";
import PedidosCliente from "./components/pedido/PedidosCliente";
import DetallePedido from "./components/pedido/DetallePedido";
import EditarCliente from "./components/cliente/EditarCliente";
import SliderProductos from "./components/Producto/SliderProducto.js";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<SliderProductos />} />
        <Route path="/crear-cliente" element={<CrearCliente />} />
        <Route path="/editar-cliente/:id" element={<EditarCliente />} />
        <Route path="/crear-producto" element={<CrearProducto />} />
        <Route path="/editar-producto/:id" element={<EditarProducto />} />
        <Route path="/pedidos-cliente/:id" element={<PedidosCliente />} />
        <Route path="/detalle-pedido/:id" element={<DetallePedido />} />
        <Route path="/listar-productos" element={<ListarProductos />} />
      </Routes>
    </div>
  );
}

export default App;
