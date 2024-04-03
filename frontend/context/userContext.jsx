
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

// const userDataStorage = localStorage.getItem('user-data')
// const userDataObject = JSON.parse(userDataStorage);

export function UserContextProvider({ children }) {
  const [totalData, setTotalData] = useState([]);
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false)





  // useEffect(() => {
  //   localStorage.setItem('user-data', JSON.stringify(userData || {}))
  // setUserData(userDataObject)
  // console.log(userData);

  // }, [userData])

  return (
    <UserContext.Provider value={{ totalData, setTotalData, userData, setUserData, setLoggedIn, loggedIn }}>
      {children}
    </UserContext.Provider>
  )

}