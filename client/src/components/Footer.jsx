import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
  <div className='flex flex-col items-center mt-4'>
  <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
      <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-grey-500/30 text-gray-500'>

      <div className='w-[30%] flex flex-col gap-2'>
        <img src={assets.logo} alt="logo" className='w-54'/>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente distinctio omnis velit cupiditate impedit quo inventore .</p>
      </div>

      <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
        {
            footer_data.map((section , index) => (
                <div key={index} >
                    <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-1'>{section.title}</h3>
                    <ul className='text-sm space-y-1'>
                        {
                            section.links.map((link , i) => (
                                <li key={i}>
                                    <a href="#" className='hover:underline transition'>{link}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            ))
        }
      </div>
    </div>
    
  </div>
  <p>Copyright 2025 @ Blog-App Ankit Gupta - All Right Reserved.</p>
  </div>
  )
}

export default Footer
