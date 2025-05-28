import React ,{useState } from 'react';
import { View, Text, Image, StyleSheet, Modal } from 'react-native';
import ItensLoja from '../types/itensLoja'

// const cartas = [
//   { id: '1', title: "Macaco Mago", preco: 100, img: require('../imagens/card_macaco.png') },
//   { id: '2', title: "Macaco Mago", preco: 200, img: require('../imagens/card_macaco.png') },
//   { id: '3', title: "teste3", preco: 300, img: require('../imagens/avatar_teste.png') },
//   { id: '4', title: "teste4", preco: 400, img: require('../imagens/avatar_teste.png') },
//   { id: '6', title: "teste3", preco: 300, img: require('../imagens/avatar_teste.png') },
//   { id: '7', title: "teste4", preco: 400, img: require('../imagens/avatar_teste.png')}

// ];


export type BtnProps = {
  textTitle: string;
  itensLoja: ItensLoja[]
};



const BoxCartas: React.FC<BtnProps> = ({textTitle, itensLoja}: BtnProps) => {
  const [editModalVisible, setModalVisible] = useState(false);
  const [cartaAtiva, setcartaAtiva] = useState<ItensLoja>();

  return(
  <View style={styles.container} >
    {itensLoja.map((carta) => (
      <View>
        {/* set titulo da coleção */}
        {textTitle = carta.colecao}
      </View>
    ))}

    <Text style={styles.title}>{textTitle}</Text>

    <View style={styles.grid}>

      {itensLoja.map((carta) => (
        <View key={carta.id}  
              onTouchStart={() => {
                setModalVisible(true)
                setcartaAtiva(carta)
              }
             }
            style={[styles.card, carta.tem_carta == 1 ? { filter: 'grayscale(0%)' } : { filter: 'grayscale(100%)' }]}>
          <Image source={{uri: carta.imagem}} style={styles.image} />

          
        </View>
      ))}
    </View>

    <Modal visible = {editModalVisible} 
          transparent={editModalVisible} >
        <View style ={styles.bgModel}onTouchStart={()=>{
          setModalVisible(false)
        }}>
        <View style={styles.containerModel}>

            <Image source={{uri: cartaAtiva?.imagem}} style={styles.imageModel} />

            <Text style={styles.titleModel}>{cartaAtiva?.nome}</Text>

            <View style={styles.grid}>
              <Text style={styles.titleBg}>{cartaAtiva?.raridade}</Text>
              <Text style={styles.titleBg}>{cartaAtiva?.colecao}</Text>
            </View>

            <Text style={styles.titleModel}>{cartaAtiva?.tipo}</Text>

            <View style={styles.grid}>
              <Text style={styles.textModel}>Vida</Text>
              <Text style={styles.textModel_alingRigth}>{cartaAtiva?.vida}</Text>
            </View>

            <View style={styles.grid}>
              <Text style={styles.textModel}>Energia</Text>
              <Text style={styles.textModel_alingRigth}>{cartaAtiva?.energia}</Text>
            </View>

            <View style={styles.grid}>
              <Text style={styles.textModel}>Ataque</Text>
              <Text style={styles.textModel_alingRigth}>{cartaAtiva?.ataque}</Text>
            </View>
        </View>
        </View>

    </Modal>
  </View>

  );
};

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
    width: 100,
    height: 150,
    resizeMode: 'cover',
  },

  bgModel: {
    width: "100%",
    height: "120%",
    backgroundColor: "#000",
    position: "absolute",
    opacity: 0.8,
  },

  containerModel: {
    width: "80%",
    height: "70%",
    borderRadius: "2%",
    margin: "10%",
    padding: "5%",
    borderWidth: 2,
    borderColor: "#ffcb00",
    backgroundColor: "#1C7442",
    display: 'flex',
    alignItems:"center",
    opacity: 1,
  },


  imageModel: {
    width: "70%",
    height: "40%"
  },

  titleModel:{
    width: 'auto',
    fontSize: 18,
    color: "#FFCB00",
    borderColor: "#ffcb00",
    padding: '2%',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: "5%"
  },

  titleBg:{
    width: '45%',
    fontSize: 18,
    color: "#FFCB00",
    backgroundColor: "#143020",
    borderWidth: 2,
    borderColor: "#ffcb00",
    opacity: 0.9,
    marginHorizontal: "1%",
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    borderRadius: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  textModel:{
    width: '50%',
    fontSize: 20,
    color: "#FFCB00",
    opacity: 0.9,
    marginTop: "5%",
    borderRadius: 20,
    textAlign: 'left',
    fontWeight: 'bold',
  },

  textModel_alingRigth:{
    width: '50%',
    fontSize: 20,
    color: "#FFCB00",
    opacity: 0.9,
    marginTop: "5%",
    borderRadius: 20,
    textAlign: 'right',
    fontWeight: 'bold',
  }
});


export default BoxCartas;
