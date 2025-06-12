import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Image } from 'react-native';
import ItensLoja from '../types/ItensCard'
import { Text } from 'react-native-gesture-handler';

interface CardProps {
   itensLoja: ItensLoja
   cartaAtiva: Number[]
}

const ModelBoxCartasDeck: React.FC<CardProps> = ({ itensLoja, cartaAtiva}) => {
  const swingAnim = useRef(new Animated.Value(0)).current;

  const startSwing = () => {
    swingAnim.setValue(0); // reinicia a animação
    Animated.sequence([
      Animated.timing(swingAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      Animated.timing(swingAnim, { toValue: -1, duration: 100, useNativeDriver: true }),
      Animated.timing(swingAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      Animated.timing(swingAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const rotate = swingAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-5deg', '0deg', '5deg'],
  });

  return (
    <Pressable onPress={() => {

      if(itensLoja.tem_carta == 0){
        startSwing()
      }}}
      
      style={[itensLoja.tem_carta == 1 ? { filter: 'grayscale(0%)' } : { filter: 'grayscale(100%)' }]}>
      <Animated.View style={[styles.card, { transform: [{ rotate }] }]}>
        <Image source={{uri: itensLoja.imagem}} style={styles.image} />

        <Pressable onPress={() => (console.log("add"))} style={[styles.btncard, cartaAtiva.includes(itensLoja.id) == true ? {backgroundColor: '#FF0000',}: {backgroundColor:  '#0084FF'}]}>
          <Text>{cartaAtiva.includes(itensLoja.id) == true ? "Remover" :  "Adiconar"}</Text>
        </Pressable>

      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
 
  grid: {
    flexDirection: 'row',
    flexWrap: "wrap"
  },

  card: {
    width: "90%",
    height: 'auto',
    margin: 8,
    padding: 10,
    backgroundColor: '#025827',
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden'
  },

   btncard: {
    width: "100%",
    height: 'auto',
    margin: 10,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },

  image: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
  },

});

export default ModelBoxCartasDeck;
