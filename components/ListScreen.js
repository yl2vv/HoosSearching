import * as React from 'react';
import {Button, Text, View, FlatList, Image} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
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
      places: [
        { landmark_id: '0', name: 'Statue of Homer', found: true },
        { landmark_id: '1', name: 'Newcomb Hall', found: false },
        { landmark_id: '2', name: 'Bodos', found: true },
        { landmark_id: '3', name: 'Clark Library', found: false },
        { landmark_id: '4', name: 'Ohill', found: false },
        { landmark_id: '5', name: 'AFC', found: false },
        { landmark_id: '6', name: 'Gooch Dillard', found: false },
        { landmark_id: '7', name: 'John Paul Jones', found: true },
        { landmark_id: '8', name: 'Old Dorms', found: true },
        { landmark_id: '9', name: 'New Dorms', found: false },
      ],
    };
  }

  componentDidMount() {
    const dbh = firebase.firestore();
    let places = [];
    dbh.collection("landmarks").get().then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        let data = doc.data();
        places.push({
          landmark_id: doc.id,
          name: data.titleText,
          landmarkImage: data.landmarkImage,
          landmarkCoordinate: data.landmarkCoordinate,
          descriptionText: data.descriptionText,
          found: false
        });
      });
    }).then(() => this.setState({places: places}));

    fetch(web_url)
    .then((response) => response.json())
    .then((responseJson) => {
    this.setState({ 
      temp: responseJson.main.temp,
      weather: responseJson.weather[0].description,
     });
  })
  }

  onpress = () => this.props.navigation.push('Map');

  render() {
    return (
      <View style={styles.container}>
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
                  landmarkCoordinate: item.landmarkCoordinate
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
    width: "80%",
    height: "50%",
    border: 20,
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
    height: "5%"
  },
  temp: {
    fontSize: 16,
    color: "#6495ed",
    fontWeight: 'bold',
  },
  name: {
    fontSize: 28,
    color: "#6495ed",
    fontWeight: 'bold',
  },
  namefound: {
    fontSize: 28,
    color: "#6495ed",
    fontWeight: 'bold',
    opacity: 0.4,
  }
};
