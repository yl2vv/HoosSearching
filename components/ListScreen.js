import * as React from 'react';
import {Button, Text, View, Alert, FlatList, Image} from "react-native";
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
      places: [],
    };
  }

  componentDidMount() {
    const dbh = firebase.firestore();
    let places = [];
    userId = firebase.auth().currentUser.uid;
    let usersRef = dbh.collection('users');
    dbh.collection("landmarks").get()
      .then((querySnapshot) => {
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
        })
      .then(() => {
        return this.get_found_landmarks()
      })
      .then((found_places) => {
        console.log("setting state");
        places = places.map((el) => {
          if (found_places.includes(el.landmark_id)) {
            el.found = true
          }
          return el
        })
        this.setState({places: places});
      });
  }

  get_found_landmarks = async () => {
    user_data = usersRef.doc(userId).get()
      .then(doc => {
        return doc.data()
      })
      .then((user_data) => {
        if (user_data) {
          console.log("Got user data!")
          return user_data
        } else {
          console.log(user_data)
          Alert.alert("Failed to get user data.")
          this.props.navigation.push('Login');
        };
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    
    return user_data.then((user_data) => {
      found_promises = []
      user_data.landmarks_found.forEach((doc) => {
        found_promises.push(        
          doc.get().then((docu) => {
            return docu.id
          })
        )
      })
      return Promise.all(found_promises)
    })
  }

  render() {
    return (
      <View style={styles.container}>
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
