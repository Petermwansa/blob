import { createPost } from '@/actions/posts';
import BlogForm from '@/components/BlogForm';
import React from 'react'

function create() {
  return (
    <div className='container w-1/2'>
      <h1 className='title'>Create a new post</h1>

      <BlogForm handler={createPost} />
    </div>
  )
}

export default create;
