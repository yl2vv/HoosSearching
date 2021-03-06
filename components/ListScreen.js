import * as React from 'react';
import {Button, Text, View, Alert, FlatList, Image} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase'
import '@firebase/firestore';


state = {
  weather: "",
  temp: "",
}
const zipcode = "22903"
const key = "e319d542e4461aab593eb5fc61ad740a"
web_url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&units=imperial&appid=" +  key


const iconImage = require('../assets/hoossearching.jpg');

function Item({ name, found, onpress}) { 
  if (found) {
    item_obj = (
      <View style={styles.item}>
        <Text style={styles.namefound}>{name}</Text>
        <Image style={styles.image} source={iconImage}/>
      </View>
    );
  }
  else {
    item_obj = (
      <View style={styles.item}>
        <Text style={styles.name}>{name}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onpress}>
      { item_obj }
    </TouchableOpacity>
  )
}


export default class ListScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
  }
    
  verifyCreateUser = async () => {
    dbh = firebase.firestore();
    userId = firebase.auth().currentUser.uid;
    usersRef = dbh.collection('users');
    return usersRef.doc(userId).get()
      .then(doc => {
        return doc.data()
      })
      .then(doc_data => {
        if (!doc_data) {
          return usersRef.doc(userId).set({
            landmarks_found: []
          })
        }
      })
  };

  load_data = async () => {
    let places = [];
    this.get_found_landmarks()
      .then((found_places) => {
        dbh.collection("landmarks_auto2").get()
          .then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
              let data = doc.data();
              places.push({
                landmark_id: doc.id,
                name: data.titleText,
                landmarkImage: data.landmarkImage,
                landmarkCoordinate: data.landmarkCoordinate,
                descriptionText: data.descriptionText,
                found: found_places.includes(data.titleText)
              });
            });
            this.setState({
              places: places,
            });
          })
      })
  };

  componentDidMount() {
    this.props.navigation.addListener(
      'willFocus',
      async () => {
        this.verifyCreateUser().then(() => {
          this.load_data();
        });
      }
    );
    // fetch("http://google.com/")
    // .then((response) => response)
    // .then((responseJson) => {
    //   console.log("setting temp!")
    //   this.setState({
    //     temp: 90,
    //     weather: "hot!",
    //   });
    // })
    fetch(web_url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          temp: responseJson.main.temp,
          weather: responseJson.weather[0].description,
        });
      })
      .catch(() => {
        console.log("Error getting weather data.")
        this.setState({
          temp: "44.58F",
          weather: "clear sky",
        });
      })
  }

  get_found_landmarks = async () => {
    return usersRef.doc(userId).get()
      .then(doc => {
        return doc.data()
      })
      .then((user_data) => {
        if (user_data) {
          console.log(firebase.auth().currentUser.displayName)
          this.setState({
            user: user_data
          });
          return user_data.landmarks_found;
        } else {
          Alert.alert("Failed to get user data.")
          this.props.navigation.push('Login');
        }
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.user_text}>Get searching {firebase.auth().currentUser.displayName}!</Text>
        <View style={styles.top}>
          <Text style={styles.temp}>{this.state.temp}° F</Text>
          <Text style={styles.temp}>{this.state.weather}</Text>
        </View>
         <FlatList
            data={this.state.places}
            renderItem={({ item }) => <Item name={item.name} found={item.found} onpress={() =>
              {
                this.props.navigation.push('Map', {
                  landmarkImage: item.landmarkImage,
                  titleText: item.name,
                  descriptionText: item.descriptionText,
                  landmarkCoordinate: item.landmarkCoordinate,
                  found: item.found
                });
              }
            }/>}
            keyExtractor={item => item.landmark_id}
            style={styles.scroll}
          />
      </View>
    );
  }
}

const styles = { 
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: "#f0ffff"
  },
  user_text: {
    marginTop: 10
  },
  title: {
    fontSize: 45,
    color: "#6495ed",
    fontWeight: 'bold',
    width: "85%",
    alignItems: "center",
    paddingTop: 3,
  },
  scroll: {
    flex: 1,
    width: "100%",
    height: "50%",
    paddingLeft: "10%",
    paddingRight: "10%",
    borderColor: "red",
    borderWidth: 0
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    borderBottomColor: 'orange',
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    border: 50,
    flexWrap: "wrap"
  },
  image: {
    width: 30,
    height: 30,
    opacity: 0.5
  },
  top: {
    width: "100%",
    paddingTop: 10,
    flexDirection: "column",
    paddingRight: 15,
    alignItems: "flex-end",
  },
  temp: {
    color: "#6495ed",
  },
  name: {
    fontSize: 28,
    color: "#6495ed",
    fontWeight: 'bold',
    flex: 0.9
  },
  namefound: {
    fontSize: 28,
    color: "#6495ed",
    fontWeight: 'bold',
    opacity: 0.4,
    flex: 0.9
  }
};
