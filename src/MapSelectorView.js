// @flow
import React from 'react'
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps'
import withCurrentLocation from './with-current-location'

const InitRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

const MapViewBase = (props: { currentLocation: ?Position }) => {
  let region = {}
  let marker

  if (props.currentLocation) {
    const { coords } = props.currentLocation
    region = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }

    marker = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    }
  } else {
    region = InitRegion
  }

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <MapView style={StyleSheet.absoluteFillObject} showsUserLocation region={region}>
        { marker && <MapView.Marker coordinate={marker}/>}
      </MapView>
    </View>
  )
}

export default withCurrentLocation(MapViewBase)