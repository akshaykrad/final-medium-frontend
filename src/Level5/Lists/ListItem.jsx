import classes from '../Drafts/DraftsCard.module.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ListItem(props) {
	const [item,setItem] = useState()
	const [isLoading,setIsLoading] = useState(true)
	
	const navigate = useNavigate()
	const user = JSON.parse(localStorage.getItem('user'));

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});
	// console.log(props.item.article_id)
	useEffect(()=>{
		authAxios.get(`http://127.0.0.1:3000/articles/${props.item.article_id}`)
		.then((res)=>{
			setItem(res.data)
			setIsLoading(false)
		}).catch((error)=>{
			console.error('Error:', error);
		})
	},[])
	

	const handleReadMore = () =>{
		navigate(`/readmore/${item.id}`,{state:{ item:item }})
	}

  return (
	  	<>
		{ !isLoading && 
			<div className={`card-body ms-4 card ${classes['card-container']}`}>
			<div onClick={handleReadMore}>
			<h2 className={`${classes.title} ${classes.details}`}>{item.title}</h2>
			<p className={`mb-2 ${classes.details}`}>{item.description.slice(0,300)}...</p>
			</div>
			<button className={classes.btnRemove} onClick={()=>{props.handleRemove(item.id)}}>Remove</button>
			</div>
		}
		</>
	  )
}
