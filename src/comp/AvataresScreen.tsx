import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const avatares = [
  { id: '1', img: require('../imagens/avatar_teste.png') },
  { id: '2', img: require('../imagens/avatar_teste.png') },
  { id: '3', img: require('../imagens/avatar_teste.png') },
  { id: '4', img: require('../imagens/avatar_teste.png') }
  ];

const AvataresScreen = () =>{
    return(
        <View style={styles.container}>
            <Text>Colecone avatares</Text>
            <ScrollView contentContainerStyle={styles.grid}>
                {avatares.map((avatar)=>(
                    <View key={avatar.id} style={styles.card}>
                        <Image source={avatar.img} style={styles.image}/>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default AvataresScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 16
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 16
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    card: {
      width: 150,
      height: 150,
      margin: 10,
      backgroundColor: '#ddd',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    },
    
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover'
    }
  });