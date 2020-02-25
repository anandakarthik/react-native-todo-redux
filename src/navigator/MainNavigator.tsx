import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from "react-navigation-drawer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as React from "react";



import ToDoScreen from "../screens/ToDoScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import signInContainer from "../screens/SignInScreen";
import authLoadingContainer from "../screens/AuthLoadingScreen";
import HomeIconWithBadge from "../components/HomeIconWithBadge";
import SideDrawerContainer from "../components/SideDrawer";

const AuthStack = createStackNavigator({ SignIn: signInContainer });

const ToDoNavigator = createStackNavigator({
    ToDo: {
        screen: ToDoScreen
    }
});

const ProfileNavigator = createStackNavigator({
    Profile: {
        screen: ProfileScreen
    }
});


const TabNavigator = createBottomTabNavigator({
    ToDo: {
        screen: ToDoNavigator
    },
    Profile: {
        screen: ProfileNavigator
    }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent: any = Ionicons;
            let iconName;
            if (routeName === 'ToDo') {
                iconName = focused
                    ? 'ios-list-box'
                    : 'ios-list-box';
                
            } else if (routeName === 'Home') {
                iconName = focused ? 'ios-home' : 'ios-home';
                // Sometimes we want to add badges to some icons.
                // You can check the implementation below.
                IconComponent = HomeIconWithBadge;
            } else if (routeName === 'Profile') {
                iconName = focused ? 'ios-person' : 'ios-person';
            }
            // You can return any component that you like here!
            return <IconComponent name={iconName} size={25} color={tintColor} />
            //return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
    }
});

const SwitchNavigator = createSwitchNavigator(
    {
        AuthLoading: authLoadingContainer,
        App: TabNavigator,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading'
    }
)

const DrawerNavigator = createDrawerNavigator({
    ToDo: {
        screen: SwitchNavigator
    }
}, {
    contentComponent : SideDrawerContainer
})

const AppContainer = createAppContainer(
    DrawerNavigator
);

export default AppContainer;