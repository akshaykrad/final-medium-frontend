import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { useLocation } from 'react-router-dom'
import ListItem from './ListItem'
import axios from 'axios'

export default function ListPage() {

	const [articles,setArticles] = useState([])
	const [isLoading,setIsLoading] = useState(true)
	const [update,setUpdate] = useState(true)

	const location = useLocation()
	const data = location.state

	const user = JSON.parse(localStorage.getItem('user'));

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});

	useEffect(()=>{
		const fetch = () =>{
			authAxios.get(`http://127.0.0.1:3000/lists/${data.id}`)
			.then((res)=>{
				setArticles(res.data.listItems)
				setIsLoading(false)
			})
			.catch((error) => {
			  console.error('Error:', error);
			});
		  }
		  fetch()
	},[update])

	const handleRemove = id =>{
		const obj = {article_id:id}
		console.log(obj)
		authAxios.delete(`http://127.0.0.1:3000/listitems/${data.id}`,{data:obj})
		.then((res)=>{
			setUpdate(prev=>!prev)
			// console.log(res)
		}).catch((error)=>{
			console.error('Error:', error);
		})
	}

  return (
	<div>
		<NavBar />
		<h2 className='ms-4 fw-bold mt-2'>{data.name}</h2>
		{
			!isLoading && 
			articles.map(listItem=>{
				return (<ListItem item={listItem} handleRemove={handleRemove}/>)
			})
		}
	</div>
  )
}
