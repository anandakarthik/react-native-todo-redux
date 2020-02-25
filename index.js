/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from "react-redux";

import { name as appName } from './app.json';
import configureStore from "./src/store/configStore";
import NavigationContainer from './src/navigator/MainNavigator';


const rnstore = configureStore();

const ToDoApp = () => (<Provider store={rnstore}><NavigationContainer /></Provider>)
AppRegistry.registerComponent(appName, () => ToDoApp);

