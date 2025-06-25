import React ,{useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ItensLoja from '../types/ItensCard'


export type BtnProps = {
  itensLoja: ItensLoja[]
};


const BoxCartasDeckBatalha: React.FC<BtnProps> = ({itensLoja}: BtnProps) => {
  const [cartaAtiva, setcartaAtiva] = useState<ItensLoja>();

  return(
  <View  >

    <View style={styles.grid}>

      {itensLoja.map((carta) => (
        <View key={carta.id}  
              onTouchStart={() => {
                console.log(carta)
                setcartaAtiva(carta)
              }
             }
            style={[styles.card, carta.tem_carta == 1 ? { filter: 'grayscale(0%)' } : { filter: 'grayscale(100%)' }]}>
          <Image source={{uri: carta.imagem}} style={styles.image} />

          
        </View>
      ))}
    </View>

  </View>

  );
};

const styles = StyleSheet.create({
 

  grid: {
    flexDirection: 'row',
    flexWrap: "wrap"
  },

  card: {
    width: "27%",
    height: 'auto',
    margin: 10,
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden'
  },

  image: {
    width: 90,
    height: 120,
    resizeMode: 'cover',
  }
});


export default BoxCartasDeckBatalha;
