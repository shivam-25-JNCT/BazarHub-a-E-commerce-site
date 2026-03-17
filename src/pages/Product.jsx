import React, { useEffect, useState } from "react";
import { useContextData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import Loading from "../assets/src_assets_Loading4.webm";
import ProductCart from "../components/ProductCart";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";
import MobileFilter from "../components/MobileFilter";

function Product() {
  const { data, fetchAllProduct } = useContextData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [pricesRange, setPriceRange] = useState([0, 50000]);
  const [openFilter, setOpenFilter] = useState(false);

  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchAllProduct();
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChaange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };
  const handleBrandChaange = (e) => {
    setBrand(e.target.value);
    setPage(1);
    window.scrollTo(0,0)
  };
  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0,0)
  };

  const filterData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= pricesRange[0] &&
      item.price <= pricesRange[1],
  );
  const dynamicPage = Math.ceil(filterData?.length / 8);

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 mb-10 ">
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          category={category}
          brand={brand}
          pricesRange={pricesRange}
          setCategory={setCategory}
          setBrand={setBrand}
          setPriceRange={setPriceRange}
          handleCategoryChaange={handleCategoryChaange}
          handleBrandChaange={handleBrandChaange}
        />
        {data?.length > 0 ? (
          <>
            <div className="flex gap-8 ">
              <FilterSection
                search={search}
                setSearch={setSearch}
                category={category}
                brand={brand}
                pricesRange={pricesRange}
                setCategory={setCategory}
                setBrand={setBrand}
                setPriceRange={setPriceRange}
                handleCategoryChaange={handleCategoryChaange}
                handleBrandChaange={handleBrandChaange}
              />
              {filterData?.length > 0 ? (
                <div className="flex flex-col justify-cente items-center ">
                  <div className="grid md:grid-cols-4 md:gap-7 gap-2 mt-10 grid-cols-2 ">
                    {filterData
                      ?.slice(page * 8 - 8, page * 8)
                      .map((prod, index) => {
                        return <ProductCart key={index} prod={prod} />;
                      })}
                  </div>
                  <Pagination
                    page={page}
                    setPage={setPage}
                    pageHandler={pageHandler}
                    dynamicPage={dynamicPage}
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center md:h-[600px] md:w-[900px] mt-10">
                  <Lottie animationData={notfound} classID="w-500px" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop>
              <source src={Loading} type=" video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
