import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Modal, FlatList } from 'react-native';
import BoxCartasDeck from '../comp/BoxCartasDeck';
import ModelBoxCartasDeck from '../comp/ModelBoxCartasDeck';
import { BuscaUser, BuscaColecao } from '../api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/home/lucasbara/Documentos/Native/oncinha/App';
import ItensLoja from '../types/ItensCard';
import User from '../types/User';

type ColecaoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PerfilScreen'>;

type Props = {
  navigation: ColecaoScreenNavigationProp;
};


const PerfilScreen: React.FC<Props> = ({ navigation }) => {
  const [itensColacao, setItensColacao] = useState<ItensLoja[]>([]);
  const [itensDeck, setItensDeck] = useState<ItensLoja[]>([]);
  const [editModalVisible, setModalVisible] = useState(false);
  const [deck, setDeck] = useState([1, 2, 3, 4, 5, 6]);
  const [infosUser, setInfosUser] = useState<User>();
  const [cartaAtiva, setCartaAtiva] = useState<number[]>([]);

  const toggleCarta = (id: number, temCarta: number) => {
    if (temCarta !== 1) return;

    setCartaAtiva(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };


  useEffect(() => {
    const fetchData = async () => {
      const user = await BuscaUser();
      const colecaoData = await BuscaColecao();

      setInfosUser(user);
      const itens = colecaoData.flatMap((obj: any) => obj);
      setItensColacao(itens);
      setItensDeck(itens.filter((item: { id: number }) => deck.includes(item.id)));
    };

    fetchData().catch(console.error);
  }, [deck]);

  // Função para abrir/fechar modal de edição do deck
  const toggleModal = () => setModalVisible(!editModalVisible);

 return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Pressable onPressIn={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../imagens/iconLoja.png')} />
        </Pressable>
      </View>

      <Pressable onPressIn={() => navigation.navigate('PerfilScreen')}>
        <Image source={require('../imagens/avatar_teste.png')} />
      </Pressable>

      <Image style={styles.bg} source={require('../imagens/bg-home.png')} />
      <Text style={styles.moedas}>R$ {infosUser?.moedas}</Text>

      <View style={styles.containerDeck}>
        <View style={styles.header}>
          <Text style={styles.title}>Deck</Text>
          <Text onPress={toggleModal} style={styles.bntEdit}>Edit</Text>
        </View>
        <BoxCartasDeck itensLoja={itensDeck} />
      </View>

      <Modal visible={editModalVisible} transparent>
        <View style={styles.bgModel}>
          <Text onPress={toggleModal} style={styles.moedas}>X</Text>
          <FlatList
            nestedScrollEnabled
            data={itensColacao}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <View onTouchStart={() => toggleCarta(item.id, item.tem_carta)}>
                <ModelBoxCartasDeck itensLoja={item} cartaAtiva={cartaAtiva} />
              </View>
            )}
            contentContainerStyle={styles.grid}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};
  
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  header: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  bg: {
    backgroundColor: '#025827',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    opacity: 0.8,
  },
  moedas: {
    fontSize: 18,
    width: '60%',
    height: 30,
    color: '#fff',
    opacity: 0.8,
    backgroundColor: '#ffcb00',
    borderRadius: 10,
    marginBottom: '10%',
    marginTop: '5%',
    textAlign: 'center',
  },
  containerDeck: {
    flex: 1,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: "10%",
    width: "90%",
    height: "auto",
    backgroundColor: '#143020',
    opacity: 0.9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFCB00",
  },

  title: {
    width: '50%',
    fontSize: 18,
    color: "#FFCB00",
    backgroundColor: "#1C7442",
    padding: '2%',
    borderRadius: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bntEdit: {
    width: '25%',
    color: "#FFCB00",
    backgroundColor: "#143020",
    borderWidth: 2,
    borderColor: "#ffcb00",
    opacity: 0.9,
    textAlign: 'center',
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    borderRadius: 20,
  },
  bgModel: {
    width: '100%',
    height: '120%',
    backgroundColor: '#000',
    position: 'absolute',
    opacity: 0.8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: "wrap",
  },
});

export default PerfilScreen;