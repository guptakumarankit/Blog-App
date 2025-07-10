import React from 'react'

const NewsLetter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
      <h1 className='md:text-4xl text-2xl font-semibold'>Never Miss a blog!</h1>
      <p className='md:text-lg text-grey-500/70 pb-8'>Subscribe to get the latest blog,new tech, and exclusive news.</p>
      <form className='flex items-center justify-center max-w-2xl w-full md:h-13 h-12'>
        <input type="text" placeholder='Enter your email id..' required className='border border-grey-300 rounded-md h-full border-r-0 ontline-none w-full rounded-r-none px-3 text-grey-500'/>
        <button type='submit' className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetter
