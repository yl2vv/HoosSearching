import * as React from "react";
import {Button, Text, View, Alert, Dimensions, Image, TouchableOpacity} from "react-native";
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';


const firebaseConfig = {
  apiKey: "AIzaSyCs29Ez0H5DZBp_1SJ7K_ztPjpnI5wPLH0",
  authDomain: "hoosearching.firebaseapp.com",
  databaseURL: "https://hoosearching.firebaseio.com",
  projectId: "hoosearching",
  storageBucket: "hoosearching.appspot.com",
  messagingSenderId: "27080950881",
  appId: "1:27080950881:web:c3b17e9223197fe5ea9620"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const iconImage = require('../assets/hoossearching.jpg');

export default function LoginScreen(props) {
  loginWithFacebook = async () => {
    if (firebase.auth().currentUser === null) {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '2392251221088863',
        { permissions: ['public_profile'] }
      );
      if (type === 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase.auth().signInWithCredential(credential).then((result) => {
          props.navigation.push('List');
        }).catch((error) => {
          Alert.alert("Unsuccessful facebook login.");
        });
      } else {
        Alert.alert("Unsuccessful facebook login.");
      }
    } else {
      props.navigation.push('List');
    }
  };

  return (
    <View style={styles.cont}>
      <View style={styles.logo}>
        <View style={styles.words}>
          <Text style={styles.title}>Happy Hunting!</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={iconImage}/>
        </View>
      </View>
      <View style={styles.loginButton}>
        <Button
          title="Login with Facebook"
          onPress={() => loginWithFacebook()}
        />
      </View>
    </View>
  );
};

const styles = {
  cont: {
    flex: 1, 
    flexDirection: "row", 
    justifyContent: 'center', 
    flexWrap: 'wrap',
  },
  logo: {
    height: "70%",
    alignItems: "center",
  },
  loginButton: {
    width: 300,
    height: 70,
    justifyContent: "center",
    top: "15%",
    alignItems: "center"

  },
  imageContainer: {
    height: "60%",
    justifyContent: "center",
    paddingTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    justifyContent: "center"
  },
  words: {
    height: "40%",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: 30,
    color: "#6495ed",
    fontWeight: 'bold',
  }
};