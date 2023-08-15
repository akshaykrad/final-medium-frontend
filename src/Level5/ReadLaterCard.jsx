import classes from './Drafts/DraftsCard.module.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ReadLaterCard(props) {
	const [data,setData] = useState([])
	const [isLoading,setIsLoading] = useState(true)
	const [del,setDel] = useState(true)

	const user = JSON.parse(localStorage.getItem('user'));
	const navigate = useNavigate()

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});

	useEffect(()=>{
		authAxios.get(`http://127.0.0.1:3000/articles/${props.article_id}`)
		.then((res)=>{
			setData(res.data)
			setIsLoading(false)
		}).catch((error)=>{
			console.error('Error:', error);
		})
	},[del])

	const handleReadMore = () =>{
		navigate(`/readmore/${data.id}`,{state:{ item:data }})
	}

	

	return (
		<div className={`card-body ms-4 card ${classes['card-container']}`}>
		{ !isLoading && 
			<>
			<div onClick={handleReadMore}>
				<h2 className={`${classes.title} ${classes.details}`}>{data.title}</h2>
				<p className={`mb-2 ${classes.details}`}>{data.description.slice(0,300)}...</p>
			</div>
			</>
		}
		<button className={classes.btnRemove} onClick={()=>props.onRem(props.article_id)}>Remove</button>
		</div>
	  )
}
