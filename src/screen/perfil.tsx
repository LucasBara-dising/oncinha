import React, {useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import BoxCartasColecao from '../comp/BoxCartasColecao'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/home/lucasbara/Documentos/Native/oncinha/App';

// Definindo o tipo das props para a navegação
type ColecaoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PerfilScreen'>;

type Props = {
  navigation: ColecaoScreenNavigationProp;
};

const ColecaoScreen: React.FC<Props> = ({navigation}) =>{

    const colecaoNatureza = [
        { id: '1', title: "Macaco Mago", preco: 100, img: require('../imagens/card_macaco.png') },
        { id: '2', title: "Macaco Mago", preco: 200, img: require('../imagens/card_macaco.png') },
        { id: '3', title: "teste3", preco: 300, img: require('../imagens/avatar_teste.png') },
        { id: '4', title: "teste4", preco: 400, img: require('../imagens/avatar_teste.png') },
        { id: '5', title: "Macaco Mago", preco: 200, img: require('../imagens/card_macaco.png') },
        { id: '6', title: "teste3", preco: 300, img: require('../imagens/avatar_teste.png') }
      ];

    return ( 
        <ScrollView >

            <View style={styles.container}>

              <View style={styles.header}>
              <Pressable
                  onPressIn={() => navigation.navigate('HomeScreen')}>
                  <Image 
                    source={require('../imagens/iconLoja.png')} />
                </Pressable>
                
              </View>

              <Pressable
                              onPressIn={() => navigation.navigate('PerfilScreen')}>
                              <Image 
                                source={require('../imagens/avatar_teste.png')} />
                         </Pressable>
               

                <Image 
                    style={styles.bg} 
                    source={require('../imagens/bg-home.png')} />

                <Text style={styles.moedas}> R$: 871.20</Text>
                
                <BoxCartasColecao
                    textTitle="Deck"
                    itensLoja={colecaoNatureza}/>

                <BoxCartasColecao
                    textTitle="Pacotes"
                    itensLoja={colecaoNatureza}/>

            </View>
        </ScrollView>
     );
  };
  
  
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center' 
    },

    header:{
      width:"100%",
      flexDirection: 'row',
      alignContent:"space-between",
      margin: 20,
      paddingHorizontal: 10
    },
  
    bg:{
      backgroundColor:'#025827',
      height: '100%',
      position: 'absolute',
      color: "#000",
      zIndex: -1,
      opacity: 0.8,
  },

      title: { 
        fontSize: 24,
        color: "#FFCB00",
        padding: '2%',
        borderRadius: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },

      moedas: {
        fontSize: 18,
        width:'60%',
        height: 30,
        color: "#fff",
        opacity: 0.8,
        backgroundColor: '#ffcb00',
        borderRadius:10,
        marginBottom:'10%',
        marginTop: '5%',
        textAlign: 'center'
      },
  
});

export default ColecaoScreen;
