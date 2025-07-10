import React from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <>
      <NavBar/>
      <Header/>
      <BlogList/>
      <NewsLetter/>
      <Footer/>
    </>
  )
}

export default Home
