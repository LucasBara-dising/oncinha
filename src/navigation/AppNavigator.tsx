import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screen/home';
import ColecaoScreen from '../screen/colecao';

// Definindo o tipo das rotas disponíveis
export type RootStackParamList = {
  Home: undefined;
  Colecao: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Colecao" component={ColecaoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}