import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './PostCard.module.css'
import axios from 'axios'

export default function PostCard(props) {
	const [saved,setSaved] = useState(false)
	const authorized = props.valid
	const listRef = useRef()

	const navigate = useNavigate()

	const user = JSON.parse(localStorage.getItem('user'));

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});

	const readMore = () =>{
		props.handleReadMore(props.data.id)
	}

	const editArticle = (e) =>{
		const item = props.data
		navigate(`/editPost/${props.data.id}`,{state:{item}})
	}

	const deleteArticle = () =>{
		props.onDelete(props.data.id)
	}

	const saveForLater = id =>{
		setSaved(prev=>!prev)
		authAxios.post(`http://127.0.0.1:3000/saveforlaters/${id}`)
		.then((res)=>{
			console.log(res.data)	
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}

	const listHandler = () =>{
		const obj = {article_id:props.data.id,list_id: +listRef.current.value}
		authAxios.post("http://127.0.0.1:3000/listitems",obj)
		.then((res)=>{
			console.log(res.data)	
			listRef.current.value=''
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}

	//avg human reading time = 25 characters/second
	const avgReadingTime = 25
	const totalChars = props.data.description.length
	const readingTimeinSec = Math.floor(totalChars/avgReadingTime)
	const readingTimeinMins = Math.ceil(readingTimeinSec/60)

  return (
	<div>
		<div className={`card m-4 ${classes['card-container']}`} >
			<div className="card-body w-75">
				<div>
					<div className={classes['author-date']}>
						<p>Author: {props.data.user_id}</p>
						<p>Published on {new Date(props.data.created_at).toDateString()}</p>
					</div>
					<h2 onClick={readMore} className={`${classes.title} ${classes['card-click']}`}>{props.data.title}</h2>
					<p onClick={readMore} className={classes['card-click']}>{props.data.description.slice(0,300)}...</p>
					<input placeholder='List no.' className='mb-3' ref={listRef}/>
					<button className='ms-1' onClick={listHandler}>Add</button>
					{authorized && <button className='ms-2'>See Revision History</button>}
				</div>
				<div className={classes.features}>
					<div>
						<span className={classes.tags}>{props.data.topic}</span>
						<span>{readingTimeinMins} min read</span>
					</div>
					<div>
					<svg width="24" height="24" viewBox="0 0 24 24" aria-label="clap"><path fillRule="evenodd" clipRule="evenodd" d="M11.37.83L12 3.28l.63-2.45h-1.26zM13.92 3.95l1.52-2.1-1.18-.4-.34 2.5zM8.59 1.84l1.52 2.11-.34-2.5-1.18.4zM18.52 18.92a4.23 4.23 0 0 1-2.62 1.33l.41-.37c2.39-2.4 2.86-4.95 1.4-7.63l-.91-1.6-.8-1.67c-.25-.56-.19-.98.21-1.29a.7.7 0 0 1 .55-.13c.28.05.54.23.72.5l2.37 4.16c.97 1.62 1.14 4.23-1.33 6.7zm-11-.44l-4.15-4.15a.83.83 0 0 1 1.17-1.17l2.16 2.16a.37.37 0 0 0 .51-.52l-2.15-2.16L3.6 11.2a.83.83 0 0 1 1.17-1.17l3.43 3.44a.36.36 0 0 0 .52 0 .36.36 0 0 0 0-.52L5.29 9.51l-.97-.97a.83.83 0 0 1 0-1.16.84.84 0 0 1 1.17 0l.97.97 3.44 3.43a.36.36 0 0 0 .51 0 .37.37 0 0 0 0-.52L6.98 7.83a.82.82 0 0 1-.18-.9.82.82 0 0 1 .76-.51c.22 0 .43.09.58.24l5.8 5.79a.37.37 0 0 0 .58-.42L13.4 9.67c-.26-.56-.2-.98.2-1.29a.7.7 0 0 1 .55-.13c.28.05.55.23.73.5l2.2 3.86c1.3 2.38.87 4.59-1.29 6.75a4.65 4.65 0 0 1-4.19 1.37 7.73 7.73 0 0 1-4.07-2.25zm3.23-12.5l2.12 2.11c-.41.5-.47 1.17-.13 1.9l.22.46-3.52-3.53a.81.81 0 0 1-.1-.36c0-.23.09-.43.24-.59a.85.85 0 0 1 1.17 0zm7.36 1.7a1.86 1.86 0 0 0-1.23-.84 1.44 1.44 0 0 0-1.12.27c-.3.24-.5.55-.58.89-.25-.25-.57-.4-.91-.47-.28-.04-.56 0-.82.1l-2.18-2.18a1.56 1.56 0 0 0-2.2 0c-.2.2-.33.44-.4.7a1.56 1.56 0 0 0-2.63.75 1.6 1.6 0 0 0-2.23-.04 1.56 1.56 0 0 0 0 2.2c-.24.1-.5.24-.72.45a1.56 1.56 0 0 0 0 2.2l.52.52a1.56 1.56 0 0 0-.75 2.61L7 19a8.46 8.46 0 0 0 4.48 2.45 5.18 5.18 0 0 0 3.36-.5 4.89 4.89 0 0 0 4.2-1.51c2.75-2.77 2.54-5.74 1.43-7.59L18.1 7.68z"></path></svg>
					<span>{props.data.like}</span>
					</div>
					<div>
					<svg width="24" height="24" viewBox="0 0 24 24" ><path d="M18 16.8a7.14 7.14 0 0 0 2.24-5.32c0-4.12-3.53-7.48-8.05-7.48C7.67 4 4 7.36 4 11.48c0 4.13 3.67 7.48 8.2 7.48a8.9 8.9 0 0 0 2.38-.32c.23.2.48.39.75.56 1.06.69 2.2 1.04 3.4 1.04.22 0 .4-.11.48-.29a.5.5 0 0 0-.04-.52 6.4 6.4 0 0 1-1.16-2.65v.02zm-3.12 1.06l-.06-.22-.32.1a8 8 0 0 1-2.3.33c-4.03 0-7.3-2.96-7.3-6.59S8.17 4.9 12.2 4.9c4 0 7.1 2.96 7.1 6.6 0 1.8-.6 3.47-2.02 4.72l-.2.16v.26l.02.3a6.74 6.74 0 0 0 .88 2.4 5.27 5.27 0 0 1-2.17-.86c-.28-.17-.72-.38-.94-.59l.01-.02z"></path></svg>
					<span>{props.data.comment}</span>
					</div>
					<div className={classes['main-features']}>
						{!saved && <svg onClick={()=>{saveForLater(props.data.id)}} width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z" fill="#000"></path></svg>}
						{saved && <svg onClick={()=>{setSaved(prev => !prev)}} width="24" height="24" viewBox="0 0 24 24" fill="none" class="ajj"><path d="M7.5 3.75a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-14a2 2 0 0 0-2-2h-9z" fill="#000"></path></svg>}
						{authorized && <>
						<svg onClick={editArticle} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Write"><path d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z" fill="currentColor"></path><path d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2" stroke="currentColor"></path></svg>
						<img onClick={deleteArticle} src='https://cdn-icons-png.flaticon.com/128/565/565491.png' width='20px' height='20px'/>
						</>}
					</div>
				</div>				
			</div>
			<div>

			<img className='border me-2' src='https://miro.medium.com/v2/resize:fill:140:140/1*r5coQ_IUZNe0yjOH7vq_6w.jpeg' width='100px' height='100px'/>
			</div>
		
		</div>
	</div>
  )
}
