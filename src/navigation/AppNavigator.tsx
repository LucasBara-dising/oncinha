import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screen/home';
import ColecaoScreen from '../screen/colecao';
import LojaScreen from '../screen/loja';
import CadastroScreen from '../screen/cadastro';
import RoletaScreen from '../screen/roleta';

// Definindo o tipo das rotas disponíveis
export type RootStackParamList = {
  Home: undefined;
  Colecao: undefined;
  Loja: undefined;
  Cadastro: undefined;
  Roleta: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Colecao" component={ColecaoScreen} />
        <Stack.Screen name="Loja" component={LojaScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Roleta" component={RoletaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}