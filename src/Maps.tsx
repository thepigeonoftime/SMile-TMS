import React, { useState, useEffect } from "react";
import { Button, FlatList, Text, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MapsProps } from "./Types";
import { Center } from "./Center";
import { UrlTile, Overlay, Marker, Polyline } from "react-native-maps";
import { MapView } from "expo";
import axios from "axios";


const Stack = createStackNavigator < MapsProps > ();

const MapsView = ({ navigation }) => {


    // let region = {
    //     latitude: 52.5200,
    //     longitude: 13.4050,
    //     latitudeDelta: 0.1,
    //     longitudeDelta: 0.05,
    // };

    // const origin = {latitude: 37.3318456, longitude: -122.0296002};
    // const destination = {latitude: 37.771707, longitude: -122.4053769};

    const HERE_APPID = "pbHofeJ8BquSqxLG3K26";
    const HERE_APIKEY = "x-6Yvgvamvf-dT0n4YSJetgNX7BxHKSCgdjN-jDS76M";
    // const tileUrl = "https://1.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day13/4400/2686/256/png8" +
    // "?app_id=" + HERE_APPID + "&app_code=" + HERE_APIKEY;

    // const routeUrl = "https://route.ls.hereapi.com/routing/7.2/calculateroute.json"+
    //                 "?apiKey=" + HERE_APIKEY + "&waypoint0=geo!52.5200,13.4050&waypoint1=geo!52.8000,13.4444&mode=fastest;car;traffic:enabled";


const [startingLocation, setStartLoc] = useState({
            latitude: "52.5",
            longitude: "13.4",
  });
const [finishLocation, setFinLoc] = useState ({
           latitude: "53.5",
           longitude: "14.4",
  });

const [region, setRegion] = useState ({
        latitude: 52.5200,
        longitude: 13.4050,
        latitudeDelta: 0.1,
        longitudeDelta: 0.05,
  });

const [mapRoute, setRoute] = useState ({
  routeForMap: { },
// here we can access route summary which will show us how long does it take to pass the route, distance etc.
  summary: "",
// NOTE just add this 'isLoading' field now, I'll explain it later
  isLoading: true,
});

useEffect(() => {
  this.getRoute();
});

const getRoute = () => {
    // we are using parseFloat() because HERE API expects a float
    let from_lat = parseFloat(this.state.startingLocation.latitude);
    let from_long = parseFloat(this.state.startingLocation.longitude);
    let to_lat = parseFloat(this.state.finishLocation.latitude);
    let to_long = parseFloat(this.state.finishLocation.longitude);
    // we will save all Polyline coordinates in this array
    let routeCoordinates = [];
    axios.get(`https://route.api.here.com/routing/7.2/calculateroute.json?app_id=${HERE_APPID}&app_code=${HERE_APIKEY}&waypoint0=geo!${from_lat},${from_long}&waypoint1=geo!${to_lat},${to_long}&mode=fastest;bicycle;traffic:disabled&legAttributes=shape`).then(res => {
        // here we are getting all route coordinates from API response
        let routeCoordinates;
        console.log(routeCoordinates);
        res.data.response.route[0].leg[0].shape.map(m => {
            // here we are getting latitude and longitude in seperate variables because HERE sends it together, but we
            // need it seperate for <Polyline/>
            let latlong = m.split(',');
            let latitude = parseFloat(latlong[0]);
            let longitude = parseFloat(latlong[1]);
            routeCoordinates.push({latitude: latitude, longitude: longitude});
        });
        setRoute(prev => ({
            routeForMap: routeCoordinates,
            // here we can access route summary which will show us how long does it take to pass the route, distance etc.
            summary: res.data.response.route[0].summary,
            // NOTE just add this 'isLoading' field now, I'll explain it later
            isLoading: false,
        }));
    }).catch(err => {
        console.log(err);
    });
};
    if (mapRoute.isLoading) {
        return (
            <Text>Loading...</Text>
        );
    } else {
    return (
    <MapView>
      <Polyline coordinates={{mapRoute.routeForMap}} strokeWidth={7} strokeColor="red" geodesic={true}/>
      <Marker coordinate={{latitude: this.state.startingLocation.latitude, longitude: this.state.startingLocation.longitude}} title="Starting location"/>
      <Marker coordinate={{latitude: this.state.finishLocation.latitude, longitude: this.state.finishLocation.longitude}} title="Finishlocation"/>
    </MapView>
     );
  }
}


export const Maps: React.FC < {} > = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Maps">
      <Stack.Screen options={{title: "Karte"}} name="Maps" component={MapsView} />
    </Stack.Navigator>
    );
};
