import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import ItensLoja from '../types/itensLoja'

const cartas = [
  { id: '1', title: "Macaco Mago", preco: 100, img: require('../imagens/card_macaco.png') },
  { id: '2', title: "Macaco Mago", preco: 200, img: require('../imagens/card_macaco.png') },
  { id: '3', title: "teste3", preco: 300, img: require('../imagens/avatar_teste.png') },
  { id: '4', title: "teste4", preco: 400, img: require('../imagens/avatar_teste.png') }
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

          <Text style={styles.titleBox}>{carta.title}</Text>

          <Text style={styles.precoBox}>{carta.preco}</Text>
        </View>
      ))}
    </View>
  </View>
  );


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center', 
    width:"100%"
  },

  title: {
    width: '80%',
    fontSize: 18,
    color: "#FFCB00",
    backgroundColor: "#025827",
    padding: '2%',
    borderRadius: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '2%',
    backgroundColor: '#025827',
    borderRadius: 20,
    borderStyle: 'solid',
    borderColor: "#FFCB00"
  },

  card: {
    width: "40%",
    height: 'auto',
    margin: 10,
    backgroundColor: '#025827',
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden'
  },

  titleBox:{
    width: '100%',
    fontSize: 18,
    color: "#FFCB00",
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10
  },

  precoBox: {
    width: '100%',
    fontSize: 18,
    color: "#fff",
    opacity: 0.7,
    fontWeight: 'bold',
    backgroundColor: '#ffcb00',
    borderRadius: 10,
    textAlign: 'center'
  },

  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover'
  }
});


export default BoxCartas;
