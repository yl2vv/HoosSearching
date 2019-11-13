import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from "./components/LoginScreen";
import ListScreen from "./components/ListScreen";
import MapScreen from "./components/MapScreen";

const RootStack = createStackNavigator({
  Login: LoginScreen,
  List: ListScreen,
  Map: MapScreen
});

export default createAppContainer(RootStack);
