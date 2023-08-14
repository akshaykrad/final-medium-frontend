// import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import classes from './NewPost.module.css'
import { useRef, useState } from 'react'

export default function NewPost() {

	const [article,setArticle] = useState(null)
	const navigate = useNavigate()

	const user = JSON.parse(localStorage.getItem('user'));

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});
	const titleRef = useRef()
	const descriptionRef = useRef()
	const topicRef = useRef()

	const saveToDrafts = () =>{
		const newObj = {
			title:titleRef.current.value,
			description:descriptionRef.current.value,
			topic:topicRef.current.value,
		}
		console.log(newObj)
		authAxios.post("http://127.0.0.1:3000/drafts",newObj)
			.then((res)=>{
				console.log(res.data)
				// setArticle(res.data)
				navigate('/myprofile')
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		
	}

  return (
    <div className={classes.back}>
		<div className={classes.main}>
		<h3>Add New Post</h3>
		<div className={classes.form}>

		<Formik
			initialValues={{
				title:'',
				topic:'',
				imageUrl:'',
				description:'',
				author:'',
				date: new Date(),
				id:Math.random().toString(16).slice(2),
			}}
			onSubmit={(values ,{ resetForm })=>{
				const newObject = {
					title:values.title,
					description:values.description,
					topic:values.topic,
				}
				console.log(newObject)

				authAxios.post("http://127.0.0.1:3000/articles",newObject)
				.then((res)=>{
					console.log(res.data)
					navigate('/')
				})
				.catch((error) => {
					console.error('Error:', error);
				});
			}}
		>
			{({
				handleBlur,
				handleChange,
				handleSubmit,
				values,
				touched,
				errors,
			})=>(
				<form noValidate onSubmit={handleSubmit}>
					<div className='mt-4'>
						<input 
							ref = {titleRef}
							type='text'
							name='title'
							value={values.title}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`input-sm ${classes.input}`}
							placeholder='Enter Title here'
						/>
					</div>
					<div className='mt-4 '>
						<input 
							ref = {topicRef}
							type='text'
							name='topic'
							value={values.topic}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`input-sm ${classes.input}`}
							placeholder='Enter Topics'
							/>
					</div>
					<div className='mt-4 '>
						<input 
							type='text'
							name='imageUrl'
							value={values.imageUrl}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`input-sm ${classes.input}`}
							placeholder='Enter Image url'
							/>
					</div>
					<div className='mt-4 '>
						<textarea
							ref = {descriptionRef}
							type='text'
							name='description'
							value={values.description}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`input-sm ${classes.input}`}
							placeholder='Enter Content'
							/>
					</div>
					<div className='mt-4 '>
						<input
							type='text'
							name='author'
							value={values.author}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`input-sm ${classes.input}`}
							placeholder='Author name'
							/>
					</div>
					<div className='text-center'>
						<button className={`btn btn-success mt-4 ${classes.btn}`} type='submit'>Add Post</button>
					</div>
					
				</form>




			)}
		</Formik>
		</div>
		<button className={`btn btn-warning mt-2 ${classes.btn}`} onClick={saveToDrafts}>Save as Drafts</button>
		</div>
	</div>
  )
}
