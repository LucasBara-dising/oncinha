import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  Modal,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/home/lucasbara/Documentos/Native/oncinha/App';
import User from '../types/User';
import ItensLoja from '../types/ItensCard';
import StatusBar from '../comp/StatusBar';
import BoxCartasDeckBatalha from '../comp/BoxCartasDeckBatalha';
import { BuscaUser, BuscaColecao } from '../api';

type BatalhaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BatalhaScreen'>;

type Props = {
  navigation: BatalhaScreenNavigationProp;
};

function getRandomItems(arr: ItensLoja[], n: number) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const BatalhaScreen: React.FC<Props> = ({ navigation }) => {
  const [infosUser, setInfosUser] = useState<User | null>(null);
  const [gameData, setGameData] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => navigation.navigate('HomeScreen');

  const batalha = (cartaUser: ItensLoja) => {
    const cartaBot = gameData.deckBot[Math.floor(Math.random() * 6)];

    const energiaUser = gameData.energiaUser - cartaUser.energia;
    const energiaBot = gameData.energiaBot - cartaBot.energia;

    const danoUser = cartaUser.ataque;
    const danoBot = cartaBot.ataque;

    let vidaCartaUser = cartaUser.vida - danoBot;
    let vidaCartaBot = cartaBot.vida - danoUser;

    let vidaUser = gameData.vidaUser - Math.max(0, -vidaCartaUser);
    let vidaBot = gameData.vidaBot - Math.max(0, -vidaCartaBot);

    vidaCartaUser = Math.max(0, vidaCartaUser);
    vidaCartaBot = Math.max(0, vidaCartaBot);

    const deckUserAtualizado = gameData.deckUser.map((carta: ItensLoja) =>
      carta.id === cartaUser.id ? { ...carta, vida: vidaCartaUser } : carta
    );

    const deckBotAtualizado = gameData.deckBot.map((carta: ItensLoja) =>
      carta.id === cartaBot.id ? { ...carta, vida: vidaCartaBot } : carta
    );

    let resultado = 'Continua';
    if (vidaUser <= 0 || energiaUser <= 0) resultado = 'Vitória do Bot';
    else if (vidaBot <= 0 || energiaBot <= 0) resultado = 'Vitória do Jogador';
    else if (vidaUser <= 0 && vidaBot <= 0) resultado = 'Empate';

    if (resultado !== 'Continua') setModalVisible(true);

    setGameData({
      resultado,
      vidaUser,
      vidaBot,
      energiaUser,
      energiaBot,
      deckUser: deckUserAtualizado,
      deckBot: deckBotAtualizado,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await BuscaUser();
        const colecao = await BuscaColecao();
        const itens = colecao.flatMap((obj: any) => obj);

        const deckIds = user?.deck.split(',').map(Number) || [];
        const deckUser = itens.filter((item: ItensLoja) => deckIds.includes(item.id));
        const deckBot = getRandomItems(itens, 6);

        setInfosUser(user);
        setGameData({
          resultado: 'Inicio',
          vidaUser: 100,
          vidaBot: 100,
          energiaUser: 100,
          energiaBot: 100,
          deckUser,
          deckBot,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!infosUser || !gameData) {
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
        {/* Bot */}
        <View style={styles.campo}>
          <BoxCartasDeckBatalha itensLoja={gameData.deckBot} />
          <View style={styles.hudContainer}>
            <Image source={require('../imagens/icon_bot.png')} style={styles.avatar} />
            <View style={styles.statsContainer}>
              <StatusBar iconName="flash" iconColor="#FFD700" value={gameData.energiaBot} percentage={gameData.energiaBot} barColor="#c4940e" trackColor="#3B3B98" />
              <StatusBar iconName="plus-box" iconColor="#FFFFFF" value={gameData.vidaBot} percentage={gameData.vidaBot} barColor="#4DD69A" trackColor="#3B3B98" />
            </View>
          </View>
        </View>

        {/* VS */}
        <View style={styles.divisao}>
          <View style={styles.linha}></View>
          <Text style={styles.title}>X</Text>
          <View style={styles.linha}></View>
        </View>

        {/* User */}
        <View style={styles.campo}>
          <View style={styles.hudContainer}>
            <Image source={require('../imagens/avatar_teste.png')} style={styles.avatar} />
            <View style={styles.statsContainer}>
              <StatusBar iconName="flash" iconColor="#FFD700" value={gameData.energiaUser} percentage={gameData.energiaUser} barColor="#c4940e" trackColor="#3B3B98" />
              <StatusBar iconName="plus-box" iconColor="#FFFFFF" value={gameData.vidaUser} percentage={gameData.vidaUser} barColor="#4DD69A" trackColor="#3B3B98" />
            </View>
          </View>
          <Pressable onPress={() => batalha(gameData.deckUser[0])}>
            <BoxCartasDeckBatalha itensLoja={gameData.deckUser} />
          </Pressable>
        </View>

        {/* Modal */}
        <Modal visible={modalVisible} transparent>
          <View style={styles.bgModel}>
            <View style={styles.containerModel}>
              <Text style={styles.titleModel}>Jogo</Text>
              <Text style={styles.textModel}>{gameData.resultado}</Text>
              <Text style={styles.btnModel} onPress={handleModalClose}>Legal</Text>
            </View>
          </View>
        </Modal>
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
  backgroundImageStyle: { resizeMode: 'cover' },
  header: {
    width: '100%',
    height: '2%',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  arena: { marginTop: '5%'},

  campo: {
    marginTop: '2%',
    height: '47%',
    paddingHorizontal: '1%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hudContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    height: '20%',
    width: '80%',
    marginHorizontal: '5%',
    marginVertical: '-5%',
    borderRadius: 15,
  },
  avatar: {
    width: 50,
    height: 50,
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
  divisao: {
    height: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linha: {
    width: '40%',
    borderRadius: 50,
    height: 2,
    backgroundColor: '#FFCB00',
  },
  title: {
    fontSize: 14,
    color: '#FFCB00',
    padding: '2%',
    textAlign: 'center',
    fontWeight: 'bold',
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

  modelHorizontal: {
    opacity: .8,
    flexDirection: 'row',
  },
  containerModel: {
    width: "80%",
    height: "28%",
    borderRadius: "2%",
    marginHorizontal: "10%",
    marginVertical: '50%',
    padding: "5%",
    borderWidth: 2,
    borderColor: "#ffcb00",
    backgroundColor: "#1C7442",
    display: 'flex',
    alignItems: "center",
    opacity: 1,
  },
  titleModel: {
    fontSize: 32,
    color: "#FFCB00",
    padding: '2%',
    borderRadius: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textModel: {
    fontSize: 20,
    color: "#fff",
    borderRadius: 25,
    padding: "1%",
    marginVertical: 10,
    textAlign: 'center',
  },
    bgModel: {
    width: "100%",
    height: "120%",
    backgroundColor: "#000",
    position: "absolute",
    zIndex: -1,
    opacity: 0.9,
  },
  btnModel: {
    fontSize: 20,
    backgroundColor: "#0084FF",
    color: "#fff",
    paddingHorizontal: '15%',
    paddingVertical: '2%',
    borderRadius: 20,
    marginVertical: 20,
    marginHorizontal: 20,
    opacity: .8,
    textAlign: 'center',
    fontWeight: 'bold',
    zIndex: 10
  },
});

export default BatalhaScreen;