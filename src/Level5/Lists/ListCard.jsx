import React, { useRef } from 'react'
import classes from './ListCard.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ListCard(props) {
	const navigate = useNavigate()
  const userRef = useRef()

  const user = JSON.parse(localStorage.getItem('user'));

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});

  const handleRedirect = () =>{
    const item = props.list
    navigate(`/lists/${props.id}`,{state:item})
  }

  const shareHandler = id =>{
    const obj = {user_id:userRef.current.value,list_id:props.id}
    authAxios.post(`http://127.0.0.1:3000/listShare`,obj)
		.then((res)=>{
			// setUpdate(prev=>!prev)
      console.log(res.data)
		}).catch((error)=>{
			console.error('Error:', error);
		})
  }


  return (
	<div className={`card-body ms-4 card ${classes['card-container']}`}>
    <p>List id - {props.id} </p>
		<div onClick={handleRedirect}>
			<h2 className={`${classes.title} ${classes.details}`}>{props.name}</h2>
		</div>
		<div className='d-flex align-items-center'>
      <input ref={userRef} className={classes.input} placeholder='Which User'/>
      <button className={classes.btnShare} onClick={shareHandler}>Share</button>
      <button className={classes.btnDelete} onClick={()=>{props.deleteHandler(props.id)}}>Delete</button>
		</div>
	</div>
  )
}
