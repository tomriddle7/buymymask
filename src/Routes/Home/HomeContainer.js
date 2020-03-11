/*global kakao*/
import React from "react";
import HomePresenter from "./HomePresenter";

export default class extends React.Component {
  state = {
    kakaoMap: null,
    latitude: 0,
    longitude: 0,
    error: null,
    loading: true
  };

  askForCoords() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }
  
  componentDidMount() {    
    this.askForCoords();                                                
    kakao.maps.load(() => {
      let el = document.getElementById('map');
      let map = new kakao.maps.Map(el, {
        center: new kakao.maps.LatLng(this.state.latitude, this.state.longitude),
        level: 4
      });
      this.setState({
        loading: false
      });
  });
  }
                                                    
  render() {
    const { loading, error } = this.state;
    return (
      <HomePresenter
        error={error}
        loading={loading}
      />
    );
  }
}