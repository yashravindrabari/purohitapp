/* eslint-disable react/prop-types */
import { Navigate } from "react-router"

export const ProtectedRouteForUser = ({children}) => {
    const user = JSON.parse(localStorage.getItem('users'))
    const token = localStorage.getItem('authToken')
    if (token && user) {
      return children
    }
    else {
      return <Navigate to={'/login'}/>
    }
}