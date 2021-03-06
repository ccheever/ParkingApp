// @flow
import React from 'react'
import { StyleSheet } from 'react-native'
//import MapView from 'react-native-maps'
import { connect } from 'react-redux'
import { updateRegion, deltaLat, deltaLong } from '../state/map-viewport'

import type { MapRegion } from '../state/map-viewport'

import { Components } from 'exponent';
const MapView = Components.MapView;

const MapViewBase = (props: {
  dispatch: Function,
  mapViewport: MapRegion,
}) => {
  const { dispatch, mapViewport } = props

  const middle = {
    latitude: mapViewport.latitude,
    longitude: mapViewport.longitude,
  }

  const viewportUpdated = (region) => {
    dispatch(updateRegion(region))
  }

  return (
    <MapView style={StyleSheet.absoluteFillObject} showsUserLocation region={mapViewport} onRegionChange={viewportUpdated}>
      <MapView.Marker coordinate={middle} />
    </MapView>
  )
}

const mapStateToProps = (state: { mapViewport: MapRegion }) => (
  { mapViewport: state.mapViewport }
)

class UpdateWithCurrentLocation extends React.Component {
  componentWillMount() {
    const getLocationSucc = (location: Position) => {
      this.watchId !== null && navigator.geolocation.clearWatch(this.watchId)

      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: deltaLat,
        longitudeDelta: deltaLong,
      }

      this.props.dispatch(updateRegion(region))

      // n.b.: This fixes a weird UI issue; if dispatch isn't called
      // in a setTimeout, then the pin will not render when the current location
      // is obtained. I think that calling setTimeout allows the view to "stutter"
      // a bit, causing the pin to render.
      setTimeout(() => {
        this.props.dispatch(updateRegion(region))
      }, 0)
    }

    const getLocationErr = (error) => {
      console.log('Error on fetch location', error) // eslint-disable-line no-console
    }

    this.watchId = navigator.geolocation.watchPosition(
      getLocationSucc,
      getLocationErr,
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000,
      }
    )
  }

  watchId = null

  props: {
    dispatch: Function,
    mapViewport: MapRegion,
  }

  render () {
    return (
      <MapViewBase {...this.props} />
    )
  }
}

export default connect(
  mapStateToProps,
)(UpdateWithCurrentLocation)
