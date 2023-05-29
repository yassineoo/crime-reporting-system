import { createContext, useState } from "react";

export const globalContext = createContext({});


export function ContextWrapper({ children }) {
  const [user, setUser] = useState();

  return (
    <globalContext.Provider value={{user, setUser}}>
        {children}
        </globalContext.Provider>
  );
}
