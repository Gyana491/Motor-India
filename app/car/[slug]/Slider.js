'use client';
import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import './style.css';
import { Pagination, Navigation, Thumbs, FreeMode } from 'swiper/modules';

const Slider = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  return (
    <div className="slider-container relative w-full h-auto mb-8">
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        navigation={true}
        spaceBetween={10}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Navigation, Thumbs]}
        slidesPerView={1}
        className="main-swiper"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Slide ${index}`} className="w-full h-auto object-cover rounded-lg shadow-lg" />
            </SwiperSlide>
          ))
        ) : (
          <p>No images available</p>
        )}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={6}
        breakpoints={{
          '@0.00': {
            slidesPerView: 4, // 4 slides for mobile devices
            spaceBetween: 8,
          },
          '@1.00': {
            slidesPerView: 6, // 6 slides for larger screens
            spaceBetween: 8,
          },
        }}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbnails-container mt-4 p-2 bg-gray-100 rounded-lg shadow-inner"
      >
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <SwiperSlide
              key={index}
              className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <div className="thumbnail-inner">
                <img src={image} alt={`Thumbnail ${index}`} className="w-full h-full object-cover rounded-lg transition-transform transform hover:scale-105" />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p>No thumbnails available</p>
        )}
      </Swiper>
    </div>
  );
};

export default Slider;