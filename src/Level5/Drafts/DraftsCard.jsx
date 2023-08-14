import React from 'react'
import classes from './DraftsCard.module.css'
import { useNavigate } from 'react-router-dom'


export default function DraftsCard(props) {

	const navigate = useNavigate()
	
	const avgReadingTime = 25
	const totalChars = props.description.length
	const readingTimeinSec = Math.floor(totalChars/avgReadingTime)
	const readingTimeinMins = Math.ceil(readingTimeinSec/60)
	const totalWords = props.description.split(' ')
	
	const clickHandler = item =>{
		navigate(`/editPost/${item.id}`,{state:{item}})
		// console.log(item)
	}
  return (
	<div className={`card-body ms-4 card ${classes['card-container']}`} onClick={()=>{clickHandler(props.draft)}}>
		<div>
			<h2 className={`${classes.title} ${classes.details}`}>{props.title}</h2>
			<p className={`mb-2 ${classes.details}`}>{props.description}</p>
		</div>
		<div className='d-flex'>
			<p className='m-0 '>Last edited {new Date(props.dateTime).toLocaleString()} |</p>
			<p className='ms-1'> {readingTimeinMins} min read ({totalWords.length} words) so far</p>
		</div>
	</div>
  )
}
