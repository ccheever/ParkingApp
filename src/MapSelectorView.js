// @flow
import React from 'react'
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps'
import withCurrentLocation from './with-current-location'

const deltaLat = 0.01534
const deltaLong = 0.00702

const InitRegion = {
  latitude: 40.78825,
  longitude: -122.4324,
  latitudeDelta: deltaLat,
  longitudeDelta: deltaLong,
}

class MapViewBase extends React.Component {
  props: {
    location?: Position,
  }

  state: {
    region?: {
      latitude: number,
      longitude: number,
      latitudeDelta: number,
      longitudeDelta: number,
    },
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    const location = nextProps.location

    if (location) {
      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: deltaLat,
        longitudeDelta: deltaLong,
      }

      this.setState({ region })
    }
  }

  regionUpdated = (region) => {
    this.setState({ region })
  }

  render() {
    const region = this.state.region || InitRegion
    const middle = {
      latitude: region.latitude,
      longitude: region.longitude,
    }

    return (
      <MapView style={StyleSheet.absoluteFillObject} showsUserLocation region={region} onRegionChange={this.regionUpdated}>
        <MapView.Marker coordinate={middle}/>
      </MapView>
    )
  }
}

export default withCurrentLocation(MapViewBase)
