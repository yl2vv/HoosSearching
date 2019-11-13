import * as React from 'react';
import {Button, Text, View} from "react-native";

export default class ListScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>List Screen</Text>
        <Button
          title="Go to Map"
          onPress={() => this.props.navigation.push('Map')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}