import React, { useEffect } from "react";
import { useContextData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

function Category() {
const {data}=useContextData();
  const getUniqCategory=(data,property)=>{
        let newValue=data?.map((currEle)=>{
        return    currEle[property]
    })
    newValue=[...new Set(newValue)]
    return newValue;
    }

    const categoryOnlyData=getUniqCategory(data,"category");

  // const { categoryOnlyData } = useContextData();
const navigate=useNavigate();
  return (
    <div className="bg-[#101829] ">
      <div className="max-w-7xl flex  mx-auto gap-4 items-center justify-around py-7 px-4 flex-wrap">
        {categoryOnlyData.map((item, index) => {
          return (
            <div key={index}>
              <button 
              onClick={()=>navigate(`/category/${item}`)}
              className="w-32 text-center text-white bg-gradient-to-r from-red-500 to-purple-500 px-3 py-1 rounded-md hover:scale-105 active:scale-95 transition-all uppercase cursor-pointer">
                {item}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
