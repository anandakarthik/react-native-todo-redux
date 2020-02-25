import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Text, View, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, ToastAndroid,
    Platform,
    Alert,
    ActivityIndicator
} from "react-native";

import { connect } from 'react-redux';

import { gloabalStyles } from "../globals/Styles";
import { todoCRUDonServer } from "../store/actions/todoAction";
import { menuDrawer } from "../components/DrawerIcon";

interface MyProps { navigation, onAddToDo, onUpdateToDo, onDeleteToDo, onFetchToDo, todos, isLoading };
interface MyState {
    goalName: string,
    isEdit,
    key,
    id
};
export enum REQ_TYPE {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PATCH',
    DELETE = 'DELETE'

}

const ListItem = (props) => {
    const { item, index, deleteItem, editItem } = props;
    //console.log('item', item)
    return (
        <View style={styles.listItemContainer}>
            <Ionicons name="ios-checkmark-circle" size={30} color={'grey'} />
            {/* <Image style={{ width: 50, height: 50 }} source={require('../images/Tulips.jpg')}></Image> */}
            <Text style={styles.listItem}>{item.todoName}</Text>
            <TouchableOpacity onPress={editItem.bind(this, index, item.id)} >
                <View style={{ width: 24, height: 24, margin: 5, marginHorizontal: 20 }}>
                    <Ionicons name="md-create" size={30} color={'#000'} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteItem.bind(this, index, item.id)} >
                <View style={{ width: 24, height: 24, margin: 5 }}>
                    <Ionicons name="ios-trash" size={30} color={'red'} /></View>
            </TouchableOpacity>
        </View>
    )
}
class ToDoScreen extends React.Component<MyProps, MyState>{
    constructor(props) {
        super(props);
        this.initState();
    }

    static navigationOptions = ({ navigation }) => {
        return menuDrawer(navigation, 'ToDo')
    };

    componentDidMount() {
        let { onFetchToDo } = this.props;
        onFetchToDo();
    }

    initState() {
        this.state = {
            goalName: '',
            isEdit: false,
            key: '',
            id: ''
        }
    }

    resetState() {
        this.setState({
            goalName: '',
            isEdit: false,
            key: '',
        })
    }

    addGoal = (goalName) => {

        if (!goalName) {
            this.notifyMessage('Todo should not be empty!')
            return false;
        }
        let { onAddToDo } = this.props;
        onAddToDo(goalName);
        this.resetState();
    }

    updateGoal = (updatedGoal) => {
        const { key, id } = this.state;
        let { onUpdateToDo } = this.props;
        console.log('updateGoal', this.state)
        onUpdateToDo(key, updatedGoal, id);
        this.resetState();
    }

    editItem = (key, id) => {
        let { todos } = this.props;
        let selGoal = todos[key];
        console.log('selGoal', selGoal, 'id', id)
        this.setState({
            goalName: selGoal.todoName,
            key,
            id,
            isEdit: true
        })
    }

    deleteGoal = (goalIndex, id) => {
        let { onDeleteToDo } = this.props;
        console.log('deleteGoal', id)
        onDeleteToDo(goalIndex, id);
        this.resetState();
    }

    notifyMessage = (msg: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            Alert.alert(msg);
        }
    }



    render() {
        const { goalName, isEdit } = this.state;
        const { todos, isLoading } = this.props;
        //console.log('props', this.props);

        if (isLoading) {
            return <View style={gloabalStyles.pageCenter}><ActivityIndicator size={'large'} /></View>;
        }

        else
            return (<View style={styles.container}>
                <View style={styles.goalContainer}>
                    <TextInput style={gloabalStyles.textInput} value={goalName} onChangeText={(text) => this.setState({ goalName: text })} placeholder='Enter todo'></TextInput>
                    {!isEdit && <TouchableOpacity onPress={() => this.addGoal(goalName)} >
                        <View style={{ width: 40, height: 40, margin: 5 }}>
                            <Ionicons name="md-add-circle" size={40} color={'#346beb'} />
                        </View>
                    </TouchableOpacity>}
                    {isEdit && <TouchableOpacity onPress={() => this.updateGoal(goalName)} >
                        <View style={{ width: 40, height: 40, margin: 5 }}>
                            <Ionicons name="md-checkmark-circle" size={40} color={'#12b054'} />
                        </View>
                    </TouchableOpacity>}
                </View>
                {todos.length === 0 && <View style={gloabalStyles.pageCenter}><Text>No Records!</Text></View>}
                {todos.length > 0 && <View style={styles.listContainer}>
                    <FlatList keyExtractor={(item, index) => index.toString()} data={todos.reverse()} renderItem={({ item, index }) => <ListItem item={item} index={index} deleteItem={this.deleteGoal} editItem={this.editItem} />}></FlatList>
                </View>
                }
            </View>);
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    goalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%'
    },

    listContainer: {
        width: '100%',
        marginBottom: 40
    },
    listItemContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'silver',
        marginVertical: 3,
        padding: 10,
        justifyContent: 'flex-start',
        color: '#000',
        flexDirection: 'row',
        flex: 1
    },
    listItem: {
        flex: 4,
        fontWeight: "bold",
        fontSize: 18,
        flexDirection: 'column',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    deleteIcon:
    {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        fontSize: 20
    }
});

const mapStateToProps = (state) => ({
    todos: state.todoCRUD.todos,
    isLoading: state.ui.isLoading,
});


const mapDispatchToProps = dispatch => ({
    onFetchToDo: (user = '') =>
        dispatch(todoCRUDonServer(user, REQ_TYPE.GET)),
    //dispatch(fetchToDo(user)),
    onAddToDo: (text) =>
        dispatch(todoCRUDonServer(text, REQ_TYPE.POST)),
    //dispatch(addToDo(text)),
    onUpdateToDo: (key, text, id) =>
        dispatch(todoCRUDonServer(text, REQ_TYPE.PUT, id)),
    //dispatch(updateToDo(key, text)),
    onDeleteToDo: (key, id) =>
        dispatch(todoCRUDonServer('', REQ_TYPE.DELETE, id)),
    //dispatch(deleteToDo(key))
});

let ToDoContainer = connect(mapStateToProps, mapDispatchToProps)(ToDoScreen);
export default ToDoContainer;