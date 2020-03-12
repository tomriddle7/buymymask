import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";

const House = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 100vh;
`;

const HomePresenter = ({
    error,
    loading
  }) => {
    return <House>
      <div id="map" style={{ width: "100vw", height: "100vh" }} />
    </House>
  };
  
  export default HomePresenter;