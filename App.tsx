/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */


import React from 'react';

import Navigation from './src/navigator/MainNavigator';

interface MyProps { };
interface MyState {
  goalName: string,
  goals: Array<[]>
};




class GoalApp extends React.Component<MyProps, MyState>
{
  constructor(props) {
    super(props);
  }
  render() {
    return <Navigation />;
  }
}


/* const App = () => {
  const [goal, setGoal] = useState(''),
    [goals, setGoals] = useState([]);

  const addGoal = (goalName: string) => {
    setGoals([...goals, goalName])
  }


  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }}>
        <TextInput style={{ borderBottomWidth: 2, marginVertical: 10, padding: 0, width: '70%' }} value={goal} onChangeText={(text) => setGoal(text)} placeholder='Enter goal'></TextInput>
        <Button title="Add" onPress={() => { console.log("Hi"); addGoal(goal) }}></Button>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList keyExtractor={(item, index) => index.toString()} data={goals} renderItem={({ item }) => { return <Text style={{ margin: 5, justifyContent: 'center', width: '100%', color: 'red', fontSize: 20 }}>{item}</Text> }}></FlatList>
      </View>
    </View>

  );
}; */

export default GoalApp;
