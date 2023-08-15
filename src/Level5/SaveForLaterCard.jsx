import React from 'react'
import classes from './SaveForLaterCard.module.css'
import { useNavigate } from 'react-router-dom'

export default function SaveForLaterCard() {
	const navigate = useNavigate()
  return (
	<div className={`card-body ms-4 card ${classes['card-container']}`} onClick={()=>{navigate('/savedLater')}}>
		<div>
			<h2 className={`${classes.title} ${classes.details}`}>Saved For Later</h2>
		</div>
		<div className='d-flex'>
		</div>
	</div>
  )
}
