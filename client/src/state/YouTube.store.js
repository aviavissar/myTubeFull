import React, { useState, createContext, useContext,useEffect} from "react";

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
  let [catagories, setCatagories] = useState(JSON.parse(localStorage.getItem('YTcatagories')) || []);
  let [selectedCategory, setSelectedCategory] = useState("");
  let [listVideos, setListVideos] = useState([]);
  const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem('YTuserProfile')) || {});
  const [userToken, setUserToken] = useState(localStorage.getItem('YTuserToken') || null);
  const [isConnected, setIsConnected] = useState(JSON.parse( localStorage.getItem('YTisConnected')) || false);
  
  useEffect(() => {
    localStorage.setItem("YTisConnected", JSON.stringify(isConnected));
    if(isConnected){
      localStorage.setItem("YTuserProfile", JSON.stringify(userProfile));
      localStorage.setItem("YTcatagories", JSON.stringify(catagories)); 
       localStorage.setItem("YTuserToken", userToken);
    }else{
      localStorage.clear()
    }

  }, [isConnected,userProfile,catagories,userToken]);



  console.log(catagories);

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
  
  return <Provider value={{ ...state, ...actions }}>{children}</Provider>;
};

export { YouTubeProvider, useStore };
