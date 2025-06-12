import React, {useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { GetItensLoja, BuscaUser } from '../api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/home/lucasbara/Documentos/Native/oncinha/App';
import LojaItens from '../types/LojaItens';
import User from '../types/User';
import BoxItensLoja from '../comp/BoxItensLoja'

// Definindo o tipo das props para a navegação
type ColecaoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LojaScreen'>;

type Props = {
  navigation: ColecaoScreenNavigationProp;
};

type DadosUser ={
  moedas: number;
  rodadas: number;
}

const LojaScreen: React.FC<Props> = ({navigation}) =>{
    const [ItensLoja, setItensLoja] = useState<LojaItens[]>([])
    const [ItensLojaRodada, setItensLojaRodada] = useState<LojaItens[]>([])
    const [ItensLojaCarta, setItensLojaCarta] = useState<LojaItens[]>([])
    const [InfosUser, setInfos_user] = useState<User>()
    
   useEffect(() => {
      // declare the data fetching function
      const fetchData = async () => {
        setInfos_user(await BuscaUser())
        setItensLoja(await GetItensLoja())

        setItensLojaRodada(ItensLoja.filter((item) => item.tipo == 'Rodada'))
        setItensLojaCarta(ItensLoja.filter((item) => item.tipo == 'Carta'))
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

                <View style={styles.header_infos_user}>

                 <Text style={styles.boxTextHeader}>
                    <Image style={styles.iconBoxTextHeader} source={require('../imagens/moeda.png')} />
                    {InfosUser?.moedas ? <Text>{InfosUser?.moedas}</Text> : <Text>{InfosUser?.moedas}</Text>}
                  </Text>
                  <Text style={styles.boxTextHeader}>
                    <Image style={styles.iconBoxTextHeader} source={require('../imagens/dados.png')} />
                    {InfosUser?.rodadas ? <Text>{InfosUser?.rodadas}</Text> : <Text>{InfosUser?.rodadas}</Text>}
                  </Text>
                </View> 


               <BoxItensLoja
                    textTitle="Rodadas"
                    lojaItens ={ItensLojaRodada}/>

                <BoxItensLoja
                    textTitle="Cartas"
                    lojaItens={ItensLojaCarta}/>

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

       header_infos_user:{
        width:"100%",
        alignItems: "center",
        marginTop: "-15%"
      },
    
        boxTextHeader: {
    width: 150,
    height: 32,
    fontSize: 20,
    color: "#fff",
    opacity: 0.6,
    backgroundColor: '#ffcb00',
    borderRadius: 25,
    paddingVertical: "1%",
    marginVertical: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
  },

  iconBoxTextHeader: {
    width: 24,
    height: 24,
    color: "#fff",
    opacity: 0.7,
    textAlign: 'center',
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
        marginBottom:'5%',
        marginTop: 10,
        textAlign: 'center'
      },
  
    
    title: { 
        fontSize: 24 
    }
});
  export default LojaScreen;
  