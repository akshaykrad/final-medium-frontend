import React from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './UserCard.module.css'

export default function UsersCard(props) {

	const navigate = useNavigate()

	const gotoprofile =()=>{
		const obj = props.item.id
		navigate(`/profile/${props.item.id}`,{state:{obj}})
	}



  return (
	<div className={`${classes.container} container d-flex border border-primary mt-3`} onClick={gotoprofile}>
		{/* <div className='border border-danger' style={{borderRadius: '8px'}}>Image</div> */}
		<div  className='d-flex align-items-center'>
			<img src='https://cdn-icons-png.flaticon.com/128/149/149071.png' style={{width:'50px',height:'50px'}}></img>

		</div>
		<div className='px-3 py-1'>
			<div><span className='text-primary'>Username:</span>{props.item.username}</div>
			<div><span className='text-primary'>Email:</span>{props.item.email}</div>
			<div><span className='text-primary'>Aricles Published:</span>200</div>
			<div><span className='text-primary'>Joined at:</span>{new Date(props.item.created_at).toLocaleString()}</div>
		</div>
	</div>
  )
}
