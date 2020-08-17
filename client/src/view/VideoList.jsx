import React from "react";
import styled from "styled-components/macro";
import { BACKGROUND } from "../styles/colors";
import { updateCategory, createList } from "../service/fetchApi";

const VideoList = ({
  catagories,
  setSelectedVideo,
  setCatagories,
  userToken,
  isConnected,
}) => {
  const deleteVideo = (category, indx) => {
    let tmpAll = catagories.filter((cat) => cat._id !== category._id);
    let tmpCat = catagories.find((cat) => cat._id === category._id);
    tmpCat.videos.splice(indx, 1);
    setCatagories([tmpCat, ...tmpAll]);
    updateCategory(tmpCat, userToken);
  };

  const saveJson = () => {
    if (isConnected) {
      createList(userToken, catagories);
    }
  };

  return (
    <ListDiv>
      <List>
        {catagories.length > 0 && (
          <div>
            {catagories.map((cat, inx) => {
              return (
                <div key={cat + inx}>
                  <H>{cat.videos.length > 0 ? cat.cat_name : ""}</H>
                  <ul>
                    {cat.videos.map((vid, indx) => {
                      return (
                        <Li key={vid + indx}>
                          <BtA onClick={() => setSelectedVideo(vid)}>
                            {vid.snippet.title}
                          </BtA>
                          <BtDelete onClick={() => deleteVideo(cat, indx)}>
                            delete
                          </BtDelete>
                        </Li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </List>
      <div className="buttonDiv">
        <button className={isConnected ? "" : "disable"} onClick={saveJson}>
          save the list
        </button>
      </div>
    </ListDiv>
  );
};

export default VideoList;

const ListDiv = styled.div`
  width: 500px;
  padding: 0.1rem;
  display: flex;
  flex-direction: column;
`;
const List = styled.div`
  height: 50vh;
  background-color: ${BACKGROUND};
  margin-bottom: 10px;
  font-size: 12px;
  padding: 20px;
  @media only screen and (max-width: 414px) {
    div {
      display: flex;
      flex-direction: column;
      div {
        margin-bottom: 20px;
      }
    }
  }
`;
const BtDelete = styled.button`
  height: 22px;
  background-color: #e08585;
  margin-bottom: 4px;
  font-size: 14px;
  padding: 0 5px;
  min-width: 62px;
  @media only screen and (max-width: 414px) {
    font-size: 12px;
    padding: 1px;
    height: 20px;
  }
`;
const BtA = styled.button`
  width: 360px;
  font-size: 12px;
  padding: 1px;
  min-width: 62px;
  background-color: transparent;
  color: black;
  text-align: initial;
  text-decoration: underline;
  cursor: pointer;
  height: 20px;
  @media only screen and (max-width: 414px) {
    width: fit-content;
    font-size: 10px;
  }
`;
const H = styled.h2`
  font-weight: bold;
  margin: 10px 0 4px 0;
  font-size: 16px;
  @media only screen and (max-width: 414px) {
    margin: 10px 0 0px 0;
    font-size: 16px;
  }
`;
const Li = styled.li`
  margin-bottom: 8px;
  @media only screen and (max-width: 414px) {
    height: 17px;
  }
`;
