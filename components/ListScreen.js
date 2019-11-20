import * as React from 'react';
import {Button, Text, View, FlatList, Image} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

const check = require('../assets/check.png')

function Item({ name, found, onpress}) { 
  if (found == true) {
    item_obj = (
      <View style={styles.item}>
        <Text style={styles.name}>{name}</Text>
        <Image style={styles.image} source={check}/>
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

  constructor() {
    super();
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
  onpress = () => this.props.navigation.push('Map')

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
    fontSize: 40,
    fontWeight: 'bold',
  },
  scroll: {
    flex: 0.2,
    width: "100%",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    borderBottomColor: 'black',
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 20,
    paddingRight: 50,
  },
  image: {
    width: 30,
    height: 30,
  },
  name: {
    fontSize: 28
  }
}
