import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import BoxCartasColecao from '../comp/BoxCartasColecao';
import ItensLoja from '../types/ItensCard';
import User from '../types/User';
import { BuscaUser, BuscaColecao } from '../api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/home/lucasbara/Documentos/Native/oncinha/App';

// Definindo o tipo das props para a navegação
type ColecaoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ColecaoScreen'>;

type Props = {
  navigation: ColecaoScreenNavigationProp;
};

const ColecaoScreen: React.FC<Props> = ({ navigation }) => {
  const [itensColecao, setItensColecao] = useState<ItensLoja[]>([]);
  const [colecao, setColecao] = useState([]);
  const [infosUser, setInfosUser] = useState<User | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await BuscaUser();
        const colecaoData = await BuscaColecao();
        setInfosUser(user);
        setColecao(colecaoData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

   if (!infosUser || colecao.length === 0) {
    // Exibe um loader enquanto os dados estão sendo carregados
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image 
          style={styles.bg} 
          source={require('../imagens/bg-home.png')} />
        <View style={styles.header}>
          <Pressable onPressIn={() => navigation.navigate('HomeScreen')}>
            <Image source={require('../imagens/iconLoja.png')} />
          </Pressable>
        </View>

        <Image style={styles.bg} source={require('../imagens/bg-loja.png')} />
        <Text style={styles.moedas}>R$: {infosUser.moedas}</Text>
        <Text style={styles.title}>COLEÇÕES</Text>

        {colecao.map((itens, index) => (
          
          <BoxCartasColecao key={index} textTitle="Carta" itensLoja={itens} />
                
      ))}
      </View>
    </ScrollView>
  );
};
  
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
    margin: 20,
    paddingHorizontal: 10,
  },
  
  bg: {
    backgroundColor: '#025827',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    opacity: 0.8,
    width: '100%',
  },

 title: {
    fontSize: 24,
    color: '#FFCB00',
    padding: '2%',
    borderRadius: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  moedas: {
    fontSize: 18,
    width: '50%',
    height: 30,
    color: '#fff',
    opacity: 0.8,
    backgroundColor: '#ffcb00',
    borderRadius: 10,
    marginBottom: '10%',
    marginTop: '-15%',
    textAlign: 'center',
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#025827',
  },
  
  loadingText: {
    fontSize: 18,
    color: '#FFCB00',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default ColecaoScreen;