import React from 'react'
import { useNavigate } from 'react-router-dom'

function Breadcrum({title}) {
    const navigate=useNavigate();
  return (
    <div className='max-w-6xl mx-auto my-10'>
 <h1 className='text-xl text-gray-700 font-semibold'><span className='cursor-pointer' onClick={()=>navigate('/home')}> Home</span >/ <span className='cursor-pointer' onClick={()=>navigate('/product')}>Product</span>/ <span>{title}</span></h1>
    </div>
  )
}

export default Breadcrum