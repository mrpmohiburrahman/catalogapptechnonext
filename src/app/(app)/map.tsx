// app/Map.tsx
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { useAppSelector } from '@/redux/hooks';

const MapScreen = () => {
  const location = useAppSelector((state) => state.cart.location);

  if (!location) {
    return (
      <View style={styles.center}>
        <Text>Location not available</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        title="Your Location"
      />
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
