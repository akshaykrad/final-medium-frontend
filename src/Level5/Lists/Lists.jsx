import React, { useEffect, useRef, useState } from 'react'
import classes from './Lists.module.css'
import SaveForLaterCard from '../SaveForLaterCard'
import ListCard from './ListCard'
import axios from 'axios'

export default function Lists() {
  const [lists,setLists] = useState([])
  const [load,setLoad] = useState(false)

  const nameRef = useRef()
  const user = JSON.parse(localStorage.getItem('user'));

	const authAxios = axios.create({
		headers:{
			Authorization: `Bearer ${user.token}`
		}
	});

  useEffect(()=>{ 
    const fetch = () =>{
      authAxios.get("http://127.0.0.1:3000/lists")
      .then((res)=>{
          setLists(res.data)
          console.log(res.data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    fetch()
  },[load])

  const createHandler = () =>{
    authAxios.post("http://127.0.0.1:3000/lists",{name:nameRef.current.value})
		.then((res)=>{
        setLoad(prev=>!prev)
		})
		.catch((error) => {
			console.error('Error:', error);
		});
  }
  const deleteHandler = id =>{
    authAxios.delete(`http://127.0.0.1:3000/lists/${id}`)
    .then((res)=>{
        console.log(res.data)
        setLoad(prev=>!prev)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
  <>
    <h4 className='ms-4 fw-bold mt-3'>Lists</h4>
    <SaveForLaterCard/>
    <h5 className='ms-4'>Create New List</h5>
    <input ref={nameRef} className={`ms-4 me-2 ${classes.input}`} placeholder='List name'/>
    <button className={`mb-2 ${classes.btn}`} onClick={createHandler}>Create</button>
    {
      lists.map(list=>{
        return <ListCard list={list} name={list.name} id={list.id} deleteHandler={deleteHandler}/>
      })
    }
  </>
  )
}
