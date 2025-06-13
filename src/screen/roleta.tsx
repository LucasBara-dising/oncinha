import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Image,
  Pressable, SafeAreaView, FlatList, Modal
} from 'react-native';
import BtnIcon from '../comp/box';
import { Roleta, BuscaUser } from '../api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/home/lucasbara/Documentos/Native/oncinha/App';
import DetalhesRoleta from '../types/DetalhesRoleta';

type NavigationProps = StackNavigationProp<RootStackParamList, 'RoletaScreen'>;

type Props = {
  navigation: NavigationProps;
};

type Figura = {
  nome: string;
  image: string;
};

type DadosUser ={
  moedas: number;
  rodadas: number;
}

const imagemPorFigura = (nome: string): string => {
  const imagens: { [key: string]: string } = {
    Boto: "https://drive.google.com/thumbnail?id=1sCPpMxz-VEZrrYnZZ3URMQ74W09_2kco",
    Onça: "https://drive.google.com/thumbnail?id=1_-85smscgWlHLhPX7Li4q6Xa_QqwhecU",
    Arara: "https://drive.google.com/thumbnail?id=155p1fmhBBhCVQswhvVT_6E5ScWJNbDZL",
    Macaco: "https://drive.google.com/thumbnail?id=1J6NrGtUJdCo6gzUXtzcLNKD2nUab1fyG",
    Capivara: "https://drive.google.com/thumbnail?id=175bUXCFNzVtRna4OE0zSm-ehzq5yUdSF",
    Moedas: "https://drive.google.com/thumbnail?id=1plctsAvDiuFJ9GXbrKADKzhvLHRMhSRz",
    Espinho: "https://drive.google.com/thumbnail?id=1Jr0XLMyZNuqCUhdXCB18qonsfZNVR1U5",
    Tucano: "https://drive.google.com/thumbnail?id=1780Rbwuf_Y0XRDReCHcjjmeSxEg0XhQd",
    Tesouro: "https://drive.google.com/thumbnail?id=1_rFlfsB2YR97sVvkqL2GIdOkZPX7eZbm",
  };

  return imagens[nome] || "https://drive.google.com/thumbnail?id=1c2zmJ04LsXLSoY2yomtBKp4KP-gVOmgt";
};

//Monta Objetos
const mapParaFiguras = (resultado: string[][]): Figura[] =>
  resultado.flat().map(nome => ({
    nome,
    image: imagemPorFigura(nome),
  }));

const RoletaScreen: React.FC<Props> = ({ navigation }) => {
  const [resultadoRoleta, setResultadoRoleta] = useState<Figura[]>([]);
  const [detalhes, setDetalhes] = useState<DetalhesRoleta | null>(null);
  const [dadosuser, setDadosuser] = useState<DadosUser | null>(null);
  const [editModalVisible, setModalVisible] = useState(false);

  const GiraRoleta = async () => {
    try {
      const dados = await Roleta();
      //Garante que dados sejam preenchidos
      console.log(dados)
      if (!dados || !dados.resultado) {
        console.error("Dados inválidos");
        return;
      }

      const figuras = mapParaFiguras(dados.item_sequencia);
      console.log(figuras)
      console.log(dados)
      setDetalhes(dados);
      setResultadoRoleta(figuras);
       setDadosuser({moedas: dados?.moedas, rodadas:  dados?.saldo})
      console.log('Prêmio:', dados.premio);

      if(dados.premio != "Sem sequencia"){
        console.log('Model:', "Abre");
        setModalVisible(!editModalVisible)
      }

    } catch (error) {
      console.error('Erro ao girar a roleta:', error);
    }

    const user = await BuscaUser();
    setDadosuser({moedas: user?.moedas, rodadas:  user?.rodadas})
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = await BuscaUser();

      setDadosuser({moedas: user?.moedas, rodadas:  user?.rodadas})
    };

    fetchData().catch(console.error);

    console.log(dadosuser)

    const figurasDefault= [
      {"nome": "Capivara", "image": "https://drive.google.com/thumbnail?id=175bUXCFNzVtRna4OE0zSm-ehzq5yUdSF"},
      {"nome": "Macaco", "image": "https://drive.google.com/thumbnail?id=1J6NrGtUJdCo6gzUXtzcLNKD2nUab1fyG"},
      {"nome": "Macaco", "image": "https://drive.google.com/thumbnail?id=1J6NrGtUJdCo6gzUXtzcLNKD2nUab1fyG"},
      {"nome": "Capivara", "image": "https://drive.google.com/thumbnail?id=175bUXCFNzVtRna4OE0zSm-ehzq5yUdSF"},
      {"nome": "Onça", "image": "https://drive.google.com/thumbnail?id=1_-85smscgWlHLhPX7Li4q6Xa_QqwhecU"},
      {"nome": "Tucano", "image": "https://drive.google.com/thumbnail?id=1780Rbwuf_Y0XRDReCHcjjmeSxEg0XhQd"},
      {"nome": "Boto", "image": "https://drive.google.com/thumbnail?id=1sCPpMxz-VEZrrYnZZ3URMQ74W09_2kco"},
      {"nome": "Boto", "image": "https://drive.google.com/thumbnail?id=1sCPpMxz-VEZrrYnZZ3URMQ74W09_2kco"},
      {"nome": "Arara", "image": "https://drive.google.com/thumbnail?id=155p1fmhBBhCVQswhvVT_6E5ScWJNbDZL"}
  ]

    setResultadoRoleta(figurasDefault);// Gira automaticamente ao entrar na tela
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.bg}
        source={require('../imagens/bg-home.png')}
      />

      <View style={styles.header}>
        <Pressable onPressIn={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../imagens/iconLoja.png')} />
        </Pressable>

        <View>

         <Text style={styles.boxTextHeader}>
             <Image style={styles.iconBoxTextHeader} source={require('../imagens/moeda.png')} />
             {detalhes?.moedas ? <Text>{detalhes?.moedas}</Text> : <Text>{dadosuser?.moedas}</Text>}
          </Text>
          <Text style={styles.boxTextHeader}>
            <Image style={styles.iconBoxTextHeader} source={require('../imagens/dados.png')} />
             {detalhes?.saldo ? <Text>{detalhes?.saldo}</Text> : <Text>{dadosuser?.rodadas}</Text>}
          </Text>
           </View>

        <Pressable onPressIn={() => navigation.navigate('LojaScreen')}>
          <Image source={require('../imagens/iconLoja.png')} />
        </Pressable>
      </View>

      <View style={styles.containerRoleta}>
        <SafeAreaView>
          <FlatList
            data={resultadoRoleta}
            keyExtractor={(item, index) => `${item.nome}-${index}`}
            numColumns={3}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.image }} style={{ width: 110, height: 150 }} />
              </View>
            )}
          />
        </SafeAreaView>

  <Modal visible = {editModalVisible} 
          transparent={editModalVisible} >
        <View style ={styles.bgModel}onTouchStart={()=>{
          setModalVisible(false)
        }}>
        <View style={styles.containerModel}>

          
              <Text style={styles.titleModel}>Premio</Text>

              <Text style={styles.textModel}>{detalhes?.premio}</Text>

              <Text style={styles.btnModel}>Legal !!!</Text>
           
        </View>
        </View>

    </Modal>
      </View>

      <Text style={styles.textPremio}>
        {detalhes?.premio || 'Prêmio'}
      </Text>

      <BtnIcon
        onPress={GiraRoleta}
        textbtn="Girar Roleta"
        imgBtn={require('../imagens/icon_espiral.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  header: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: 'row',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },

   boxTextHeader: {
    width: 150,
    height: 32,
    fontSize: 20,
    color: "#fff",
    opacity: 0.6,
    backgroundColor: '#ffcb00',
    borderRadius: 25,
    paddingVertical: "1%",
    marginVertical: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
  },

  iconBoxTextHeader: {
    width: 24,
    height: 24,
    color: "#fff",
    opacity: 0.7,
    textAlign: 'center',
  },

  bg: {
    backgroundColor: '#025827',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    opacity: 0.8,
    width: '100%',
  },

  textPremio: {
    fontSize: 20,
    width: '80%',
    color: "#fff",
    opacity: 0.6,
    backgroundColor: '#ffcb00',
    borderRadius: 25,
    padding: "1%",
    marginVertical: 20,
    textAlign: 'center',
  },

  containerRoleta: {
    width: '90%',
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 10,
  },
  item: {
    alignItems: "center",
    flexGrow: 1,
    margin: 4,
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
    height: "28%",
    borderRadius: "2%",
    marginHorizontal: "10%",
    marginVertical: '50%',
    padding: "5%",
    borderWidth: 2,
    borderColor: "#ffcb00",
    backgroundColor: "#1C7442",
    display: 'flex',
    alignItems:"center",
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
    padding: '5%',
    borderRadius: 20,
    marginVertical: 20,
    opacity: .8,
    textAlign: 'center',
    fontWeight: 'bold',
  },

});

export default RoletaScreen;
