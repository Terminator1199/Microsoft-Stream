import React, { useEffect, useState } from "react";
import Landing from "./components/Landing/Landing";
import RowItemSlider from "./components/RowItemSlider/RowItemSlider";
import { useSelector } from "react-redux";
import { SkeletonTheme } from "react-loading-skeleton";
import { getImageData } from "../../Api/Api";
import "./Home.css";

export default function Home() {
  const [regressionData, setRegressionData] = useState([]);
  const [contentData, setContentData] = useState([]);
  const [userCollab, setUserCollab] = useState([]);
  const [itemCollab, setItemCollab] = useState([]);

  const getRecommendationData = async (api, setData) => {
    const recRes = await fetch(api);
    const recData = await recRes.json();
    setData(recData);
  };

  const userId = useSelector((state) => {
    return state.userInfo.userId;
  });
  useEffect(() => {
    getRecommendationData(
      `http://localhost:8000/recommendation/${String(userId)}/rec-reg`,
      setRegressionData
    );
    getRecommendationData(
      `http://localhost:8000/recommendation/${String(userId)}/rec-con`,
      setContentData
    );
    getRecommendationData(
      `http://localhost:8000/recommendation/${String(userId)}/rec-coli`,
      setItemCollab
    );
    getRecommendationData(
      `http://localhost:8000/recommendation/${String(userId)}/rec-colu`,
      setUserCollab
    );
  }, [userId]);

  return (
    <div className="home__container">
      {/* <div className="home__landing">
        <Landing />
      </div> */}
      <div className="home__title__video flex__center">
        <iframe
          width="1060"
          height="615"
          src="https://www.youtube.com/embed/2Vv-BfVoq4g"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className="home__main">
        <div className="home__main-overlay"></div>
        <div className="home__catalogues">
          <SkeletonTheme
            color="#0aa1dd"
            baseColor="#0aa1dd"
            highlightColor="#222121"
          >

            {regressionData.length > 0 && (
              <RowItemSlider header="Regression Based" data={regressionData} />
            )}

            {contentData.length > 0 && (
              <RowItemSlider
                header="Content based on Pirates of carebian"
                data={contentData}
              />
            )}
            {userCollab.length > 0 && (
              <RowItemSlider header="User Collabrative" data={userCollab} />
            )}
            {itemCollab.length > 0 && (
              <RowItemSlider header="Item Collabrative" data={itemCollab} />
            )}

          </SkeletonTheme>
        </div>
      </div>
    </div>
  );
}
