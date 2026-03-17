import React, { use, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { useContextData } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import Category from "./Category";

function Carousel() {
  const { fetchAllProduct, setData, data } = useContextData();

  console.log(data);

  useEffect(() => {
    fetchAllProduct();
  }, []);

  //for Slider by react.slice

  const SampleNextArrow = (props) => {
    const { className, style, onclick } = props;
    return (
      <div
        onclick={onclick}
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowRight
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            right: "50px",
          }}
        />
      </div>
    );
  };
  const SamplePreArrow = (props) => {
    const { className, style, onclick } = props;
    return (
      <div
        onclick={onclick}
        className={`arrows ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowLeft
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",

            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            left: "50px",
          }}
          onMouseOver={"this.style.backgroudColor='"}
        />
      </div>
    );
  };
  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    pauseOnHover: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePreArrow to="prev" />,
  };

  return (
    <div>
      <Slider {...settings}>
        {data?.slice(0, 7).map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10"
          >
            <div className="flex flex-col md:flex-row gap-10 justify-center h-[600px] items-center px-4 my-10 md:my-0">
              <div className=" space-y-3 md:space-y-6">
                <h3 className="text-red-500 font-semibold s text-sm font-sans">
                  Powering Your World with the Best in Electronics
                </h3>

                <h1 className=" text-xl md:text-4xl font-bold uppercase md:line-clamp-3 line-clamp-2 md:w-[500px] text-white">
                  {item.title}
                </h1>
                <p className="md:w-[500px] line-clamp-3 text-gray-400 pr-7">
                  {item.description}
                </p>
                <button className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2 active:scale-90">
                  {" "}
                  Shop Now
                </button>
              </div>
              <div>
                <img
                  src={item.images}
                  alt={item.title}
                  className=" bg-white rounded-full w-[550px] hover:scale-105 transition-all shadow-2xl shadow-red-400"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <Category />
    </div>
  );
}

export default Carousel;
