import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import slideshow1 from "../assets/slideshow_1.jpg";
import slideshow2 from "../assets/slideshow_2.jpg";
import slideshow3 from "../assets/slideshow_3.jpg";
import slideshow4 from "../assets/slideshow_4.jpg";
import slideshow5 from "../assets/slideshow_5.webp"

const Carousel = () => {
  return (
    <div className="flex flex-col">
      <h1 className="self-center font-medium text-2xl">What our customer says</h1>
      <div style={{ position: "relative" }}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          style={{
            width: "100%",
            padding: "40px 0",
          }}
          autoplay={{ delay: 5000 }}
          loop={true}
        >
          <SwiperSlide>
            <div className="slide-wrapper">
              <img src={slideshow1} alt="testimonial" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-wrapper">
              <img src={slideshow2} alt="testimonial" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-wrapper">
              <img src={slideshow3} alt="testimonial" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-wrapper">
              <img src={slideshow4} alt="testimonial" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-wrapper">
              <img src={slideshow5} alt="testimonial" />
            </div>
          </SwiperSlide>
        </Swiper>


        {/* <div style={{
          position: 'absolute',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 2,
        }} className='slide-info'>
        <h2 id = "slide-header" style={{fontFamily: "Anton SC"}}>Welcome to Gozai<span style={{color: "lightgreen"}}>Store</span></h2>
        <div id = "slide-description">
         Discover a world of incredible products, all handpicked for quality and style, right here at Gozaistore. We bring you the best in modern essentials, from the latest tech gadgets to chic home decor, stylish fashion, and unique finds—all delivered straight to your door with just a click.
        </div>
        <div style={{marginTop: "10px",fontWeight: "600", fontFamily: "Roboto",fontStyle: "italic"}}>
          Shop smart, Shop Easy.
        </div>
     </div> */}
      </div>
    </div>
  );
};

export default Carousel;
