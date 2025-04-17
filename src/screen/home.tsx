import React, {useState } from 'react';
import {Text, View, StyleSheet, Image, Pressable, Alert, Modal, TextInput} from 'react-native';
import BtnIcon from '../comp/box'
import { useNavigation } from '@react-navigation/native';
import LojaScreen from '../screen/loja';


function Home():  React.JSX.Element {

    const handleAddPress =() =>{
        console.log("e827728")
    }

    function onButtonClick() {
      //navigation.navigate(LojaScreen);
      console.log("Abre loja")
    }


  return (
    <View style={styles.container}>
         <Image 
                    style={styles.bg} 
                    source={require('../imagens/bg-home.png')} />

        <View style={styles.colCentral}>
            <Image 
                source={require('../imagens/avatar_teste.png')} />

            <Text style={styles.moedas}> R$: 8712</Text>

            <BtnIcon
              onPress={handleAddPress}
              textbtn="Coleção"
              imgBtn ={require('../imagens/iconColecao.png')}
              />


            <Pressable
                style={styles.buttonContainer} 
                onPress={handleAddPress}>
                  <Image 
                    source={require('../imagens/iconColecao.png')} />
                  <Text style={styles.buttonText}> Coleção </Text>
            </Pressable>

            <Pressable
                style={styles.buttonContainer} 
                onPress={handleAddPress}>
                  <Image 
                    source={require('../imagens/iconLoja.png')} />
                  <Text style={styles.buttonText}> Loja </Text>
            </Pressable>

            <Pressable
                style={styles.buttonContainer} 
                onPress={onButtonClick}>
                  <Image 
                    source={require('../imagens/iconRoleta.png')} />
                  <Text style={styles.buttonText}> Jogar </Text>
            </Pressable>

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
      height: 40,
      color: "#fff",
      opacity: 0.8,
      backgroundColor: '#ffcb00',
      borderRadius:25,
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

export default Home;