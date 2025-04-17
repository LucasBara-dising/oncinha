import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LojaScreen from '../screen/loja';
import CartasEspeciaisScreen from '../comp/BoxCartas';
import AvataresScreen from '../comp/AvataresScreen';
import Home from '../screen/home'

const Stack = createNativeStackNavigator();

const AppNavigator = ()=>{
    return (
        <NavigationContainer>

            <Stack.Navigator initialRouteName = "Home">
                <Stack.Screen name= "Home" component = {Home}/>;
                <Stack.Screen name= "LojaScreen" component = {LojaScreen} options={{title: "Cacique Bom preço"}}/>;
                {/* <Stack.Screen name="Cartas Especiais" component={CartasEspeciaisScreen} />;
                <Stack.Screen name='Avatares' component={AvataresScreen}/>; */}
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default AppNavigator;
