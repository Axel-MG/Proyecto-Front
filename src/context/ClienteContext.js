import { createContext } from "react";
import { useState } from "react";
const ClienteContext = createContext();

function ClienteProvider({ children }) {
  const [cliente, setCliente] = useState(null);

  return (
    <ClienteContext.Provider value={{ cliente, setCliente }}>
      {children}
    </ClienteContext.Provider>
  );
}
export { ClienteContext, ClienteProvider };
