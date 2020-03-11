import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";

const House = styled.div`
  width: 100%;
  height: 400px;
`;

const HomePresenter = ({
    error,
    loading
  }) => {
    return <div id="map" style={{ width: "100vw", height: "100vh" }} />
  };
  
  export default HomePresenter;