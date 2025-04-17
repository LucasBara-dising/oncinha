import React, {useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import BoxCartasColecao from '../comp/BoxCartasColecao'
import ItensLoja from '../types/itensLoja'


const LojaScreen = () => {

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
                <Image 
                    style={styles.bg} 
                    source={require('../imagens/bg-loja.png')} />

                <Text style={styles.moedas}> R$: 871.20</Text>

                <Text style={styles.title}>COLEÇÕES</Text>
                
                <BoxCartasColecao
                    textTitle="Natureza"
                    itensLoja={colecaoNatureza}/>

                <BoxCartasColecao
                    textTitle="Animais"
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
  
    bg:{
          backgroundColor:'#025827',
          height: '100%',
          position: 'absolute',
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
        marginTop: '15%',
        textAlign: 'center'
      },
  
});
  export default LojaScreen;
  