
import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [totalData, setTotalData] = useState([]);
  const [userData, setUserData] = useState([]);


  return (
    <UserContext.Provider value={{ totalData, setTotalData, userData, setUserData, }}>
      {children}
    </UserContext.Provider>
  )

}