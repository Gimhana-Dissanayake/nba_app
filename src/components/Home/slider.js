import React, { useState, useEffect, Fragment } from "react";
import Slider from "react-slick";
import axios from "axios";
import { URL_SLIDES } from "../utils/paths";

const settings = {
  arrows: false,
  dots: false,
  inifine: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  pauseOnHover: false,
  autoplaySpeed: 5000,
};

const HomeSlider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(URL_SLIDES);
        setSlides(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSlides();
  }, []);

  console.log(slides);

  return (
    <Fragment>
      {slides ? (
        <Slider {...settings}>
          {slides.map((item) => (
            <div key={item.id}>
              <div
                className="item_slider"
                style={{ background: `url(/images/covers/${item.cover})` }}
              >
                <div className="caption">
                  <h4>{item.topic}</h4>
                  <p>{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : null}
    </Fragment>
  );
};

export default HomeSlider;
