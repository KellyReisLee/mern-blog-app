import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});


const userData = localStorage.getItem('user-data')

export function UserContextProvider({ children }) {
  const [totalData, setTotalData] = useState([]);
  const [userData, setUserData] = useState({});




  return (
    <UserContext.Provider value={{ totalData, setTotalData, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )

}