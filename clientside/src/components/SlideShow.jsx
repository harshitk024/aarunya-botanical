import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import slideshow1 from "../assets/slideshow_1.jpg";
import slideshow2 from "../assets/slideshow_2.jpg";
import slideshow3 from "../assets/slideshow_3.jpg";
import slideshow4 from "../assets/slideshow_4.jpg";
import slideshow5 from "../assets/slideshow_5.webp";
import slideshow_vid1 from "../assets/testimonial_vid_1.mp4";
import slideshow_vid2 from "../assets/testimonial_vid_2.mp4";
import Title from "./Title";
import { useRef } from "react";

const Carousel = () => {
  const videoRefs = useRef([]);
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);

  const videos = [slideshow_vid1, slideshow_vid2];

  useEffect(() => {
    const handleFullScreenChange = () => {
      const fullscreenEl = document.fullscreenElement;

      videoRefs.current.forEach((video) => {
        if (!video) return;

        if (video === fullscreenEl) {
          video.style.objectFit = "contain";
        } else {
          video.style.objectFit = "cover";
        }
      });
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    const sectionEl = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!swiperRef.current) return;

        const swiper = swiperRef.current;
        const activeIndex = swiper.activeIndex;
        const activeVideo = videoRefs.current[activeIndex];

        if (entry.isIntersecting && activeVideo) {
          activeVideo.play().catch(() => {});
        } else {
          videoRefs.current.forEach((v) => v && v.pause());
        }
      },
      {
        threshold: 0.6,
      }
    );

    if (sectionEl) observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16" ref={sectionRef}>
      <Title title={"What our customer says"} />

      <div className="grid grid-cols-1 md:grid-cols-[3fr_7fr] gap-10 items-stretch mt-10">
        {/* VIDEO SLIDER */}
        <div className="rounded-2xl overflow-hidden shadow-lg h-[620px] bg-black">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              // 1️⃣ Stop & reset all videos
              videoRefs.current.forEach((v) => {
                if (!v) return;
                v.pause();
                v.currentTime = 0;
              });

              const index = swiper.realIndex;
              const activeVideo = videoRefs.current[index];

              if (activeVideo) {
                setTimeout(() => {
                  activeVideo.muted = true; 
                  activeVideo.play().catch(() => {});
                }, 100); 
              }
            }}
            loop={true}
            className="h-full"
          >
            {videos.map((video, index) => (
              <SwiperSlide key={index}>
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video}
                  controls
                  muted
                  preload="metadata"
                  playsInline
                  onEnded={() => {
                    swiperRef.current.slideNext();
                  }}
                  className="w-full h-full object-cover"
                  poster="/video-thumb.jpg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* IMAGE SLIDER */}
        <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-4">
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop
            className="h-full"
          >
            {[slideshow1, slideshow2, slideshow3, slideshow4, slideshow5].map(
              (img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt="testimonial"
                    className="w-full max-h-[520px] object-contain mx-auto"
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
