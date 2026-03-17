import React from 'react'
import Carousel from '../components/Carousel'
import MidBanner from '../components/MidBanner'
import Feature from '../components/Feature'
import Footer from '../components/Footer'


function Homepage() {

    
  return (
    <div className='overflow-x-hidden'>
        
        <Carousel/>
        <MidBanner/>
        <Feature/>
        
    </div>
  )
}

export default Homepage