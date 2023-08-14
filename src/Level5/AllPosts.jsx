import React from 'react'
import PostList from '../Level1/Posts/PostList'

export default function AllPosts(props) {
  return (
	<>
	<h4 className='ms-4 fw-bold mt-3'>All Posts</h4>
	<PostList postData={props.postData} valid={true}/>
	</>
  )
}
