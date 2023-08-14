import React, { useEffect, useState } from 'react'
import DraftsCard from './DraftsCard'
import axios from 'axios';

export default function Drafts() {

  const [draftData,setDraftsData] = useState([])

  const user = JSON.parse(localStorage.getItem('user'));

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});
  useEffect(()=>{
    authAxios.get(`http://127.0.0.1:3000/drafts`)
		.then((res)=>{
      console.log(res.data)
      setDraftsData(res.data)
		})
		.catch((error) => {
			console.error('Error:', error);
		});
  },[])


  return (
    <>
    <h4 className='ms-4 fw-bold mt-3'>Drafts</h4>
    {
      draftData.map(draft=>{
        return(
          <DraftsCard 
            draft={draft}
            title={draft.title} 
            description={draft.description} 
            topic={draft.topic} 
            dateTime={draft.created_at}
          />
        )
      })
    }
    </>
  )
}
