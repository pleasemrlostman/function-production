import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

const Slide = () => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide>
                <SlideCover>정</SlideCover>
            </SwiperSlide>
            <SwiperSlide>
                <SlideCover>정재</SlideCover>
            </SwiperSlide>
            <SwiperSlide>
                <SlideCover>정재훈</SlideCover>
            </SwiperSlide>
            <SwiperSlide>
                <SlideCover>정재훈정</SlideCover>
            </SwiperSlide>
        </Swiper>
    );
};

export default Slide;

const SlideCover = styled.div`
    border: 1px solid red;
    cursor: pointer;
`;
