import React, {useState, useEffect } from 'react';
import {Text, View, StyleSheet, Image, Pressable, Alert, Modal, TextInput} from 'react-native';
import BtnIcon from '../comp/box'
import User from '../types/User';
import {BuscaUser} from '../api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/home/lucasbara/Documentos/Native/oncinha/App';

// Definindo o tipo das props para a navegação
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};


const HomeScreen: React.FC<Props> = ({navigation}) =>{

  const [infosUser, setInfos_user] = useState<User>()

    useEffect(() => {
      // declare the data fetching function
      const fetchData = async () => {
        setInfos_user(await BuscaUser())
      }

      // call the function
      fetchData()
        .catch(console.error);
    }, [])

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
            

            <Text style={styles.moedas}> R$: {infosUser?.moedas}</Text>

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
              onPress={() => navigation.navigate('RoletaScreen')}
              textbtn="Jogo"
              imgBtn ={require('../imagens/iconRoleta.png')}
              />

          <BtnIcon
              onPress={() => navigation.navigate('RoletaScreen')}
              textbtn="Roleta"
              imgBtn ={require('../imagens/icon_espiral.png')}
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
        marginTop: '20%',
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