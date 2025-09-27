import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Teknolojik Yemekler</h1>
      <p>fırsatı kaçırma</p>
      <p>lezzetli yemeğin adresi</p>
      <Link to="/order">
        <button>ACIKTIM</button>
      </Link>
    </div>
  );
};

export default HomePage;
