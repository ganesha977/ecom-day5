import React from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import images
import slideBanner1 from '../assets/slideBanner1.jpg';
import slideBanner2 from '../assets/slideBanner2.jpg';

import slideBanner3 from '../assets/slideBanner3.jpg';
import slideBanner4 from '../assets/slideBanner4.jpg';

import slideBanner5 from '../assets/slideBanner5.jpg';


const Carousel = () => {
  return (
    <BootstrapCarousel interval={2000} fade>
      <BootstrapCarousel.Item>
        <img
          className="d-block w-100"
          src={slideBanner1}
          alt="Slide 1"
        />
      </BootstrapCarousel.Item>
      <BootstrapCarousel.Item>
        <img
          className="d-block w-100"
          src={slideBanner2}
          alt="Slide 2"
        />
      </BootstrapCarousel.Item>
      <BootstrapCarousel.Item>
        <img
          className="d-block w-100"
          src={slideBanner3}
          alt="Slide 3"
        />
      </BootstrapCarousel.Item>
      
      <BootstrapCarousel.Item>
        <img
          className="d-block w-100"
          src={slideBanner4}
          alt="Slide 4"
        />
      </BootstrapCarousel.Item>
      <BootstrapCarousel.Item>
        <img
          className="d-block w-100"
          src={slideBanner5}
          alt="Slide 5"
        />
      </BootstrapCarousel.Item>
    </BootstrapCarousel>
  );
};

export default Carousel;
