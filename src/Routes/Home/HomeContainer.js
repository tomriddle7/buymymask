import React from "react";
import styled from "styled-components";
import HomePresenter from "./HomePresenter";

const House = styled.div`
  width: 100%;
  height: 400px;
`;

class Home extends React.Component {
  componentDidMount() {                                                    
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js appkey=${process.env.REACT_APP_KAKAO_API}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
          let el = document.getElementById('map');
          let map = new kakao.maps.maps.Map(el, {
            center: new kakao.maps.maps.Coords(523951.25, 1085073.75)
          });
      });
    };
  }
                                                    
  render() {
    return (
        <House id="map"></House>
    );
  }
}

export default Home;