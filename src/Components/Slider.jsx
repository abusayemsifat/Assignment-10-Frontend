import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import c1 from '../assets/cat1.jpg'
import c2 from '../assets/cat2.jpg'
import c3 from '../assets/cat3.jpg'

const Slider = () => {
    return (
        <div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                <SwiperSlide><img className='w-full h-[600px] object-cover object-center' src={c1} alt="" /></SwiperSlide>
                <SwiperSlide><img className='w-full h-[600px] object-cover object-center' src={c2} alt="" /></SwiperSlide>
                <SwiperSlide><img className='w-full h-[600px] object-cover object-center' src={c3} alt="" /></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;