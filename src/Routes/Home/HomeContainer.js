/*global kakao*/
import React from "react";
import HomePresenter from "./HomePresenter";

export default class extends React.Component {
  state = {
    kakaoMap: null,
    error: null,
    loading: true
  };

  componentDidMount() {                                                    
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API}&autoload=false`;
    
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
          let el = document.getElementById('map');
          let map = new kakao.maps.Map(el, {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 4
          });
          this.setState({
            kakaoMap: map,
            loading: false
          });
      });
    };
  }
                                                    
  render() {
    const { kakaoMap, loading, error } = this.state;
    return (
      <HomePresenter
        map={kakaoMap}
        error={error}
        loading={loading}
      />
    );
  }
}