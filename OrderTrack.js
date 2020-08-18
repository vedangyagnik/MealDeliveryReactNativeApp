import React, { useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions, Text, Button, Alert} from 'react-native';
import MapView, {Marker, Circle} from 'react-native-maps';
import { isPointWithinRadius } from 'geolib';
import * as Location from 'expo-location';

const OrderTrack = () => {

    const farFromRestLocation = {latitude: 43.744095, longitude: -79.592813};
    const nearFromRestLocation = {latitude: 43.742373, longitude: -79.592552};
    const restaurantCenterLocation = {latitude: 43.742057, longitude: -79.593456};
    const [latLong, setLatLong] = useState(farFromRestLocation);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
            }
      
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    useEffect(() => {
      const isNearRestaurant = isPointWithinRadius(
          latLong,
          restaurantCenterLocation,
          100
      );
      if(isNearRestaurant){
        alert("You are near 100 meter location.");
      }
  }, [latLong]);

  return (
    <View>
        <Button title="current Location" onPress={()=>{setLatLong(farFromRestLocation)}}/>
        <Button title="Get Near Location" onPress={()=>{setLatLong(nearFromRestLocation)}}/>
        <MapView style={styles.mapStyle}
            initialRegion={{
                latitude: 43.744095,
                longitude: -79.592813,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
          <Marker
              coordinate={latLong}
              title="user"
              description="hello user"
          />
          <Circle 
              center={restaurantCenterLocation}
              radius={100}
              strokeWidth={5}
              strokeColor='red'
          />
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

export default OrderTrack;