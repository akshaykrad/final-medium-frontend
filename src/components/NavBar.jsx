import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './NavBar.module.css'
import axios from 'axios'

export default function NavBar(props) {

	const [valid,setValid] = useState(false)


	const user = JSON.parse(localStorage.getItem('user'));

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});
	useEffect(()=>{
		if(user){
			setValid(true)
		}
	},[valid])
	const navigate = useNavigate()

	const onSignIn = () =>{
		navigate('/signin')
	}
	const gotoProfile = () =>{
		navigate('/myprofile')
	}
	const gotoaddPost = () =>{
		navigate('/addPost')
	}
	const gohome = () =>{
		navigate('/')
	}
	const onlogout = () =>{
		setValid(false)
	}
	const searching = (e) =>{
		const query = e.target.value
		if(query.trim()===''){
			return;
		}
		props.searchHandler(query)
	}
  return (
	<>
	<div className='navbar w-100'>
		<div className='d-flex px-2'>
			<svg onClick={gohome} className={classes['med-logo']} viewBox="0 0 1043.63 592.71"><g data-name="Layer 2"><g data-name="Layer 1"><path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path></g></g></svg>
			<div className={classes.search}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M4.1 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0zm6.94-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .8-.79l-3.74-3.73A8.05 8.05 0 0 0 11.04 3v.01z" fill="currentColor"></path></svg>
				<input onChange={searching} className={classes.searchIp} type='text' placeholder='Search Medium'/>
			</div>
			<button className='btn border border-success m-1' onClick={()=>{navigate('/allusers')}}>All users</button>
			<button className='btn border border-success m-1' onClick={()=>{navigate('/alltopics')}}>All Topics</button>
		</div>
		<div>
			{
				!valid && <>
					<button className='btn btn-success m-1' onClick={onSignIn}>Sign In</button>
				</>
			}
			{
				valid && 
				<>
					<svg onClick={gotoaddPost} className={classes.write} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Write"><path d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z" fill="currentColor"></path><path d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2" stroke="currentColor"></path></svg>
					<span onClick={gotoaddPost} className={classes.write}>Write</span>
					
					<img onClick={gotoProfile} className={`mx-2 ${classes['user-img']}`} src='https://cdn-icons-png.flaticon.com/128/149/149071.png' width='40px' height='40px'/>
					<button className='btn btn-warning m-1' onClick={onlogout}>Log Out</button>
				</> 
			}
		</div>
	</div>
	<hr className='mb-0 mt-1'/>
	</>
  )
}
