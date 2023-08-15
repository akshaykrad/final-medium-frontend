import React, { useState } from 'react'
import PostList from '../Level1/Posts/PostList'
import axios from 'axios';

export default function AllPosts(props) { 
	const [load,setLoad] = useState(1)

	const user = JSON.parse(localStorage.getItem('user'));

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});

	const deleteHandler = id =>{
		const url = `http://127.0.0.1:3000/articles/${id}`
		authAxios.delete(url)
		.then((response) => {
			console.log('Response:', response.data);
			// showArticles()
			setLoad(load+1)
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
  return (
	<>
	<h4 className='ms-4 fw-bold mt-3'>All Posts</h4>
	{load && <PostList postData={props.postData} valid={true} onDelete={deleteHandler}/>}
	</>
  )
}
