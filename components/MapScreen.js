import React, {useEffect} from "react";
import {Button, Image, Text, View, Dimensions, ScrollView} from "react-native";
import MapView from 'react-native-maps';

export default function MapScreen(props) {
  image_name = props.navigation.getParam('landmarkImage');
  root = "https://simple-express-app.herokuapp.com/assets/"
  landmarkImage = {
    uri: root + image_name,
  }
  console.log(landmarkImage)

  titleText = props.navigation.getParam('titleText');
  descriptionText = props.navigation.getParam('descriptionText');
  let coord = {...props.navigation.getParam('landmarkCoordinate')};
  landmarkCoordinate = {
    latitude: coord['_lat'],
    longitude: coord['_long'],
    latitudeDelta: .01,
    longitudeDelta: .01
  };
  mapInitialRegion = landmarkCoordinate;
  
  return (
    <View>
      <ScrollView contentContainerStyle={{alignItems: "center"}}>
        <Image style={styles.image} source={landmarkImage}/>
        <MapView
          style={styles.mapStyle}
          initialRegion={mapInitialRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <MapView.Marker
            coordinate={landmarkCoordinate}
          />
        </MapView>
        <View style={styles.baseText}>
          <Text style={styles.titleText}>
            {titleText}
          </Text>
          <Text style={styles.descriptionText}>
            {descriptionText}
          </Text>
        </View>
        <View style={styles.markFound}>
          <Button
            title="Mark found"
            onPress={() => props.navigation.goBack()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/4
  },
  image: {
    width: Dimensions.get('window').width,
    height: 300
  },
  markFound: {
    margin: 30
  },
  baseText: {
  },
  titleText: {
    fontWeight: "bold",
    color: "grey",
    fontSize: 30,
    marginTop: 30,
    marginLeft: 30
  },
  descriptionText: {
    fontSize: 20,
    margin: 30
  }
};