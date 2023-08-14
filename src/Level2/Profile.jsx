import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import classes from './Profile.module.css'
import NavBar from '../components/NavBar'
import AllPosts from '../Level5/AllPosts'
import Drafts from '../Level5/Drafts/Drafts'
import Lists from '../Level5/Lists/Lists'
import jwtDecode from 'jwt-decode'


export default function Profile() {

	const [box,setBox] = useState(1)
	const [follow,setFollow] = useState(false)
	const [postData,setPostData] = useState([])
	const [userData, setUserData] = useState({})
	const [myProfile, setMyProfile] = useState(false)

	const location = useLocation()
	const clicked_id = location.state.obj
	const navigate = useNavigate()
	
	const user = JSON.parse(localStorage.getItem('user'));

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});

	const {user_id} = jwtDecode(user.token)
	

	useEffect(()=>{
		authAxios.get(`http://127.0.0.1:3000/users/${clicked_id}`)
		.then((res)=>{
			console.log(res.data)
			setUserData(res.data.user)
			setPostData(res.data.articles)
			const foundAsFollowing = res.data.followers.find(item => item.follower_id==user_id)
			if(foundAsFollowing){
				setFollow(true)
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
		if(user_id === clicked_id){
			setMyProfile(true)
		}
	},[])

	const handleFollow = () =>{
		setFollow(prev => !prev)
		authAxios.post(`http://127.0.0.1:3000/friendships/${clicked_id}`)
		.then((res)=>{
			console.log(res.data)
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
	const handleUnfollow = () =>{
		setFollow(prev => !prev)
		authAxios.delete(`http://127.0.0.1:3000/friendships/${clicked_id}`)
		.then((res)=>{
			console.log(res.data)
		})
	}

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
				{
					!myProfile && !follow && 
					<button className={classes.follow} onClick={handleFollow}>Follow</button>
				}
				{
					!myProfile && follow && 
					<button className={classes.following} onClick={handleUnfollow}>Following</button>
				}
				{
					myProfile &&
					<button className={classes.membership} onClick={()=>{navigate('/membership')}}>Membership</button>
				}

				<hr />
				<div className={classes.link} onClick={()=>{setBox(1)}}><h5>All Posts</h5></div>
				<hr />
				{myProfile &&
					<>
					<div className={classes.link} onClick={()=>{setBox(2)}}><h5>Drafts</h5></div>
					<hr />
					<div className={classes.link} onClick={()=>{setBox(3)}}><h5>Lists</h5></div>
					<hr />
					</>
				}
			</div>
		</div>
	</div>
  </>
  )
}
