import React from "react"

const UserContext = React.createContext({
	user:JSON.parse(localStorage.getItem("user")) || null,
	isLoading:false,
	error:false,
})

export default UserContext