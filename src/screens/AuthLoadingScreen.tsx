import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { AUTHENTICATE } from '../store/actions/auth';
import { connect } from 'react-redux';
interface MyProps { navigation : any, onSetUser};
interface MyState {
  
};

export class AuthLoadingScreen extends React.Component<MyProps, MyState> {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userLogin = await AsyncStorage.getItem('userLogin');
    const userId = await AsyncStorage.getItem('userId');
    let {onSetUser} = this.props;
      onSetUser(userId)
  
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(userLogin ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch =>({
  onSetUser : (userId) =>(dispatch({ type: AUTHENTICATE, userId: userId, token: '' }))
})


let authLoadingContainer =connect(null, mapDispatchToProps)(AuthLoadingScreen);
export default authLoadingContainer;