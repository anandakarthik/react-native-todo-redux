import { View, Button, TextInput, StyleSheet, TouchableOpacity, Image, Text, ImageBackground, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { CheckBox } from 'react-native-elements'
import { connect } from "react-redux";
import React from "react";
import { StackActions, NavigationActions } from "react-navigation";

import { doAuth } from "../store/actions/auth";
import { isSignedUp } from "../store/actions/ui";

interface MyProps { navigation: any, doAuthentication, isLoading, isSignedUp };
interface MyState {
    signUp, hasError, email, password, confirmPassword, errorMessage, remember

};

enum TYPE {
    SIGNIN = 1,
    REGISTER

}

export const Validation = {
    EMAIL: {
        reg: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        errorMessage: 'Invalid email!'
    },
    PASSWORD: {
        reg: /^[A-Za-z0-9]{7,13}$/,
        errorMessage: 'Password should be 8 to 14 length'
    }
}

const background = require("../images/background.jpg");
const lockIcon = require("../images/lock.png");
const personIcon = require("../images/person.png");

const reset = StackActions.reset({ index: 0, actions: [NavigationActions.navigate({ routeName: 'MainActivity' })] })


export class SignInScreen extends React.Component<MyProps, MyState> {
    static navigationOptions = ({ navigation }) => {
        const { state: { params = {} } } = navigation;
        return {
            title: params.title,
        };
    };

    constructor(props) {
        super(props);
        let login;

        console.log(login);
        this.state = {
            signUp: false,
            hasError: false,
            errorMessage: '',
            email: '',
            password: '',
            confirmPassword: '',
            remember: false
        }
        AsyncStorage.getItem('loginCredential').then(val => {
            let { email, password, remember } = JSON.parse(val);
            this.setState({ email, password, remember })
        });
        this.changeHeaderText();
    }

    componentWillReceiveProps(nextProps) {
        console.log("getDerivedStateFromProps", nextProps);
        let { isLoggedIn, isSignedUp, clearSignUp } = nextProps;
        if (isSignedUp) {
            Alert.alert('Registration', 'User Registered');
            this.resetState();
            clearSignUp()
        }
        else
            isLoggedIn && this.props.navigation.navigate('App')
        return null;
    }

    render() {

        let { signUp } = this.state;
        const { isLoading } = this.props;
        const theme = signUp ? styles.registerTheme : styles.signInTheme
        return (
            <ImageBackground
                style={[styles.background, styles.container]}
                source={background}
                resizeMode="cover"
            >
                <View style={styles.container} />
                <View style={styles.wrapper}>
                    <View style={styles.inputWrap}>
                        <View style={[styles.iconWrap, theme]}>
                            <Image
                                source={personIcon}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                        </View>
                        <TextInput
                            placeholder="Email"
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.setState({ email: text.trim() })}
                            onBlur={() => this.validate(this.state.email, Validation.EMAIL)}
                            value={this.state.email}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <View style={[styles.iconWrap, theme]}>
                            <Image
                                source={lockIcon}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                        </View>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.setState({ password: text.trim() })}
                            onBlur={() => this.validate(this.state.password, Validation.PASSWORD)}
                            value={this.state.password}
                        />
                    </View>
                    {signUp && <View style={styles.inputWrap}>
                        <View style={[styles.iconWrap, theme]}>
                            <Image
                                source={lockIcon}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                        </View>
                        <TextInput
                            placeholder="Confirm password"
                            secureTextEntry
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.setState({ confirmPassword: text.trim() })}
                            onBlur={() => this.validate(this.state.confirmPassword, Validation.PASSWORD)}
                            value={this.state.confirmPassword}
                        />
                    </View>}
                    {!signUp && <CheckBox
                        title='Remember me'
                        checkedColor='#d73352'
                        checked={this.state.remember}
                        onPress={() => this.setState({ remember: !this.state.remember })}
                    />}
                    <TouchableOpacity activeOpacity={.5} onPress={() => signUp ? this._doAuthAsync(TYPE.REGISTER) : this._doAuthAsync(TYPE.SIGNIN)}>
                        <View style={[styles.button, theme]}>
                            {!isLoading && <Text style={styles.buttonText}>{signUp ? 'Register' : 'Sign In'}</Text>}
                            {isLoading && <ActivityIndicator color='#fff' size={'small'} />}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.5} onPress={() => this._toggleSignUp()}>
                        <View>
                            <Text style={styles.signuUpText}>{signUp ? 'Sign In' : 'Create Account'}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={styles.container} />
            </ImageBackground>
        );
    }

    resetState() {
        this.setState({
            signUp: false,
            hasError: false,
            errorMessage: '',
            email: '',
            password: '',
            remember: false
        })
    }

    validate = (text, type) => {
        console.log(text, type);
        if (!type.reg.test(text)) {
            Alert.alert('Message', type.errorMessage);
            return false;
        }
    }

    _doAuthAsync = async (type: TYPE) => {
        let { email, password, confirmPassword, remember, signUp } = this.state;
        let { doAuthentication } = this.props;
        if (email && password) {
            if (type == TYPE.SIGNIN) {
                doAuthentication({ email, password }, signUp);
                remember && AsyncStorage.setItem('loginCredential', JSON.stringify({ email, password, remember }));
                !remember && AsyncStorage.removeItem('loginCredential')
                //AsyncStorage.getItem('userLogin').then (val=> alert(val))
                //await AsyncStorage.setItem('userLogin', 'true');
                //this.props.navigation.navigate('App');
            }
            else if (type == TYPE.REGISTER) {
                if(confirmPassword !== password)
                {
                    Alert.alert('Password', 'Mismatch!');
                    return false;
                }
                doAuthentication({ email, password }, signUp);
                //this.setState({ signUp: false })
            }

        }
        else {
            Alert.alert("Message", type == TYPE.SIGNIN ? "Please enter valid credentials!" : "Please enter all details!")
        }

    };

    changeHeaderText() {
        let { signUp } = this.state;
        this.props.navigation.setParams({ title: signUp ? 'Register' : 'Sign In' })
    }

    _toggleSignUp() {
        this.resetState();
        this.setState({ signUp: !this.state.signUp }, () => this.changeHeaderText())
    }
    

}

const mapStateToProps = (state) => ({
    isLoggedIn: state.ui.isLoggedIn,
    isLoading: state.ui.isLoading,
    isSignedUp: state.ui.isSignedUp

});

const mapDispatchToProps = dispatch => ({
    doAuthentication: (authData, signIn) =>
        dispatch(doAuth(authData, signIn)),
    clearSignUp : () => dispatch(isSignedUp(false))
})

let signInContainer = connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
export default signInContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: null,
        height: null
    },
    wrapper: {
        paddingHorizontal: 15,
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        backgroundColor: "transparent"
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#FFF'
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d73352"
    },
    icon: {
        width: 20,
        height: 20,
    },
    button: {
        backgroundColor: "#d73352",
        paddingVertical: 15,
        marginVertical: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18
    },
    signuUpText: {
        color: "#FFF",
        backgroundColor: "transparent",
        textAlign: "center",
        textDecorationLine: "underline"
    },
    registerTheme:
    {
        backgroundColor: "green"
    },
    signInTheme: {
        backgroundColor: "#d73352"
    },
    checkBox:
    {
        color: '#fff'
    }
});