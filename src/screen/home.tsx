import React, {useState } from 'react';
import {Text, View, StyleSheet, Image, Pressable, Alert, Modal, TextInput} from 'react-native';
import BtnIcon from '../comp/box'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/home/lucasbara/Documentos/Native/oncinha/App';

// Definindo o tipo das props para a navegação
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};


const HomeScreen: React.FC<Props> = ({navigation}) =>{

    const handleAddPress =() =>{
        console.log("e827728")
    }

    function onButtonClick() {
      navigation.navigate('ColecaoScreen')
      console.log("Abre loja")
    }


  return (
    <View style={styles.container}>
         <Image 
                    style={styles.bg} 
                    source={require('../imagens/bg-home.png')} />

        <View style={styles.colCentral}>
           <Pressable
                onPressIn={() => navigation.navigate('PerfilScreen')}>
                <Image 
                  source={require('../imagens/avatar_teste.png')} />
           </Pressable>
            

            <Text style={styles.moedas}> R$: 8712</Text>

            <BtnIcon
              onPress={() => navigation.navigate('ColecaoScreen')}
              textbtn="Coleção"
              imgBtn ={require('../imagens/iconColecao.png')}
              />

            <BtnIcon
              onPress={() => navigation.navigate('LojaScreen')}
              textbtn="Loja"
              imgBtn ={require('../imagens/iconLoja.png')}
              />

            <BtnIcon
              onPress={handleAddPress}
              textbtn="Jogo"
              imgBtn ={require('../imagens/iconRoleta.png')}
              />

        </View>

        <Image 
            style={styles.imgTigre} 
            source={require('../imagens/imgTigre.png')} />


    </View>
  );
};

const styles = StyleSheet.create({
    container:{
      height: '100%'
    },

    bg:{
        backgroundColor:'#025827',
        height: '100%',
        position: 'absolute',
        color: "#000",
        zIndex: -1,
        opacity: 0.8,
    },

    colCentral:{
        marginTop: '35%',
        marginLeft: '20%',
        marginRight: '20%',
        alignItems: "center",
       justifyContent: 'center'
    },

    moedas: {
      fontSize: 20,
      width:'80%',
      color: "#fff",
      opacity: 0.8,
      backgroundColor: '#ffcb00',
      borderRadius:25,
      padding:"1%",
      marginBottom:'10%',
      marginTop: '10%',
      textAlign: 'center'
    },

    buttonContainer: {
      alignItems: 'center',
      marginTop: 20
    },

    buttonText: {
      color: 'white',
      fontSize: 20,
    },


    imgTigre:{
        marginTop: '-30%',
        marginLeft: '48%',
        position: 'static',
        opacity:1
    },
    
  });

export default HomeScreen;