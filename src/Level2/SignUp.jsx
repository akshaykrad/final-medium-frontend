import { Formik } from 'formik'
import React from 'react'
import * as yup from "yup";
import {Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import classes from './SignUp.module.css'

export default function SignUp() {

	const navigate = useNavigate();

	const home = () =>{
		navigate("/")
	}	
	const signIn = () =>{
		navigate("/signin")
	}	

	const user = JSON.parse(localStorage.getItem('user'));

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});

	const SignUpSchema = yup.object().shape({
		name:yup.string().required('Username is required'),
		email:yup.string().email('Enter a valid email id').required('Email is required'),
		password:yup.string().required('Password is required'),
		cPassword:yup.string().oneOf([yup.ref('password')],'Passwords do not match').required('Confirm password is required'),
	})
  return (
	
	<div className={classes.back}>
		<div className={classes.main}>
		<h2>Join Medium.</h2>
		<div className={classes.form}>
		<Formik
			initialValues={{
				name:'',
				email:'',
				password:'',
				cPassword:'',
			}}
			validationSchema={SignUpSchema}
			onSubmit={(values ,{ resetForm })=>{
				const newObject = {username:values.name,email:values.email,password_digest:values.password}

				authAxios.post('http://127.0.0.1:3000/signup',newObject)
				.then((res)=>{
					console.log(res.data)
					navigate('/signin')
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
					<label className='ms-2'>Username</label>
						<input 
							type='text'
							name='name'
							value={values.name}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`input-sm px-3 ${classes.inp} ${touched.name && !!errors.name && "border border-danger"}`}
							/>
						{touched.name && !!errors.name && (
							<span className="ms-2 fs-6 text-danger">{errors.name}</span>
							)}
					</div>
					<div className='mt-4 '>
					<label className='ms-2'>Email</label>
						<input 
							type='text'
							name='email'
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`input-sm px-3 ${classes.inp} ${touched.email && !!errors.email && "border border-danger"}`}
							/>
						{touched.email && !!errors.email && (
							<span className="ms-2 fs-6 text-danger">{errors.email}</span>
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
					<div className='mt-4'>
					<label className='ms-2'>Confrim Password</label>
						<input 
							type='text'
							name='cPassword'
							value={values.cPassword}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`input-sm px-3 ${classes.inp} ${touched.cPassword && !!errors.cPassword && "border border-danger"}`}
							/>
						{touched.cPassword && !!errors.cPassword && (
							<span className="ms-2 fs-6 text-danger">{errors.cPassword}</span>
							)}
					</div>
					<div className='text-center'>
					<button className={`btn btn-primary mt-4 mb-4 ${classes.btn}`} type='submit'>Sign Up</button>
						<p>Already have an account? <Link to='/signin' className={classes.link}>Sign In </Link></p>
					</div>
				</form>




			)}
		</Formik>
		</div>
		</div>
	</div>
  )
}
