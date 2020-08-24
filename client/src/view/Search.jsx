import React, { useState } from "react";
import styled from "styled-components/macro";
import { BACKGROUND, BORDER } from "../styles/colors";
import Option from "./Option";

const Search = ({ handleFormSubmit, videosQuery }) => {
  let [term, setTerm] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setTerm(event.target.value);
    handleFormSubmit(term);
  };

  return (
    <div>
      <form>
        <SearchInput
          onChange={handleSubmit}
          type="text"
          label="WHERE"
          placeholder="find..."
          value={term}
        />
        <Ul>
          {videosQuery.map((vid, indx) => {
            return (
              <Option
                key={indx}
                title={vid.snippet.title}
                setTrem={() => setTerm("")}
                videoObj={vid}
                indx={indx}
              />
            );
          })}
        </Ul>
      </form>
    </div>
  );
};

export default Search;

const SearchInput = styled.input`
  border: 1px solid ${BORDER};
  @media only screen and (max-width: 414px) {
    min-width: initial;
    margin: 5px;
    padding: 1px 5px;
    height: 30px;
    color: black;
    font-size: 0.8rem;
    width: 130px;
  }
`;
const Ul = styled.ul`
  background-color: ${BACKGROUND};
  width: 100%;
  position: relative;
  font-size: 12px;
  top: 23px;
  padding: 0 1.5vw 0 1.5vw;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 1px solid ${BORDER};
  border-top: none;
  left: -85px;
  @media only screen and (max-width: 414px) {
    min-width: initial;
    margin: 0px;
    height: initial;
    color: black;
    font-size: 0.62rem;
    width: 200%;
    top: 11px;
    left: -115px;
  }
`;
