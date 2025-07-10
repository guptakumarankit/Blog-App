import React from 'react'
import {assets} from '../../assets/assets.js'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar.jsx';
import { useAppContext } from '../../context /AppContext.jsx';

const Layout = () => {
  
  const { axios , setToken , navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null)
    navigate('/')
  }

  return (
    <>
      <div className='flex justify-between items-center py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
        <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-32 sm:w-40 cursor-pointer'/>
        <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
      </div>
      <div className='flex h-[calc(100vh-70px)]'>
            <Sidebar/>
            <Outlet/>
      </div>
    </>
  )
}

export default Layout
