import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Navbar from "../components/NavBar";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <Navbar />
      <Announcement />
      <Slider />
      <Categories />
      <Footer />
    </>
  );
};

export default Home;
