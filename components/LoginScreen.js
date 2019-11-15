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

firebase.initializeApp(firebaseConfig);

const iconImage = require('../assets/hoossearching.jpg')

export default function LoginScreen(props) {
  loginWithFacebook = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      '2392251221088863',
      { permissions: ['public_profile'] }
    );
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential).then(() => {
        props.navigation.push('List')
      }).catch((error) => {
        props.navigation.push('List')
        console.log(error)
      });
    } else {
      props.navigation.push('List')
      console.log("Unsucessful facebook login.")
    }
  }
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => props.navigation.push('List')}>
          <Image style={styles.image} source={iconImage}/>
        </TouchableOpacity>
      </View>
      <View style={styles.loginButton}>
        <Button
          title="Login with Facebook"
          onPress={() => loginWithFacebook()}
        />
      </View>
    </View>
  );
}

const styles = {
  loginButton: {
    width: Dimensions.get("window").width
  },
  image: {
    width: Dimensions.get("window").width/2,
    height: Dimensions.get("window").height/2,
    resizeMode: "contain"
  }
}