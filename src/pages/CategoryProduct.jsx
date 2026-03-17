import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../assets/src_assets_Loading4.webm';
import { ChevronLeft } from 'lucide-react';
import ProduectView from '../components/ProduectView';


function CategoryProduct() {
  const [categoryData, setcategoryData] = useState([]);
  const params=useParams();
  const category=params.category;
const navigate=useNavigate();

  const getDataByCategory =async()=>{
    try {
      const response=await axios.get(`https://dummyjson.com/products/category/${category}`);
      const data=response.data.products;

setcategoryData(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getDataByCategory();
    window.scrollTo(0,0)
  },[])
  
  return (
    <div>
      
      {
        categoryData.length > 0 ?  (
        <div  className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
          <button
          onClick={()=>navigate('/')}
          className='bg-gray-800 mb-5 text-white py-1 px-3 rounded-md items-center cursor-pointer flex gap-1'><ChevronLeft /> Back</button>
          {
            categoryData.map((prod,index)=>(
              <ProduectView key={index} prod={prod} />
            ))
          }
        </div>
      ) : (
        <div className='flex items-center justify-center h-[400px] '>
          <video muted autoPlay loop>
            <source   src={Loading} type='video/webm'/>
          </video>
        </div>
        )
      }
    </div>
  )
}

export default CategoryProduct



