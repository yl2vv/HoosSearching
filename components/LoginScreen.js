import * as React from "react";
import {Button, Text, View} from "react-native";

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>
        <Button
          title="Go to List"
          onPress={() => this.props.navigation.push('List')}
        />
      </View>
    );
  }
}