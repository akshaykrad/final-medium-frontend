import React from 'react'
import classes from './SaveForLaterCard.module.css'

export default function SaveForLaterCard(props) {
  return (
	<div className={`card-body ms-4 card ${classes['card-container']}`}>
		<div>
			<h2 className={`${classes.title} ${classes.details}`}>Saved For Later</h2>
		</div>
		<div className='d-flex'>
			<p className='m-0 '>Last edited {new Date().toLocaleString()} |</p>
		</div>
	</div>
  )
}
