
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

// const userDataStorage = localStorage.getItem('user-data')
// const userDataObject = JSON.parse(userDataStorage);

export function UserContextProvider({ children }) {
  const [totalData, setTotalData] = useState([]);
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false)




  return (
    <UserContext.Provider value={{ totalData, setTotalData, userData, setUserData, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  )

}