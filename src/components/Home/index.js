import React, { Fragment } from "react";
import HomeSlider from "./slider";
import Subscriptions from "./../utils/subscribe";
import HomeArticles from "./articles";
import Poll from "../utils/poll";

const Home = () => {
  return (
    <Fragment>
      <HomeSlider />
      <Subscriptions />
      <div className="container">
        <HomeArticles />
        <Poll />
      </div>
    </Fragment>
  );
};

export default Home;
