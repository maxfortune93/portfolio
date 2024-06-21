import React, { ReactNode } from 'react';
import { Swiper, SwiperProps } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay, EffectFade  } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './slider.css';

interface SliderProps {
  settings: SwiperProps;
  children: ReactNode;
  paginationColorClass?: string;
}

export default function Slider({ settings, children, paginationColorClass }: SliderProps) {
  return (
    <Swiper modules={[Navigation, Pagination, A11y, Autoplay, EffectFade ]} {...settings} className={paginationColorClass}>
      {children}
    </Swiper>
  );
}