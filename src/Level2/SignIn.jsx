import { Formik } from 'formik'
import React from 'react'
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import classes from './SignIn.module.css'
import jwt from 'jwt-decode'
import Cookies from 'universal-cookie';

export default function SignIn() {

	const cookies = new Cookies();

	const navigate = useNavigate();

	const home = () =>{
		navigate('/')
	}
	const signUp = () =>{
		navigate('/signup')
	}

	const SignInSchema = yup.object().shape({
		username:yup.string().required('Username is required'),
		password:yup.string().required('Password is required'),
	})

  return (
	<div className={classes.back}>
		<div className={classes.main}>
		<h2>Welcome Back.</h2>
		<div className={classes.form}>

		<Formik
			
			initialValues={{
				username:'',
				password:'',
			}}
			validationSchema={SignInSchema}
			onSubmit={(values ,{ resetForm })=>{
				console.log(values);
				const newObject = {username:values.username,password_digest:values.password}
				axios.post("http://127.0.0.1:3000/auth/login",newObject)
				.then((res)=>{
					const user = res.data
					localStorage.setItem('user',JSON.stringify(user))
					navigate('/')
				}).catch((err)=>{
					console.log(err)
				})
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
					<div className='mt-4 '>
						<label className='ms-2'>Username</label>
						<input 
							type='text'
							name='username'
							value={values.username}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`input-sm px-3 ${classes.inp} ${touched.username && !!errors.username && "border border-danger"}`}
							/>
						{touched.username && !!errors.username && (
							<span className="ms-2 fs-6 text-danger">{errors.username}</span>
							)}
					</div>
					<div className='mt-4'>
					<label className='ms-2'>Password</label>
						<input 
							type='text'
							name='password'
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`input-sm px-3 ${classes.inp} ${touched.password && !!errors.password && "border border-danger"}`}
							/>
						{touched.password && !!errors.password && (
							<span className="ms-2 fs-6 text-danger">{errors.password}</span>
							)}
					</div>
					<div className='text-center'>
					<button className={`btn btn-primary mt-4 mb-4 ${classes.btn}`} type='submit'>Sign In</button>
						<p>Don't have an account? <Link to='/signup' className={classes.link}>Sign Up </Link></p>
					</div>
				</form>
			)}
		</Formik>
		</div>
		</div>
	</div>
  )
}
