import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Modal } from 'react-native';
import LojaItens from '../types/LojaItens';
import { EfetuaCompra, BuscaUser } from '../api';

export type BtnProps = {
  textTitle: string;
  lojaItens: LojaItens[];
};

const BoxItensLoja: React.FC<BtnProps> = ({ textTitle, lojaItens }: BtnProps) => {
  const [editModalVisible, setModalVisible] = useState(false);
  const [cartaAtiva, setCartaAtiva] = useState<LojaItens | null>(null);

  const handleItemClick = (item: LojaItens) => {
    setCartaAtiva(item);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setCartaAtiva(null);
  };

  const handleCompra = () => {
    console.log(textTitle)
    if (cartaAtiva) {
      EfetuaCompra("jogador01", cartaAtiva.id, cartaAtiva.tipo);
      console.log(BuscaUser());
      handleModalClose();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{textTitle}</Text>

      <View style={styles.grid}>
        {lojaItens.map((carta) => (
          <View key={carta.id} style={styles.card} onTouchStart={() => handleItemClick(carta)}>
            <Image source={{ uri: carta.imagem }} style={styles.image} />
            <Text style={styles.titleBox}>{carta.nome}</Text>
            <Text style={styles.precoBox}>{carta.preco}</Text>
          </View>
        ))}
      </View>

      {/* Modal */}
      <Modal visible={editModalVisible} transparent>
        <View style={styles.bgModel} >
          <View style={styles.containerModel}>
            <Text style={styles.titleModel}>Premio</Text>
            <Text style={styles.textModel}>Comprar: {cartaAtiva?.nome}</Text>

            <View style={styles.modelHorizontal}>
              <Text
                style={[styles.btnModel, { backgroundColor: "#0084FF" }]}
                onPress={handleCompra}>
                Sim
              </Text>
              <Text
                style={[styles.btnModel, { backgroundColor: "#FF0000" }]}
                onPress={handleModalClose}>
                Não
              </Text>
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
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    width: "100%",
  },
  title: {
    width: '100%',
    fontSize: 18,
    color: "#FFCB00",
    backgroundColor: "#025827",
    paddingHorizontal: '20%',
    paddingVertical: '2%',
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
    borderColor: "#FFCB00",
  },
  card: {
    width: "40%",
    height: 'auto',
    margin: 10,
    backgroundColor: '#025827',
    borderRadius: 12,
    alignItems: 'center',
    overflow: 'hidden',
  },
  titleBox: {
    width: '100%',
    height: '20%',
    fontSize: 18,
    color: "#FFCB00",
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
  },
  precoBox: {
    width: '100%',
    fontSize: 18,
    color: "#fff",
    opacity: 0.7,
    fontWeight: 'bold',
    backgroundColor: '#ffcb00',
    borderRadius: 10,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  bgModel: {
    width: "100%",
    height: "120%",
    backgroundColor: "#000",
    position: "absolute",
    zIndex: -1,
    opacity: 0.9,
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

export default BoxItensLoja;
