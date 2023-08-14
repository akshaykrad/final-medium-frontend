import classes from './PostToggle.module.css'
import React, { useState } from 'react'

export default function PostToggle(props) {

	const [view,setView] = useState(1)

	const options = ['All Posts','Top Posts','Recommended Posts']

	const clickHandler = id =>{
		setView(id)
		props.toggleBox(id)
	}

  return (
	<div className={`${classes.main} ms-4`}>
		<span onClick={()=>{clickHandler(1)}} className={`${classes.span} ${classes.first}`}>All Posts</span>
		<span onClick={()=>{clickHandler(2)}} className={`${classes.span}`}>Top Posts</span>
		<span onClick={()=>{clickHandler(3)}} className={`${classes.span} ${classes.last}`}>Recommended</span>
		<h2 className={`${classes.header} mt-3`}>{options[view-1]}</h2>
	</div>
  )
}
