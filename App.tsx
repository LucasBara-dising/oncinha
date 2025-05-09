import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screen/home';
import ColecaoScreen from './src/screen/colecao';
import LojaScreen from './src/screen/loja';
import PerfilScreen from './src/screen/perfil';
import LoginScreen from './src/screen/login';

// Definindo o tipo das rotas disponíveis
export type RootStackParamList = {
  HomeScreen: undefined;
  ColecaoScreen: undefined;
  LojaScreen: undefined;
  PerfilScreen: undefined;
  LoginScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
        headerShown: false
        }} 
        initialRouteName="LoginScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ColecaoScreen" component={ColecaoScreen} />
        <Stack.Screen name="LojaScreen" component={LojaScreen} />
        <Stack.Screen name="PerfilScreen" component={PerfilScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;