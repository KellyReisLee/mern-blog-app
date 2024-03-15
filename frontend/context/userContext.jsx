import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});


const userData = localStorage.getItem('user-data')
const userDataObject = JSON.parse(userData);


export function UserContextProvider({ children }) {
  const [totalData, setTotalData] = useState([]);
  const [userData, setUserData] = useState({} || userDataObject);



  // useEffect(() => {

  //   axios.get('').then(({ data }) => {
  //     setUser(data)
  //   })


  // }, [])

  return (
    <UserContext.Provider value={{ totalData, setTotalData, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )

}