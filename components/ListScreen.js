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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


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
          found: false
        });
      });
    }).then(() => this.setState({places: places}));
  }

  onpress = () => this.props.navigation.push('Map');

  render() {
    return (
      <View style={styles.container}>
         <FlatList
            data={this.state.places}
            renderItem={({ item }) => <Item name={item.name} found={item.found} onpress={this.onpress}/>}
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
    justifyContent: 'center' 
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
