/*global kakao*/
import React from "react";
import HomePresenter from "./HomePresenter";
import { getMaskData } from "api";

export default class extends React.Component {
  state = {
    latitude: 0,
    longitude: 0,
    maskData: null,
    error: null,
    loading: true
  };

  askForCoords() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      this.getMaskData();
    });
  }

  getMaskData = async () => {
    try {
      const {
        data: { stores: maskData }
      } = await getMaskData(this.state.latitude, this.state.longitude);
      this.setState({
        maskData
      });
    } catch (e) {
      this.setState({
        error: "Can't find app information."
      });
    } finally {
      kakao.maps.load(() => {
        let el = document.getElementById('map');
        let map = new kakao.maps.Map(el, {
          center: new kakao.maps.LatLng(this.state.latitude, this.state.longitude),
          level: 4
        });
        
        //마스크 정보로 마커 생성
        this.state.maskData.forEach(element => {
          let imageSrc;
          switch(element.remain_stat) {
            case "plenty":
              imageSrc = require("../../Assets/marker_green.png");
              break;
            case "some":
              imageSrc = require("../../Assets/marker_yellow.png");
              break;
            case "few":
              imageSrc = require("../../Assets/marker_red.png");
              break;
            case "empty":
              imageSrc = require("../../Assets/marker_grey.png");
              break;
            default:
                imageSrc = require("../../Assets/marker_grey.png");
                break;
          }
          let imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
          imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          
          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
              markerPosition = new kakao.maps.LatLng(element.lat, element.lng); // 마커가 표시될 위치입니다
  
          // 마커를 생성합니다
          let marker = new kakao.maps.Marker({
              position: markerPosition, 
              image: markerImage // 마커이미지 설정 
          });
  
          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);
          let iwContent = `<div style="padding:5px;">${element.name}<br>${element.addr}<br>${element.remain_stat}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
              iwPosition = new kakao.maps.LatLng(element.lat, element.lng); //인포윈도우 표시 위치입니다

          // 인포윈도우를 생성합니다
          let infowindow = new kakao.maps.InfoWindow({
              position: iwPosition, 
              content: iwContent,
              removable: true
          });

          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'click', function() {
            // 마커 위에 인포윈도우를 표시합니다
            infowindow.open(map, marker);  
          });
          
          this.setState({
            loading: false
          });
        });
      });
    }
  };
  
  componentDidMount() {
    this.askForCoords();
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