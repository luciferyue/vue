import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from "screens/detail";
import HomeScreen from "screens/home";
import Permissions from "screens/permissions";
import Edit from "screens/edit";


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* headerMode="float , none , screen" */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Permissions" component={Permissions} />
        <Stack.Screen name="Edit" component={Edit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;