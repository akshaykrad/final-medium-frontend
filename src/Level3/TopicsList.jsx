import NavBar from '../components/NavBar'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classes from './TopicsList.module.css'

const DUMMY_DATA_topics = ['Self Improvement','Life','Work','Technology','Sports','Politics']

export default function TopicsList() {
	const [topicData, setTopicData] = useState([DUMMY_DATA_topics])

	const user = JSON.parse(localStorage.getItem('user'));

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});

	const showTopics = url =>{
		authAxios.get(url)
		.then((res)=>{
			setTopicData(res.data)
			// console.log(res.data)
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}

	useEffect(()=>{
		const url = "http://127.0.0.1:3000/listTopic"
		showTopics(url)
	},[])


  return (
	<>
	<NavBar />
	<div className='m-2'>
		<h1 className={classes.explore}>Explore Topics</h1>
		<div className={classes.search}>
			<input className={classes.input} placeholder='Search ..'/>
		</div>
		<div className={classes.content}>
			{topicData.map((item)=>{
				return (
					<div className={classes.topic}>
						<span >{item}</span>
					</div>
				)
			})}
		</div>
	</div>
	</>
  )
}
