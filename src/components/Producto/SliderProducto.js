import { useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import { CarritoContext } from "../../context/CarritoContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function SliderProducto() {
  const [productos, setProductos] = useState([]);
  const { agregarProducto } = useContext(CarritoContext);

  useEffect(() => {
    fetch("http://localhost:8080/api/producto/lista")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al obtener productos", err));
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const recientes = [...productos].sort((a, b) => b.id - a.id).slice(0, 4);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Todos los productos</h2>
      <Slider {...sliderSettings}>
        {productos.map((prod) => (
          <div key={prod.id} className="p-2">
            <div className="card h-100 text-center" style={{ backgroundColor: "#e6f0ff" }}>
              {prod.imagen && (
                <img
                  src={prod.imagen}
                  alt={prod.nombre}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "contain" }}
                  loading="lazy"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{prod.nombre}</h5>
                <p>${prod.precio}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => agregarProducto(prod)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <h3 className="mt-5 mb-3">Nuevos Productos</h3>
      <Slider {...sliderSettings}>
        {recientes.map((prod) => (
          <div key={prod.id} className="p-2">
            <div className="card h-100 text-center" style={{ backgroundColor: "#e6f0ff" }}>
              {prod.imagen && (
                <img
                  src={prod.imagen}
                  alt={prod.nombre}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "contain" }}
                  loading="lazy"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{prod.nombre}</h5>
                <p>${prod.precio}</p>
                <button
                  className="btn btn-success"
                  onClick={() => agregarProducto(prod)}
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

// Flechas personalizadas
function SampleNextArrow({ onClick }) {
  return (
    <div
      style={{
        position: "absolute",
        right: "-25px",
        top: "40%",
        zIndex: 1,
        cursor: "pointer",
        color: "#007bff",
        fontSize: "2rem",
      }}
      onClick={onClick}
    >
      <FaArrowRight />
    </div>
  );
}

function SamplePrevArrow({ onClick }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "-25px",
        top: "40%",
        zIndex: 1,
        cursor: "pointer",
        color: "#007bff",
        fontSize: "2rem",
      }}
      onClick={onClick}
    >
      <FaArrowLeft />
    </div>
  );
}

export default SliderProducto;
