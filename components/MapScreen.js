import React, {useEffect} from "react";
import {Button, Image, Text, View, Dimensions, ScrollView} from "react-native";
import MapView from 'react-native-maps';
import firebase from 'firebase'
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCs29Ez0H5DZBp_1SJ7K_ztPjpnI5wPLH0",
  authDomain: "hoosearching.firebaseapp.com",
  databaseURL: "https://hoosearching.firebaseio.com",
  projectId: "hoosearching",
  storageBucket: "hoosearching.appspot.com",
  messagingSenderId: "27080950881",
  appId: "1:27080950881:web:c3b17e9223197fe5ea9620"
};

export default function MapScreen(props) {
  let image_name = props.navigation.getParam('landmarkImage');
  let root = "https://simple-express-app.herokuapp.com/assets/"
  let landmarkImage = {
    uri: root + image_name,
  };

  let titleText = props.navigation.getParam('titleText');
  let descriptionText = props.navigation.getParam('descriptionText');
  let coord = {...props.navigation.getParam('landmarkCoordinate')};
  let landmarkCoordinate = {
    latitude: coord['_lat'],
    longitude: coord['_long'],
    latitudeDelta: .01,
    longitudeDelta: .01
  };
  const dbh = firebase.firestore();

  return (
    <View>
      <ScrollView contentContainerStyle={{alignItems: "center"}}>
        <Image style={styles.image} source={landmarkImage}/>
        <MapView
          style={styles.mapStyle}
          initialRegion={landmarkCoordinate}
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
            onPress={() => {
              userId = firebase.auth().currentUser.uid;
              userData =  dbh.collection("users").doc(userId);
              userData.get().then((querySnapshot) => {
                landmarks_found = querySnapshot.data().landmarks_found;
                landmarks_found.push(titleText);
                userData.update({
                  landmarks_found: landmarks_found
                });
              });
              props.navigation.goBack();
            }}
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