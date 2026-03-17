import axios from "axios";
import { useContext } from "react";
import { createContext, useCallback, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    
  const [data, setData] = useState(null);


//   fetch all producto from api

    const fetchAllProduct=async()=>{
    try {
        const response=await axios.get(`https://dummyjson.com/products?limit=194`)
              
console.log(response);

        const productData=response.data.products;
        
       setData(productData);


     
    
    } catch (error) {
        console.log(error);
        
    }
}
const getUniqCategory=(data,property)=>{
        let newValue=data?.map((currEle)=>{
        return    currEle[property]
    })
    newValue=["All",...new Set(newValue)]
    return newValue;
    }

    const categoryOnlyData=getUniqCategory(data,"category");
 const   brandOnlyData =getUniqCategory(data,"brand")



  return <DataContext.Provider value={{data,setData,fetchAllProduct,categoryOnlyData,brandOnlyData}}>
    {children}
    </DataContext.Provider>;
};

export const useContextData=()=>{
    return useContext(DataContext)
}