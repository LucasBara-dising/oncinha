import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import BoxCartasColecao from '../comp/BoxCartasColecao'
import ItensLoja from '../types/itensLoja'
import User from '../types/User';
import axios from 'axios';
import {BuscaUser, BuscaColecao} from '../api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/home/lucasbara/Documentos/Native/oncinha/App';

// Definindo o tipo das props para a navegação
type ColecaoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ColecaoScreen'>;

type Props = {
  navigation: ColecaoScreenNavigationProp;
};

const ColecaoScreen: React.FC<Props> = ({navigation}) =>{

  const [itensColacao, setItens] = useState<ItensLoja[]>([])
  const [colacao, setColelao] = useState([])
  const [infosUser, setInfos_user] = useState<User>()

    // const colecaoNatureza = [
    //     { id: '1', title: "Macaco Mago", preco: 100, img: require('../imagens/card_macaco.png') },
    //     { id: '2', title: "Macaco Mago", preco: 200, img: require('../imagens/card_macaco.png') },
    //     { id: '3', title: "teste3", preco: 300, img: require('../imagens/avatar_teste.png') },
    //     { id: '4', title: "teste4", preco: 400, img: require('../imagens/avatar_teste.png') },
    //     { id: '5', title: "Macaco Mago", preco: 200, img: require('../imagens/card_macaco.png') },
    //     { id: '6', title: "teste3", preco: 300, img: require('../imagens/avatar_teste.png') }
    //   ];


    const removeDuplicates = (array: ItensLoja[]) => {
      const seen = new Set();
      return array.filter(item => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      });
    };


    useEffect(() => {
      // declare the data fetching function
      const fetchData = async () => {
        setInfos_user(await BuscaUser())
        const colecao_bruto : [] = await BuscaColecao()

        let oi = removeDuplicates(colecao_bruto)
        
        console.log(colacao[0])
        

      console.log(oi);

      //setColelao(oi)

        
      }

      // call the function
      fetchData()
        .catch(console.error);
    }, [])


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

                <Text style={styles.moedas}> R$: {infosUser?.moedas}</Text>
 
                <Text style={styles.title}>COLEÇÕES</Text>
      
          

                {colacao.map((itensColacao) => (
                
                 <BoxCartasColecao
                    textTitle=""
                    itensLoja={itensColacao}/> 

                    
                ))}

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
  
});

export default ColecaoScreen;