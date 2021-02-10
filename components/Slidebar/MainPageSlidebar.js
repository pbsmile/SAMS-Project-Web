import React from "react";
import { Slide } from "react-slideshow-image";
import { Fade } from "react-slideshow-image";
import Slideimg1 from "../../Image/Slideimg1.jpg";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const MainPageSlidebar = () => {
  return (
    <div className="">
      <Carousel showArrows={true}>
        <div>
          <img src={Slideimg1} />
          
        </div>
        <div>
          <img src={Slideimg1} />
          
        </div>
        <div>
          <img src={Slideimg1} />
          
        </div>
      </Carousel>
    </div>
  );
};

export default MainPageSlidebar;
