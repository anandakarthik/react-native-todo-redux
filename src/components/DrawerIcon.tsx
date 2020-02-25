import { View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as React from "react";

export const menuDrawer = (navigation, title = '') => {
    return {
        headerTitle: title,
        headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
                <Ionicons
                    name='ios-menu'
                    size={30}
                    onPress={() => navigation.toggleDrawer()}
                    color="#000"
                />
            </View>
        ),
    };
}