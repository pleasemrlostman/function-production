import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

// https://stackoverflow.com/questions/69154197/module-not-found-cant-resolve-swiper-css
// 스와이퍼 설치하고 사용할때는 해당버전을 이용하도록 하자 (6.8.4)
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
