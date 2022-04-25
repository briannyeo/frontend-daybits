import React from "react";

import SwiperCarousel from "../components/SwiperCarousel";

import "./Home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      {/* <DaybitCarousel /> */}
      <SwiperCarousel />
    </div>
  );
};

export default Home;
