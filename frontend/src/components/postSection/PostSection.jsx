import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSection.css'

const PostSection = () => {
  return (
    <div className="PostSection">
    <PostShare/>
    <Posts/>
    </div>
  )
}

export default PostSection
