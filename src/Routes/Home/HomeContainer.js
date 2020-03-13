/*global kakao*/
import React from "react";
import HomePresenter from "./HomePresenter";
import { throttle } from 'lodash';
import { getMaskData } from "api";

let map;

export default class extends React.Component {
  state = {
    latitude: 0,
    longitude: 0,
    maskData: null,
    markerData: null,
    error: null,
    loading: true
  };

  askForCoords() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      this.setMapData();
      this.getMaskData(position.coords.latitude, position.coords.longitude);
    });
  }

  getMaskData = async (latitude, longitude) => {
    try {
      const {
        data: { stores: maskData }
      } = await getMaskData(latitude, longitude);
      this.setState({
        maskData
      });
    } catch (e) {
      this.setState({
        error: "Can't find app information."
      });
    } finally {
      /*if(this.state.maskData) {
        this.state.maskData.forEach(element => {
          marker.setMap(null);
        });
      }*/
      
      //마스크 정보로 마커 생성
      if(this.state.maskData) {
        this.state.maskData.forEach(element => {
          let imgType, imgStat;
          switch(element.type) {
            case "01":
              imgType = "pill";
              break;
            case "02":
              imgType = "mart";
              break;
            case "03":
              imgType = "post";
              break;
          }
          switch(element.remain_stat) {
            case "plenty":
              imgStat = "green";
              break;
            case "some":
              imgStat = "yellow";
              break;
            case "few":
              imgStat = "red";
              break;
            case "empty":
              imgStat = "grey";
              break;
            default:
              imgStat = "grey";
              break;
          }
          let imageSrc = require(`../../Assets/marker_${imgType}_${imgStat}.png`),
          imageSize = new kakao.maps.Size(20, 20), // 마커이미지의 크기입니다
          imageOption = {offset: new kakao.maps.Point(10, 10)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          

          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
              markerPosition = new kakao.maps.LatLng(element.lat, element.lng); // 마커가 표시될 위치입니다
  
          // 마커를 생성합니다
          let marker = new kakao.maps.Marker({
              position: markerPosition, 
              image: markerImage, // 마커이미지 설정
              clickable: true
          });
  
          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);
          let iwContent = `<div style="padding:5px; font-size: 15px;">${element.name}<br>입고시간: ${element.stock_at ? element.stock_at.substr(11, 5) : null}<br><a href='https://map.kakao.com/link/search/${element.name}' style="color:blue" target="_blank">판매처정보</a>　<a href='https://map.kakao.com/link/to/${element.name},${element.lat},${element.lng}' style="color:blue" target="_blank">길찾기</a></div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
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
        });
      }
      this.setState({
        loading: false
      });
    }
  };

  setMapData() {
    kakao.maps.load(() => {
      let el = document.getElementById('map');
      map = new kakao.maps.Map(el, {
        center: new kakao.maps.LatLng(this.state.latitude, this.state.longitude),
        level: 4
      });
      kakao.maps.event.addListener(map, 'bounds_changed', throttle(function() {
        let center = map.getCenter();
        /*this.setState({
          latitude: center.getLat(),
          longitude: center.getLng()
        });*/
        this.getMaskData(center.getLat(), center.getLng());
      }, 1000).bind(this), false);
    });
  }
  
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