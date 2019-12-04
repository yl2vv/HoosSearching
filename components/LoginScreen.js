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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.title}>Happy Hunting!</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={iconImage}/>
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
  loginButton: {
    width: Dimensions.get("window").width
  },
  image: {
    width: Dimensions.get("window").width/2,
    height: Dimensions.get("window").height/2,
    resizeMode: "contain"
  },
  title: {
    fontSize: 30,
    color: "#6495ed",
    fontWeight: 'bold',
  }
};