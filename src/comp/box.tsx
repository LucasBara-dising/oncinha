import React from 'react';
import {
Pressable,
  StyleSheet,
  Text,
  Image
} from 'react-native';


  export type BtnProps = {
    onPress: () => void;
    textbtn: string;
    imgBtn: any
  };



const BtnIcon: React.FC<BtnProps> = ({onPress, textbtn, imgBtn}: BtnProps) => (
    <Pressable
        style={styles.buttonContainer} 
        onPressIn={onPress}>
        <Image 
        style={styles.img} 
        source={imgBtn} />
        <Text style={styles.buttonText}> {textbtn} </Text>
    </Pressable>
);


const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20
      },

      img: {
        width: 80,
        height: 80,
      },

      buttonText: {
        color: 'white',
        fontSize: 20,
      },
});

export default BtnIcon;