import React from "react";
import { useContextData } from "../context/DataContext";

function FilterSection({search,setSearch,brand,category, setCategory, setBrand,pricesRange, setPriceRange,handleCategoryChaange,handleBrandChaange}) {
  const { categoryOnlyData,brandOnlyData } = useContextData();
 
  return (
    <div
      className="bg-gray-100 mt-10 p-4
    rounded-md h-max uppercase hidden md:block"
    >
      <input
         value={search}
              onChange={(e)=>setSearch(e.target.value)}
        type="text"
        placeholder="Search..."
        className="bg-white p-2 rounded-md borer-gray-400 border-2"
      />
      {/* category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3 ">
        {categoryOnlyData?.map((item, index) => {
          return (
            <div key={index} className="flex gap-2 ">
              <input 
            name={item} 
            checked={category===item}
            value={item}
             onChange={handleCategoryChaange}
              type="checkbox" />
              <button className="cursor-pointer uppercase">{item}</button>
            </div>
          );
        })}
      </div>

      {/* for brannd */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
     <select 
     value={brand}
     onChange={handleBrandChaange}
     name ="" className='bg-white p-2 w-full border-gray-200 border-2 rounded-md uppercase'>
      {
        brandOnlyData?.map((item,index)=>{
          return <option key={index} value={item}
          >{item}</option>
        })
      }
     </select>

     {/* price range  */}
     
     <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
     <div className='flex flex-col gap-2'>
<label htmlFor="">Price Range : ${pricesRange[0]} - ${pricesRange[1]}</label>
<input
value={pricesRange[1]}
min="0" 
max='50000'
onChange={(e)=>setPriceRange([pricesRange[0], Number(e.target.value)])}
type="range" />
     </div>

<button className='bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer active:scale-95'
onClick={()=>{setSearch( " "); setCategory("All") ;setPriceRange([0,50000]) ; setBrand("All")}}
> Reset Filters</button>
    </div>
  );
}

export default FilterSection;
