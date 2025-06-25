import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import BtnIcon from '../comp/box';
import User from '../types/User';
import ItensLoja from '../types/ItensCard';
import { RootStackParamList } from '/home/lucasbara/Documentos/Native/oncinha/App';
import BoxCartasDeckBatalha from '../comp/BoxCartasDeckBatalha';
import { BuscaUser, BuscaColecao } from '../api';
import StatusBar from '../comp/StatusBar';


// Definindo o tipo das props para a navegação
type BatalhaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BatalhaScreen'>;

type Props = {
  navigation: BatalhaScreenNavigationProp;
};


function getRandomItems(arr: ItensLoja[], n: number) {
  const shuffled = arr.sort(() => 0.5 - Math.random()); // Embaralha o array
  return shuffled.slice(0, n); // Pega os primeiros n itens
}
const BatalhaScreen: React.FC<Props> = ({ navigation }) => {
  const [itensColecao, setItensColecao] = useState<ItensLoja[]>([]);
  const [deckUser, setDeckUser] = useState<ItensLoja[]>([]);
  const [deckBot, setDeckBot] = useState<ItensLoja[]>([]);
  const [infosUser, setInfosUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await BuscaUser();
        const colecaoData = await BuscaColecao();

        setInfosUser(user);
        const deck = user?.deck.split(',').map(Number) || [];
        const itens = colecaoData.flatMap((obj: any) => obj);
        setItensColecao(itens);
        setDeckUser(itens.filter((item: ItensLoja) => deck.includes(item.id)));
        setDeckBot(getRandomItems(itens, 6));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!infosUser || deckUser.length === 0) {
    // Exibe um loader enquanto os dados estão sendo carregados
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

 return (
    <ImageBackground
      source={require('../imagens/bg-home.png')}
      style={styles.bg}
      imageStyle={styles.backgroundImageStyle}
    >
      <View style={styles.header}>
        <Pressable onPressIn={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../imagens/iconLoja.png')} />
        </Pressable>
      </View>

      <View style={styles.arena}>
        {/* Bot Deck */}
        <View style={styles.campo}>
          <View style={styles.hudContainer}>
            <Image source={require('../imagens/icon_bot.png')} style={styles.avatar} />
            <View style={styles.statsContainer}>
              <StatusBar
                iconName="flash"
                iconColor="#FFD700"
                value={100}
                percentage={100}
                barColor="#c4940e"
                trackColor="#3B3B98"
              />
              <StatusBar
                iconName="plus-box"
                iconColor="#FFFFFF"
                value={100}
                percentage={100}
                barColor="#4DD69A"
                trackColor="#3B3B98"
              />
            </View>
          </View>
          <BoxCartasDeckBatalha itensLoja={deckBot} />
        </View>

        <View style={styles.divisao}>
          <View style={styles.linha}></View>
          <Text style={styles.title}>X</Text>
          <View style={styles.linha}></View>
        </View>

        {/* User Deck */}
        <View style={styles.campo}>
          <View style={styles.hudContainer}>
            <Image source={require('../imagens/avatar_teste.png')} style={styles.avatar} />
            <View style={styles.statsContainer}>
              <StatusBar
                iconName="flash"
                iconColor="#FFD700"
                value={100}
                percentage={100}
                barColor="#c4940e"
                trackColor="#3B3B98"
              />
              <StatusBar
                iconName="plus-box"
                iconColor="#FFFFFF"
                value={100}
                percentage={100}
                barColor="#4DD69A"
                trackColor="#3B3B98"
              />
            </View>
          </View>
          <BoxCartasDeckBatalha itensLoja={deckUser} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    alignItems: 'center',
    position: 'absolute',
    zIndex: -1,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
    margin: 10,
    paddingHorizontal: 10,
  },

  arena: {
    marginTop: '5%',
    padding: 5,
  },
  backgroundImageStyle: {
    resizeMode: 'cover',
  },
  hudContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    height: '22%',
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: '3%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  statsContainer: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'space-around',
    height: '100%',
    paddingVertical: 5,
  },
  campo: {
    marginTop: '-5%',
    height: '45%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divisao: {
    height: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: '#FFCB00',
    padding: '2%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linha: {
    width: '40%',
    borderRadius: 50,
    height: 3,
    backgroundColor: '#FFCB00',
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

export default BatalhaScreen;