import React, { useState, useEffect } from "react";
import "./imageComponentStyle.css";
import Carousel from "react-elastic-carousel";

function ImageComponent() {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const backGroundColor = [
    "rgb(65, 202, 110)",
    "rgb(250, 177, 83)",
    "rgb(114, 119, 213)",
    "rgb(248, 125, 81)",
    "rgb(237, 84, 102)",
    "rgb(78, 194, 231)",
  ];

  // slider config
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    // load image api call
    fetch("https://krds-assignment.github.io/aoc/api-assets/data.json")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result.features);
        },
        (error) => {
          setError(error);
        }
      );

    // find desktop or mobile
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return !isMobile ? (
    <ul>
      {items &&
        items.map((item, key) => (
          <li
            key={item.title}
            style={{ backgroundColor: backGroundColor[key] }}>
            <div className="container-left">
              <img className="image-logo" src={item.logo} />
              <h4>{item.title}</h4>
              <h4 style={{ opacity: "0.5" }}>{item.desc}</h4>
            </div>
            <div className="container-right">
              <img src={item.image} />
            </div>
          </li>
        ))}
    </ul>
  ) : (
    <Carousel>
      {items &&
        items.map((item, key) => (
          <div key={item.title}>
            <div style={{ backgroundColor: backGroundColor[key] }}>
              <img src={item.logo} />
              <h4>{item.title}</h4>
              <h4 style={{ opacity: "0.5" }}>{item.desc}</h4>
              <img src={item.image} />
            </div>
          </div>
        ))}
    </Carousel>
  );
}

export default ImageComponent;
