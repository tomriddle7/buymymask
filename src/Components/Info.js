import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 60px;
  left: 15px;
  z-index: 1000;
  h1 {
    padding: 10px 20px;
    border: 1px solid #ddd;
    background-color: #fff;
    cursor: pointer;
  }
`;

const MarkerInfo = styled.ul`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px 10px 10px;
  background-color: rgba(255, 255, 255, 0.8);
  list-style: none;
  font-size: 13px;
  li + li {
    margin-top: 5px;
  }
  img {
    display: inline-block;
    vertical-align: middle;
    width: 15px;
    margin-right: 10px;
  }
  span {
    vertical-align: baseline;
  }
`;

export default () => (
    <Container>
    <h1>공적 마스크 판매정보</h1>
    <MarkerInfo>
      <li>
        <img
          src="https://raw.githubusercontent.com/tomriddle7/buymymask/master/src/Assets/marker_pill_green.png"
          alt=""
        />
        <span>100개 이상</span>
      </li>
      <li>
        <img
          src="https://raw.githubusercontent.com/tomriddle7/buymymask/master/src/Assets/marker_pill_yellow.png"
          alt=""
        />
        <span>30 ~ 99개</span>
      </li>
      <li>
        <img
          src="https://raw.githubusercontent.com/tomriddle7/buymymask/master/src/Assets/marker_pill_red.png"
          alt=""
        />
        <span>2 ~ 29개</span>
      </li>
      <li>
        <img
          src="https://raw.githubusercontent.com/tomriddle7/buymymask/master/src/Assets/marker_pill_grey.png"
          alt=""
        />
        <span>미입고</span>
      </li>
    </MarkerInfo>
  </Container>
);