import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, SafeAreaView, FlatList } from 'react-native';
import BtnIcon from '../comp/box'
import ItensLoja from '../types/itensLoja'
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/home/lucasbara/Documentos/Native/oncinha/App';

// Definindo o tipo das props para a navegação
type ColecaoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ColecaoScreen'>;

type Props = {
  navigation: ColecaoScreenNavigationProp;
};

const RoletaScreen: React.FC<Props> = ({navigation}) =>{

 const ordem= {data: [
  { id: '01', img: require('../imagens/icon_moedas.png') },
  { id: '02', img: require('../imagens/icon_moedas.png') },
  { id: '03', img: require('../imagens/Icon_macaco.png') },
  { id: '04', img: require('../imagens/icon_louro.png') },
  { id: '05', img: require('../imagens/icon_bau.png') },
  { id: '06', img: require('../imagens/Icon_boto.png') },
  { id: '07', img: require('../imagens/icon_capivara.png') },
  { id: '08', img: require('../imagens/icon_tucano.png') },
  { id: '09', img: require('../imagens/icon_tucano.png') },
]
 }

  const [itensColacao, setItens] = useState<ItensLoja[]>([])


  const [infosUser_moedas, setInfos_moedas] = useState()

    return ( 
            <View style={styles.container}>
               <Image 
                                  style={styles.bg} 
                                  source={require('../imagens/bg-home.png')} />

              <View style={styles.header}>
                <Pressable
                  onPressIn={() => navigation.navigate('HomeScreen')}>
                  <Image 
                    source={require('../imagens/iconLoja.png')} />
                </Pressable>

                <Pressable>
                  <Image 
                    source={require('../imagens/iconLoja.png')} />
                </Pressable>
              </View>

              <View style={styles.containerRoleta}>
                <SafeAreaView>
                  <FlatList
                    data={ordem.data}
                    keyExtractor={item => item.id}
                    numColumns={3} 
                    renderItem={({ item }) => {
                      return (
                        <View style={styles.item}>
                          <Image 
                              source={item.img} />
                        </View>
                      );
                    }}
                  />
                </SafeAreaView>
              </View>

               <Text
                    style={styles.textPremio}> Moedas
                </Text>

                <BtnIcon
              onPress={() => navigation.navigate('RoletaScreen')}
              textbtn="Girar Roleta"
              imgBtn ={require('../imagens/icon_espiral.png')}
              />
            </View>
     );
  };
  
  
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center' 
    },

    header:{
      width:"100%",
      justifyContent: "space-between",
      flexDirection: 'row',
      marginVertical: 30,
      paddingHorizontal: 15
    },
  
    bg:{
          backgroundColor:'#025827',
          height: '100%',
          position: 'absolute',
          zIndex: -1,
          opacity: 0.8,
      },

    textPremio: {
        fontSize: 20,
        width:'80%',
        color: "#fff",
        opacity: 0.6,
        backgroundColor: '#ffcb00',
        borderRadius:25,
        padding:"1%",
        marginVertical: 20,
        textAlign: 'center'
      },

      containerRoleta:{
        width:'90%',
        backgroundColor: "#000",
        borderRadius: 20,
        padding: 10
      },

      item: {
        alignItems: "center",
        flexGrow: 1,
        margin: 4,
      },


});

export default RoletaScreen;