import React, { useRef } from 'react'
import { Formik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import classes from './NewPost.module.css'

export default function EditPost() {
	const location = useLocation()
	const data = location.state.item

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

	const addPost = () =>{
		authAxios.post(`http://127.0.0.1:3000/drafts/${data.id}`)
			.then((res)=>{
				console.log(res.data)
				navigate('/')
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

  return (
	<div className={classes.back}>
		<div className={classes.main}>
		<h3>Update Post</h3>
		<div className={classes.form}>
		<Formik
			initialValues={{
				title:`${data.title}`,
				topic:`${data.topic}`,
				imageUrl:`${data.imageUrl}`,
				description:`${data.description}`,
				author:`${data.author}`,
				date: `${new Date(data.date)}`,
				id:`${data.id}`,
			}}
			onSubmit={(values ,{ resetForm })=>{
				const newObject = {
					title:values.title,
					description:values.description,
					topic:values.topic,
				}
				authAxios.put(`http://127.0.0.1:3000/articles/${values.id}`,newObject)
				.then((res)=>{
					console.log(res.data)
					navigate('/')
				})
				.catch((error) => {
					console.error('Error:', error);
				});
				console.log(values)
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
							placeholder='Enter topics here'
							/>
					</div>
					<div className='mt-4 '>
						<input 
							ref = {descriptionRef}
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
							type='text'
							name='description'
							value={values.description}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`input-sm ${classes.input}`}
							placeholder='Enter description'
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
						<button className={`btn btn-success mt-4 ${classes.btn}`} type='submit'>Update Post</button><br/>
					</div>
				</form>




			)}
		</Formik>
		</div>
		<button className={`btn btn-success mt-4 ${classes.btn}`} onClick={addPost}>Add Post</button><br/>
		</div>
	</div>
  )
}
