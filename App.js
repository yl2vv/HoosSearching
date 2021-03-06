import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from "./components/LoginScreen";
import ListScreen from "./components/ListScreen";
import MapScreen from "./components/MapScreen";

const RootStack = createStackNavigator({
  Login: { 
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Login`,
    }),
  },
  List: {
    screen: ListScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Landmarks`,
    }),
  },
  Map: {
    screen: MapScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Landmark Details`,
    }),
  }
});

export default createAppContainer(RootStack);
