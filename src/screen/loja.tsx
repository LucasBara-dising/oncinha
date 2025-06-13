import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { GetItensLoja, BuscaUser } from '../api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/home/lucasbara/Documentos/Native/oncinha/App';
import LojaItens from '../types/LojaItens';
import User from '../types/User';
import BoxItensLoja from '../comp/BoxItensLoja';

// Definindo o tipo das props para a navegação
type ColecaoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LojaScreen'>;

type Props = {
  navigation: ColecaoScreenNavigationProp;
};

const LojaScreen: React.FC<Props> = ({ navigation }) => {
  const [itensLoja, setItensLoja] = useState<LojaItens[]>([]);
  const [itensLojaRodada, setItensLojaRodada] = useState<LojaItens[]>([]);
  const [itensLojaCarta, setItensLojaCarta] = useState<LojaItens[]>([]);
  const [infosUser, setInfosUser] = useState<User | null>(null);
    
   useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await BuscaUser();
        const lojaItensData = await GetItensLoja();
        
        setInfosUser(userData);
        setItensLoja(lojaItensData);

        // Filtrando os itens após o carregamento
        setItensLojaRodada(lojaItensData.filter((item: { tipo: string; }) => item.tipo === 'Rodada'));
        setItensLojaCarta(lojaItensData.filter((item: { tipo: string; }) => item.tipo === 'Carta'));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!infosUser || itensLoja.length === 0) {
    // Exibe um loader enquanto os dados estão sendo carregados
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

    return ( 
<ScrollView >
  <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPressIn={() => navigation.navigate('HomeScreen')}>
            <Image source={require('../imagens/iconLoja.png')} />
          </Pressable>
        </View>

        <Image style={styles.bg} source={require('../imagens/bg-loja.png')} />

        <View style={styles.headerInfosUser}>
          <Text style={styles.boxTextHeader}>
            <Image style={styles.iconBoxTextHeader} source={require('../imagens/moeda.png')} />
            {infosUser.moedas}
          </Text>
          <Text style={styles.boxTextHeader}>
            <Image style={styles.iconBoxTextHeader} source={require('../imagens/dados.png')} />
            {infosUser.rodadas}
          </Text>
        </View>

        <BoxItensLoja textTitle="Rodadas" lojaItens={itensLojaRodada} />
        <BoxItensLoja textTitle="Cartas" lojaItens={itensLojaCarta} />
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
  headerInfosUser: {
    width: '100%',
    alignItems: 'center',
    marginTop: '-15%',
  },
  boxTextHeader: {
    width: 150,
    height: 32,
    fontSize: 20,
    color: '#fff',
    opacity: 0.6,
    backgroundColor: '#ffcb00',
    borderRadius: 25,
    paddingVertical: '1%',
    marginVertical: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  iconBoxTextHeader: {
    width: 24,
    height: 24,
    opacity: 0.7,
    marginRight: 10,
  },
  bg: {
    backgroundColor: '#025827',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    opacity: 0.8,
    width: '100%',
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
});

export default LojaScreen;