import React from 'react'
import classes from './Lists.module.css'
import SaveForLaterCard from '../SaveForLaterCard'

export default function Lists() {
  return (
  <>
    <h4 className='ms-4 fw-bold mt-3'>Lists</h4>
    {/* <div className={classes.create}>
      
			<p>Create New List</p>
    </div> */}
    <SaveForLaterCard/>
    <h5 className='ms-4'>Create New List</h5>
    <h5 className='ms-4'>Share List</h5>
  </>
  )
}
