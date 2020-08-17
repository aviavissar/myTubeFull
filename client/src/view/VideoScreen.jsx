import React, { useState, useEffect } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import { isMobile } from "react-device-detect";
import { updateCategory } from "../service/fetchApi";

const VideoScreen = ({
  selectedVideo,
  setCatagories,
  selectedCategory,
  catagories,
  userToken,
  isConnected,
}) => {
  const opts = {
    height: isMobile ? "200" : "390",
    width: isMobile ? "300" : "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const [disabledBt, setdisabledBt] = useState(false);

  useEffect(() => {
    setdisabledBt(selectedVideo && isConnected);
  }, [selectedVideo, isConnected]);

  const addVideo = (video, selectedCategoryID) => {
    console.log("selectedCategoryName", selectedCategoryID);

    let catObj = catagories.find(
      (existsCategory) => existsCategory._id === selectedCategoryID
    );
    let catagoriesArray = catagories.filter(
      (existsCategory) => existsCategory._id !== selectedCategoryID
    );
    catObj.videos.push(video);
    setCatagories([catObj, ...catagoriesArray]);
    updateCategory(catObj, userToken);
  };

  return (
    <Box>
      <Screen>
        {selectedVideo && (
          <div>
            <Title>{selectedVideo.snippet.title}</Title>
            <YouTube
              videoId={selectedVideo.id.videoId}
              opts={opts}
              onReady={YouTube._onReady}
            />
          </div>
        )}
      </Screen>
      <div className="buttonDiv">
        <button
          disabled={!disabledBt}
          onClick={() => addVideo(selectedVideo, selectedCategory)}
          className={isConnected ? "" : "disable"}
        >
          add video
        </button>
      </div>
    </Box>
  );
};

export default VideoScreen;

const Box = styled.div`
  padding: 0.1rem;
  height: 500px;
  @media only screen and (max-width: 414px) {
        height: 58vh;
    padding: 10px 16px;
    width: 93%;
  }
`;

const Screen = styled.div`
  width: 640px;
  height: 50vh;
  margin-bottom: 10px;
  font-size: 12px;
  padding: 20px;
  @media only screen and (max-width: 414px) {
    width: 100%;
    height: 35vh;
    padding: 0;
  }
`;

const Title = styled.h3`
  text-transform: capitalize;
  font-size: 1rem;
  line-height: 1.2rem;
  margin-bottom: 11px;
  font-weight: 600;
  @media only screen and (max-width: 414px) {
    font-size: 0.65rem;
    line-height: 1rem;
  }
`;
