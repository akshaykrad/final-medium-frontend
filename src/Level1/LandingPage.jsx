import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Filters from './Filters'
import PostList from './Posts/PostList'
import PostToggle from '../components/PostToggle'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import classes from './LandingPage.module.css'


export default function LandingPage() {

	const [postData , setPostData] = useState([])
	const [prevData , setPrevData] = useState([])

	const user = JSON.parse(localStorage.getItem('user'));

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});
	const {user_id} = jwtDecode(user.token)
	const showArticles = () =>{
		authAxios.get("http://127.0.0.1:3000/articles")
		.then((res)=>{
			setPostData(res.data)	
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
	useEffect(()=>{
		showArticles()
	},[])

	const deleteHandler = id =>{
		const url = `http://127.0.0.1:3000/articles/${id}`
		authAxios.delete(url)
		.then((response) => {
			console.log('Response:', response.data);
			showArticles()
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}

	const Articles = async(url)=>{
		await authAxios.get(url)
		.then((res)=>{
			setPostData(res.data)	
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
	const sortbyLikes = () => {
		const url = 'http://127.0.0.1:3000/sortByLike'
		Articles(url)
	}
	const sortbyComments = () => {
		const url = 'http://127.0.0.1:3000/sortByComment'
		Articles(url)
	}
	const removeDuplicates = (array, key) =>{
		const seen = new Set();
		return array.filter((item) => {
		  const identifier = item[key];
		  if (!seen.has(identifier)) {
			seen.add(identifier);
			return true;
		  }
		  return false;
		});
	  }
	const searchHandler = async(searchQuery)=> {
		const url_byTitle = `http://127.0.0.1:3000/articleSearch?s=${searchQuery}`
		const url_byTopic = `http://127.0.0.1:3000/topicSearch?s=${searchQuery}`
		
		let titleRes,topicRes;
		await authAxios.get(url_byTitle)
		.then((res)=>{
			titleRes = res.data
		})
		.catch((error) => {
			console.error('Error:', error);
			return;
		});

		await authAxios.get(url_byTopic)
		.then((res)=>{
			topicRes = res.data
		})
		.catch((error) => {
			console.error('Error:', error);
			return;
		});
		let combinedRes = [...titleRes,...topicRes];
		const uniqueRes = removeDuplicates(combinedRes,'id');
		setPostData(uniqueRes);
	}
	const handleFilter = filterText =>{
		const filtered = postData.filter(item => item.user_id == +filterText)
		setPostData(prev=>{
			setPrevData(prev)
			return(filtered)
		})
	}
	const handleReset = () =>{
		setPostData(prevData)
	}
	const toggleBox = identifier =>{
		let url;
		if(identifier===1){
			url = 'http://127.0.0.1:3000/articles'
		}
		if(identifier===2){
			url = 'http://127.0.0.1:3000/topArticles'
		}
		if(identifier===3){
			url = `http://127.0.0.1:3000/recommendedArticles?id=${user_id}`
		}
		Articles(url)
	}

  return (
	<>
		<NavBar searchHandler={searchHandler}/>
		<Filters sortbyLikes={sortbyLikes} sortbyComments={sortbyComments} handleFilter={handleFilter} handleReset={handleReset}/>
		<hr />
		<PostToggle toggleBox={toggleBox}/>
		<div className={classes.cardBox}>
			<PostList postData={postData} valid={false} onDelete={deleteHandler}/>
		</div>
	</>
  )
}
