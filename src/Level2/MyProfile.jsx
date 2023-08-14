import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classes from './Profile.module.css'
import NavBar from '../components/NavBar'
import AllPosts from '../Level5/AllPosts'
import Drafts from '../Level5/Drafts/Drafts'
import Lists from '../Level5/Lists/Lists'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'


export default function MyProfile() {

	const [box,setBox] = useState(1)
	const [postData,setPostData] = useState([])
	const [userData, setUserData] = useState({})

	const navigate = useNavigate()
	
	const user = JSON.parse(localStorage.getItem('user'));

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});

	const {user_id} = jwtDecode(user.token)
	

	useEffect(()=>{
		authAxios.get(`http://127.0.0.1:3000/users/${user_id}`)
		.then((res)=>{
			setUserData(res.data.user)
			setPostData(res.data.articles)
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	},[])


  return (
  <>
	<NavBar />
	<div className={classes.container}>

		<div className={classes.details}>
			<h2 className='ms-4 fw-bold mb-2 mt-5'>{userData.username}</h2>

		{/* ---------------ALL POSTS -------------- */}
			{box===1 && <AllPosts postData={postData}/>}
			{box===2 && <Drafts />}
			{box===3 && <Lists/>}
		{/* ----------------------------- */}

		
		</div>
		<div className={classes.divider}></div>
		<div className={classes.profile}>
			<img className='mt-4 ms-4' src='https://cdn-icons-png.flaticon.com/128/149/149071.png' width='120px' height='120px'/>
			<div className={`ms-4 mt-2 ${classes.user}`}>
				<h5>{userData.username}</h5>
				<div className='text-success'>{userData.email}</div>
				<button className={classes.membership} onClick={()=>{navigate('/membership')}}>Membership</button>
				<hr />
				<div className={classes.link} onClick={()=>{setBox(1)}}><h5>All Posts</h5></div>
				<hr />
				<div className={classes.link} onClick={()=>{setBox(2)}}><h5>Drafts</h5></div>
				<hr />
				<div className={classes.link} onClick={()=>{setBox(3)}}><h5>Lists</h5></div>
				<hr />
			</div>
		</div>
	</div>
  </>
  )
}
