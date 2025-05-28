import React, {useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import BoxCartas from '../comp/BoxCartas'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/home/lucasbara/Documentos/Native/oncinha/App';

// Definindo o tipo das props para a navegação
type ColecaoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LojaScreen'>;

type Props = {
  navigation: ColecaoScreenNavigationProp;
};

const LojaScreen: React.FC<Props> = ({navigation}) =>{

    const itensCards = [
        { id: '1', title: "Macaco Mago", preco: 100, img: require('../imagens/card_macaco.png') },
        { id: '2', title: "Macaco Mago", preco: 200, img: require('../imagens/card_macaco.png') },
        { id: '3', title: "teste3", preco: 300, img: require('../imagens/avatar_teste.png') },
        { id: '4', title: "teste4", preco: 400, img: require('../imagens/avatar_teste.png') }
      ];

    const itensMoeda = [
        { id: '1', title: "Bau Pequeno", preco: 10, img: require('../imagens/card_macaco.png') },
        { id: '2', title: "Bau Grande", preco: 100, img: require('../imagens/card_macaco.png') }
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

                <Image 
                    style={styles.bg} 
                    source={require('../imagens/bg-loja.png')} />

                <Text style={styles.moedas}> R$: 871.20</Text>
                
                {/* <BoxCartas
                    textTitle="Moedas"
                    itensLoja={itensMoeda}/>

                <BoxCartas
                    textTitle="Cartas"
                    itensLoja={itensCards}/> */}

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
        alignItems: 'flex-start',
        margin: 20,
        paddingHorizontal: 10
      },
    
  
    bg:{
          backgroundColor:'#025827',
          height: '100%',
          position: 'absolute',
          zIndex: -1,
          opacity: 0.8,
      },

      moedas: {
        fontSize: 18,
        width:'50%',
        height: 30,
        color: "#fff",
        opacity: 0.8,
        backgroundColor: '#ffcb00',
        borderRadius:10,
        marginBottom:'10%',
        marginTop: '-15%',
        textAlign: 'center'
      },
  
    
    title: { 
        fontSize: 24 
    }
});
  export default LojaScreen;
  