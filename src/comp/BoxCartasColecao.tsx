import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import ItensLoja from '../types/itensLoja'

const cartas = [
  { id: '1', title: "Macaco Mago", preco: 100, img: require('../imagens/card_macaco.png') },
  { id: '2', title: "Macaco Mago", preco: 200, img: require('../imagens/card_macaco.png') },
  { id: '3', title: "teste3", preco: 300, img: require('../imagens/avatar_teste.png') },
  { id: '4', title: "teste4", preco: 400, img: require('../imagens/avatar_teste.png') },
  { id: '6', title: "teste3", preco: 300, img: require('../imagens/avatar_teste.png') },
  { id: '7', title: "teste4", preco: 400, img: require('../imagens/avatar_teste.png')}
];

export type BtnProps = {
  textTitle: string;
  itensLoja: ItensLoja[]
};

const BoxCartas: React.FC<BtnProps> = ({textTitle, itensLoja}: BtnProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{textTitle}</Text>
    <View style={styles.grid}>
      {itensLoja.map((carta) => (
        <View key={carta.id} style={styles.card}>
          <Image source={carta.img} style={styles.image} />
        </View>
      ))}
    </View>
  </View>
  );


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: "10%",
    width:"90%",
    backgroundColor: '#143020',
    opacity: 0.9,
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: "#FFCB00"
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

  grid: {
    flexDirection: 'row',
    flexWrap: "wrap"
  },

  card: {
    width: "27%",
    height: 'auto',
    margin: 10,
    backgroundColor: '#025827',
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden'
  },

  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    filter: 'grayscale(100%)'
  }
});


export default BoxCartas;
