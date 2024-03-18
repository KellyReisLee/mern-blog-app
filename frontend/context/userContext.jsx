import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});


const userData = localStorage.getItem('user-data')
const userDataObject = JSON.parse(userData);


export function UserContextProvider({ children }) {
  const [totalData, setTotalData] = useState([]);
  const [userData, setUserData] = useState({} || userDataObject);

  // useEffect(() => {

  //   const timer = setTimeout(() => {

  //     localStorage.removeItem('user-data');
  //     window.location.reload(true)
  //   }, 3600000);


  //   return () => clearTimeout(timer);
  // }, []);


  return (
    <UserContext.Provider value={{ totalData, setTotalData, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )

}