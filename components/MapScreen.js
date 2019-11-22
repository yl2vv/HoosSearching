import React, {useEffect} from "react";
import {Button, Image, Text, View, Dimensions, ScrollView} from "react-native";
import MapView from 'react-native-maps';

const mapInitialRegion = {
  latitude: 38.0362244,
  longitude: -78.5092874,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const landmarkCoordinate = {
  latitude: 38.0332459,
  longitude: -78.5046905,
};

const landmarkImage = require('../assets/homer.jpg');

const titleText = "Statue of Homer";

const descriptionText = "Blind Homer With His Student Guide is a bronze sculpture by Moses Jacob Ezekiel in the likeness of the blind poet Homer, author of the Iliad, accompanied by a student guide. Ezekiel completed the statue in 1907 on a commission from John Woodruff Simpson as a gift for Amherst College, his alma mater. For reasons unknown the gift was refused, and Thomas Nelson Page, a Virginia alumnus who was active in the UVA Alumni Association, stepped in to secure the gift of the statue to UVa instead. Ezekiel completed the work in his Rome studio and donated a five foot tall black marble pedestal upon which the statue was originally installed. The statue is installed on The Lawn, in the grass to the north of Old Cabell Hall.";

export default function MapScreen(props) {
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