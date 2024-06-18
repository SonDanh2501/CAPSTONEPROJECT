import React, { useState, useEffect } from "react";
import axios from "axios";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBox = () => {
  const [lng, setLng] = useState(106.77194528140673);
  const [lat, setLat] = useState(10.85082205553165);

  const [showPopup, togglePopup] = useState(false);
  const [addressMarker, setAddressMarker] = useState([]);
  const addressdata = [
    {
      id: 1,
      address:
        "01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
    },
 
  ];
  useEffect(() => {
    let newaddressdata = [];
    addressdata.map((address) => {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${address?.address}.json?access_token=pk.eyJ1Ijoic29uZGFuaCIsImEiOiJjbHdybjV2b2owMm53MnFwcmpjbnE5OGZtIn0.0A1izf6qM7jX3iFkHt4_HQ`
        )
        .then(function(response) {
          // console.log(response);
          newaddressdata.push({
            ...address,
            longitude: response.data.features[0].geometry.coordinates[0],
            latitude: response.data.features[0].geometry.coordinates[1],
          });
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {});
    });
    // console.log("arr new >>> ", newaddressdata);
    setTimeout(() => {
      setAddressMarker(newaddressdata);
    }, 500);
  }, []);
  console.log("arr show up >> ", addressMarker);
  return (
    <Map
      mapboxAccessToken="pk.eyJ1Ijoic29uZGFuaCIsImEiOiJjbHdybjV2b2owMm53MnFwcmpjbnE5OGZtIn0.0A1izf6qM7jX3iFkHt4_HQ"
      style={{
      
        width: "100%",
        // borderRadius: "",
      }}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 13,
      }}
      //   10.85082205553165, 106.77194528140673
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      *{" "}
      <Popup
        longitude={lng}
        latitude={lat}
        closeButton={true}
        closeOnClick={true}
        anchor="top-right"
      >
        <div>
          <span>
            01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam
          </span>
        </div>
      </Popup>
      <Marker longitude={lng} latitude={lat}></Marker>
      {/* {addressMarker?.map((el) => (
        <Marker longitude={el?.longitude} latitude={el?.latitude}></Marker>
      ))} */}
      <NavigationControl position="bottom-right" />
      <GeolocateControl />
      <FullscreenControl />
    </Map>
  );
};

export default MapBox;
