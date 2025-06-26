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

    <View style={styles.gridCard}>

      {itensLoja.map((carta) => (
        <View key={carta.id}  
              onTouchStart={() => {
                console.log(carta)
                setcartaAtiva(carta)
              }
             }
            style={[styles.card, carta.vida > 0 ? { filter: 'grayscale(0%)' } : { filter: 'grayscale(100%)' }]}>
          <Image source={{uri: carta.imagem}} style={styles.image} />
          <View style={styles.grid}>
                        <Text style={styles.textModel}>Vida</Text>
                        <Text style={styles.textModel_alingRigth}>{carta?.vida}</Text>
                      </View>
          
                      <View style={styles.grid}>
                        <Text style={styles.textModel}>Energia</Text>
                        <Text style={styles.textModel_alingRigth}>{carta?.energia}</Text>
                      </View>
          
                      <View style={styles.grid}>
                        <Text style={styles.textModel}>Ataque</Text>
                        <Text style={styles.textModel_alingRigth}>{carta?.ataque}</Text>
                      </View>

          
        </View>
      ))}
    </View>

  </View>

  );
};

const styles = StyleSheet.create({
 

  gridCard: {
    flexDirection: 'row',
    flexWrap: "wrap",
    padding: 15
  },

   grid: {
    flexDirection: 'row',
    flexWrap: "wrap",
    paddingHorizontal: 15
  },

  card: {
    width: "32%",
    height: 'auto',
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden',
  },

  image: {
    width: 80,
    height: 100,
    resizeMode: 'cover',
  },
   textModel:{
    width: '50%',
    fontSize: 12,
    color: "#FFCB00",
    opacity: 0.9,
    marginTop: "2%",
    borderRadius: 20,
    textAlign: 'left',
    fontWeight: 'bold',
  },

  textModel_alingRigth:{
    width: '50%',
    fontSize: 12,
    color: "#FFCB00",
    opacity: 0.9,
    marginTop: "2%",
    borderRadius: 20,
    textAlign: 'right',
    fontWeight: 'bold',
  }
});


export default BoxCartasDeckBatalha;
