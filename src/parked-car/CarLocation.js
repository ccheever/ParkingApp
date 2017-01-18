// @flow
import React from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { View } from '@shoutem/ui'
import { deltaLat, deltaLong } from '../state/map-viewport'

import type { MapRegion } from '../state/map-viewport'

import { Components } from 'exponent';
const MapView = Components.MapView;


const CarLocationBase = (props: {
  height: number,
  region: MapRegion
}) => {
  const { height, region } = props

  const regionWithZoom = {
    ...region,
    latitudeDelta: deltaLat,
    longitudeDelta: deltaLong,
  }

  const carLocation = {
    latitude: region.latitude,
    longitude: region.longitude,
  }

  return (
    <View style={{ height: height / 2.5 }}>
      <MapView style={StyleSheet.absoluteFillObject} showsUserLocation initialRegion={regionWithZoom}>
        <MapView.Marker coordinate={carLocation} />
      </MapView>
    </View>
  )
}

const mapStateToProps = (state: { mapViewport: MapRegion }) => (
  { region: state.mapViewport }
)

const CarLocation = connect(mapStateToProps)(CarLocationBase)

export default CarLocation
