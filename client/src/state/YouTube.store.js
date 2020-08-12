import React, { useState, createContext, useContext, useEffect } from "react";


const YouTubeStore = createContext();
const { Provider } = YouTubeStore;

const useStore = () => {
  const context = useContext(YouTubeStore);
  if (!context) {
    throw new Error(`useStore must be used within a Provider`);
  }
  return context;
};

const YouTubeProvider = ({ children }) => {
  let [selectedVideo, setSelectedVideo] = useState(null);
  let [videos, setvideos] = useState([]);
  let [catagories, setCatagories] = useState([]);
  let [selectedCategory, setSelectedCategory] = useState('');
  let [listVideos, setListVideos] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [userToken, setUserToken] = useState(null);
  const [isConnected, setIsConnected] = useState(false);



  // state = values to display
  const state = {
    selectedVideo,
    videos,
    catagories,
    selectedCategory,
    listVideos,
    isConnected,
    userProfile,
    userToken,
  };
  // actions = callbacks to invoke
  const actions = {
    setSelectedVideo,
    setvideos,
    setCatagories,
    setSelectedCategory,
    setListVideos,
    setUserToken,
    setIsConnected,
    setUserProfile,
  };

  console.log(catagories);
  return <Provider value={{ ...state, ...actions }}>{children}</Provider>;
};

export { YouTubeProvider, useStore };
