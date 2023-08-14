import React, { useReducer } from 'react'
import UserContext from './user-context'
import reducerFn from './reducerFn'

const defaultState = {
	user:JSON.parse(localStorage.getItem("user")) || null,
	isLoading:false,
	error:false,
}

export default function UserProvider(props) {
	const [userState,dispatchUserState] = useReducer(reducerFn,defaultState)




	const authObj = {
		user: userState.user,
        isLoading: userState.isLoading,
        error: userState.error,
        dispatchUserState,
	}


  return (
	<UserContext.Provider value={authObj}>
		{props.children}
	</UserContext.Provider>
  )
}
