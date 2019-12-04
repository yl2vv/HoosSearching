import React, {useEffect} from "react";
import {Button, Image, Text, View, Dimensions, ScrollView, Alert} from "react-native";
import MapView from 'react-native-maps';
import firebase from 'firebase'
import '@firebase/firestore';

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    let image_name = props.navigation.getParam('landmarkImage');
    let root = "https://simple-express-app.herokuapp.com/assets/";
    this.landmarkImage = {
      uri: root + image_name,
    };

    this.titleText = props.navigation.getParam('titleText');
    this.descriptionText = props.navigation.getParam('descriptionText');
    let coord = {...props.navigation.getParam('landmarkCoordinate')};
    this.landmarkCoordinate = {
      latitude: coord['_lat'],
      longitude: coord['_long'],
      latitudeDelta: .01,
      longitudeDelta: .01
    };
  }

  distance = (lat1, lon1, lat2, lon2) => {
    if ((lat1 === lat2) && (lon1 === lon2)) {
      console.log("HERE")
      return 0;
    }
    else {
      const radlat1 = Math.PI * lat1/180;
      const radlat2 = Math.PI * lat2/180;
      const theta = lon1-lon2;
      const radtheta = Math.PI * theta/180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      return dist;
    }
  };


  render() {
    return (
      <View>
        <ScrollView contentContainerStyle={{alignItems: "center"}}>
          <Image style={styles.image} source={this.landmarkImage}/>
          <MapView
            style={styles.mapStyle}
            initialRegion={this.landmarkCoordinate}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            <MapView.Marker
              coordinate={this.landmarkCoordinate}
            />
          </MapView>
          <View style={styles.baseText}>
            <Text style={styles.titleText}>
              {this.titleText}
            </Text>
            <Text style={styles.descriptionText}>
              {this.descriptionText}
            </Text>
          </View>
          <View style={styles.markFound}>
            <Button
              title="Mark found"
              onPress={() => {
                navigator.geolocation.getCurrentPosition((position) => {
                  let lat = position.coords.latitude;
                  let long = position.coords.longitude;
                  let distance = this.distance(lat, long, this.landmarkCoordinate.latitude, this.landmarkCoordinate.longitude);
                  // within 100ft
                  if (distance > 0.02) {
                    Alert.alert(
                      'Landmark Too Far',
                      'Please move closer to landmark.'
                    );
                  } else {
                    Alert.alert(
                      'Landmark Found',
                      'Congratulations on your nice find.'
                    );
                    let userId = firebase.auth().currentUser.uid;
                    let userData =  dbh.collection("users").doc(userId);
                    userData.get().then((querySnapshot) => {
                      let landmarks_found = querySnapshot.data().landmarks_found;
                      landmarks_found.push(this.titleText);
                      userData.update({
                        landmarks_found: landmarks_found
                      });
                    });
                    this.props.navigation.goBack();
                  }
                });
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
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