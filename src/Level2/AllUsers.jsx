import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UsersCard from './UserCard'
import NavBar from '../components/NavBar';

export default function AllUsers() {
	const [data,setData] = useState([])

	const user = JSON.parse(localStorage.getItem('user'));

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});

	const showUsers = url =>{
		authAxios.get(url)
		.then((res)=>{
			setData(res.data)
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}

	useEffect(()=>{
		const url = "http://127.0.0.1:3000/users"
		showUsers(url)
	},[])

	const searchHandler = searchQuery => {
		const url = `http://127.0.0.1:3000/userSearch?s=${searchQuery}`
		showUsers(url)
	}


  return (
	<div>
		<NavBar searchHandler={searchHandler}/>
		<h1 className='mx-4 ms-5 mt-2'>All Users</h1>
		{
			data.map((item)=>{
				return <UsersCard item={item} />
			})
		}
	</div>
  )
}
