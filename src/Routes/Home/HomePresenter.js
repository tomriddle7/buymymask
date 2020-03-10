import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";

const House = styled.div`
  margin-top: 70px;
  width: 100%;
  height: 400px;
`;

const HomePresenter = ({
    map,
    error,
    loading
  }) => {
    return loading ? (
      <Loader />
    ) : (
      <House className="Home" id="map"></House>
    )
  };
  
  export default HomePresenter;