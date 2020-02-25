import React from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar, Text } from "react-native-elements";

import { menuDrawer } from "../components/DrawerIcon";
interface MyStates{
    userName
}
interface MyProps{
    
}
export class ProfileScreen extends React.Component<MyProps, MyStates> {
    constructor(props) {
        super(props);
        AsyncStorage.getItem('loginCredential').then(val =>{
            console.log('loginCredential', val);
            this.setState({userName : JSON.parse(val).email})
        })
        
    }
    static navigationOptions = ({ navigation }) => {
        return menuDrawer(navigation, 'Profile')
    };


    render() {
        return (<View style={styles.avatarContainer}>
            <Avatar
                size="xlarge"
                rounded
                source={{
                    uri:
                        'https://echostains.files.wordpress.com/2010/04/captain-jack-sparrow.jpg',
                }}
            />
            {this.state && <Text h4 style={styles.text}>{this.state.userName}</Text>}
            </View>)
    }
}

const styles = StyleSheet.create({
    avatarContainer: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 20 },
    text:{
        color: '#d73352',
    }
})