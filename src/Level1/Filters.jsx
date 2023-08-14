import React, { useState } from 'react'

export default function Filters(props) {

	const [ftext,setFtext] = useState('')

	const findClick = () =>{
		props.handleFilter(ftext)
	}

	const handleFtext = (e) =>{
		setFtext(e.target.value)
	}
	const reset = () =>{
		props.handleReset()
	}

  return (
	<div className='ms-4 m-2'>
		<label>Filter</label>
		<input className='mx-2' value={ftext} onChange={handleFtext} placeholder='Author name'/>
		<input className='mx-2' type='date'/>
		<button className='m-1 btn border border-primary' onClick={findClick}>Filter</button>
		<button className='m-1 btn border border-primary' onClick={reset}>Reset</button>
		<br />
		<label>Sort by </label>
		<button className='btn m-1 border border-primary' onClick={props.sortbyLikes}>Likes</button>
		<button className='btn m-1 border border-primary' onClick={props.sortbyComments}>Comment</button>
	</div>
  )
}
