import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

import { authLogout } from "../store/actions/auth";
interface MyProps { onLogout, navigation };
interface MyState {
  
};
class SideDrawer extends Component<MyProps, MyState> {
  _signOutAsync =  () => {
    this.props.onLogout()
        .then(() => {
            this.props.navigation.navigate('Auth');
        })
        .catch(error => {
            this.setState({ error })
        })
};
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._signOutAsync}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee"
  },
  drawerItemIcon: {
    marginRight: 10
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authLogout())
  };
};

let SideDrawerContainer =  connect(null, mapDispatchToProps)(SideDrawer);
export default SideDrawerContainer;
