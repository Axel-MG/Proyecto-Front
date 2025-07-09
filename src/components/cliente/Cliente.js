function CrearCliente() {
  return (
    <div>
      <form>
        <div>
          <label>
            Nombre:
            <input type="text" name="nombre" placeholder="Nombre del cliente" />
          </label>
        </div>
        <div>
          <label>
            Correo Electrónico:
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico del cliente"
            />
          </label>
        </div>
        <button type="submit">Crear Cliente</button>
      </form>
    </div>
  );
}
export default CrearCliente;
