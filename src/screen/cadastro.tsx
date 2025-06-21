import React, {useState } from 'react';
import {Text, View, StyleSheet, Image, Pressable, TextInput} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '/home/lucasbara/Documentos/Native/oncinha/App';
import { CadastrarUsuario } from '../api';

// Definindo o tipo das props para a navegação
type NavigationProp = StackNavigationProp<RootStackParamList, 'CadastroScreen'>;

type Props = {
  navigation: NavigationProp;
};


const CadastroScreen: React.FC<Props> = ({navigation}) =>{
  const [textUser, setTextUser] = useState('');
  const [textEmail, setTextEmail] = useState('');
  const [textSenha, setTextSenha] = useState('');
  const [textSenhaConf, setTextSenhaConf] = useState('');

    async function onButtonClick() {
      console.log(textEmail)
      navigation.navigate('LoginScreen')

      const resultado = await CadastrarUsuario('lucas', 'senha', 'email@example.com');
      console.log(resultado.mensagem);

    }


  return (
    <View style={styles.container}>
         <Image 
            style={styles.bg} 
            source={require('../imagens/bg-login.png')} />

        <View style={styles.boxInput}>
          
            <Image 
            style={styles.iconOnca}
              source={require('../imagens/icon_onca.png')} />
  

            <Text style={styles.title}>Cadastro</Text>

            <Text style={styles.titleInput}>USER</Text>
            <TextInput
              style={styles.inputContainer}
               onChangeText={newText => setTextUser(newText)}
               value={textUser}
            />

            <Text style={styles.titleInput}>Email</Text>
            <TextInput
              style={styles.inputContainer}
               onChangeText={newText => setTextEmail(newText)}
               value={textEmail}
            />

            <Text style={styles.titleInput}>SENHA</Text>
            <TextInput
              style={styles.inputContainer}
               onChangeText={newText => setTextSenha(newText)}
               value={textSenha}
            />

             <Text style={styles.titleInput}>Confirmar SENHA</Text>
            <TextInput
              style={styles.inputContainer}
               onChangeText={newText => setTextSenhaConf(newText)}
               value={textSenhaConf}
            />


            <Text style={styles.subtitle}>ESQUECEU SUA SENHA?</Text>

          <Pressable
            style={styles.buttonContainer} 
            onPressIn={onButtonClick}>
            <Text style={styles.buttonText}> CADASTRE-SE</Text>
          </Pressable>

        </View>

    </View>
  );
};

const styles = StyleSheet.create({
    container:{
      height: '100%'
    },

    bg:{
        height: '100%',
        position: 'absolute',
        zIndex: -1,
        opacity: 0.8,
    },

    boxInput:{
        marginTop: '30%',
        marginLeft: '10%',
        marginRight: '10%',
        padding: "5%",
        alignItems: "center",
       justifyContent: 'center',
       backgroundColor: "#025827",
       borderRadius: 20,
       opacity: 0.9,
    },

    iconOnca:{
      marginTop: "-20%"
    },

    title: {
      fontSize: 20,
      width:'80%',
      color: '#ffcb00',
      marginTop: '10%',
      textAlign: 'center'
    },

    subtitle: {
      fontSize: 12,
      width: "100%",
      color: '#fff',
      marginBottom:'2%',
      marginTop: '10%',
      textAlign: 'center'
    },

    titleInput: {
      fontSize: 16,
      width: "100%",
      color: '#fff',
      marginBottom:'2%',
      marginTop: '10%',
      textAlign: "left"
    },

    inputContainer: {
      alignItems: 'center',
      height: 50,
      width: "100%",
      backgroundColor: "#F7F7F7",
      borderRadius: 20
    },

    buttonContainer:{
      width:'60%',
      height: 60,
      color: "#ffcb00",
      backgroundColor: '#000000',
      opacity: 0.7,
      borderRadius: 30,
      marginVertical:'5%'
    },
    
    buttonText: {
      width: "100%",
      color: "#ffcb00",
      fontSize: 20,
      marginTop: 14,
      textAlign: 'center'
    },
    
  });

export default CadastroScreen;