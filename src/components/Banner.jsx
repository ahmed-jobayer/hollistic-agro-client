import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Banner = () => {

  return (
    <div className="my-7 w-full z-0">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper "
      >
        <SwiperSlide>
          <img
            src='/banner1.png'
            alt=""
            className="w-full "
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='/banner2.png'
            alt=""
            className="w-full "
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='/banner3.png'
            alt=""
            className="w-full "
          />
        </SwiperSlide>
      </Swiper>

    </div>
  );
};

export default Banner;
