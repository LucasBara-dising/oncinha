import React, {useState } from 'react';
import {Text, View, StyleSheet, Image, Pressable, TextInput} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/home/lucasbara/Documentos/Native/oncinha/App';

// Definindo o tipo das props para a navegação
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};


const LoginScreen: React.FC<Props> = ({navigation}) =>{

    const handleAddPress =() =>{
        console.log("e827728")
    }

    function onButtonClick() {
      navigation.navigate('HomeScreen')
    }


  return (
    <View style={styles.container}>
         <Image 
            style={styles.bg} 
            source={require('../imagens/bg-login.png')} />

        <View style={styles.boxInput}>
          
            <Image 
            style={styles.iconOnca}
              source={require('../imagens/icon_onca.png')} />
  

            <Text style={styles.title}>LOGIN</Text>

            <Text style={styles.titleInput}>USER</Text>
            <TextInput
              style={styles.inputContainer}
            />

            <Text style={styles.titleInput}>SENHA</Text>
            <TextInput
              style={styles.inputContainer}
            />

            <Text style={styles.subtitle}>ESQUECEU SUA SENHA?</Text>

          <Pressable
            style={styles.buttonContainer} 
            onPressIn={onButtonClick}>
            <Text style={styles.buttonText}> Entrar</Text>
          </Pressable>
              

            <Text style={styles.subtitle}>CADASTRE-SE</Text>

        </View>

    </View>
  );
};

const styles = StyleSheet.create({
    container:{
      height: '100%'
    },

    bg:{
        height: '100%',
        position: 'absolute',
        zIndex: -1,
        opacity: 0.8,
    },

    boxInput:{
        marginTop: '70%',
        marginLeft: '10%',
        marginRight: '10%',
        padding: "5%",
        alignItems: "center",
       justifyContent: 'center',
       backgroundColor: "#025827",
       borderRadius: 20,
       opacity: 0.9,
    },

    iconOnca:{
      marginTop: "-20%"
    },

    title: {
      fontSize: 20,
      width:'80%',
      color: '#ffcb00',
      marginTop: '10%',
      textAlign: 'center'
    },

    subtitle: {
      fontSize: 12,
      width: "100%",
      color: '#fff',
      marginBottom:'2%',
      marginTop: '10%',
      textAlign: 'center'
    },

    titleInput: {
      fontSize: 16,
      width: "100%",
      color: '#fff',
      marginBottom:'2%',
      marginTop: '10%',
      textAlign: "left"
    },

    inputContainer: {
      alignItems: 'center',
      height: 50,
      width: "100%",
      backgroundColor: "#F7F7F7",
      borderRadius: 20
    },

    buttonContainer:{
      width:'60%',
      height: 60,
      color: "#ffcb00",
      backgroundColor: '#000000',
      opacity: 0.7,
      borderRadius: 30,
      marginVertical:'5%'
    },
    
    buttonText: {
      width: "100%",
      color: "#ffcb00",
      fontSize: 20,
      marginTop: 14,
      textAlign: 'center'
    },
    
  });

export default LoginScreen;