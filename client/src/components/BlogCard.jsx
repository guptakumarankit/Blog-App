import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {

  const {title , description , category , image , _id} = blog;
  const navigate = useNavigate()

  return (
    <div onClick={()=> navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer hover:border hover:border-light-border hover:p-2'>
        <img src={image} alt="image" className='aspect-viedo'/>
        <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
        <div className='p-5'>
            <h5 className='mb-2 font-medium text-grey-900'>{title}</h5>
            <p className='mb-2 text-xs text-grey-600' dangerouslySetInnerHTML={{"__html" : description.slice(0,80)}}></p>
        </div>
    </div>
  )
}

export default BlogCard
