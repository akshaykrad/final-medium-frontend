import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios'
import ReadLaterCard from './ReadLaterCard'

export default function SavedLater() {
	const [data,setData] = useState([])
	const [update,setUpdate] = useState(false)

	const user = JSON.parse(localStorage.getItem('user'));

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});

	
	useEffect(()=>{
		const fetchSaved = async() =>{
			const result = await authAxios.get("http://127.0.0.1:3000/saveforlaters")
			setData(result.data)
		}
		fetchSaved()
	},[update])

	const removeHandler = id =>{
		authAxios.delete(`http://127.0.0.1:3000/saveforlaters/${id}`)
		.then((res)=>{
			setUpdate(prev=>!prev)
		}).catch((error)=>{
			console.error('Error:', error);
		})
	}
	
  return (
	<div>
		<NavBar/>
		<h2 className='ms-4 fw-bold mt-2'>Saved for Later</h2>
		{
			data.map((item)=>{
				return (<ReadLaterCard article_id={item.article_id} onRem={removeHandler}/>)
			})
		}
	</div>
  )
}
