import { Swiper, SwiperSlide } from "swiper/react";
import useAuth from "../hooks/useAuth";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Banner = () => {
  const { bannerUrl } = useAuth();
  console.log(bannerUrl);

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
            src={bannerUrl?.image1}
            alt="Non Employee"
            className="w-full "
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={bannerUrl?.image2}
            alt="Non Employee"
            className="w-full "
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={bannerUrl?.image3}
            alt="Non Employee"
            className="w-full "
          />
        </SwiperSlide>
      </Swiper>

    </div>
  );
};

export default Banner;
