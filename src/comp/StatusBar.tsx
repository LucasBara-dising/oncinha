// src/components/PlayerHUD.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type Props = {
  iconName: string;
  iconColor: string;
  value: number;
  percentage: number;
  barColor: string;
  trackColor: string;
};

// Componente reutilizável para as barras de status (Energia e Vida)
const StatusBar : React.FC<Props> = ({ iconName, iconColor, value, percentage, barColor, trackColor }: Props) => {
//const StatusBar : React.FC<Props> = ({value, percentage, barColor, trackColor }) => {
  return (
    <View style={[styles.statusBarContainer, { backgroundColor: trackColor }]}>
      {/* View para a parte preenchida da barra */}
     <View style={[styles.filledBar, { width: `${percentage}%`, backgroundColor: barColor }]}>
        {/* Conteúdo dentro da barra (ícone e texto) */}
        <View style={styles.barContent}>
          {/* <Icon name={iconName} size={20} color={iconColor} /> */}
          <Text style={styles.statusText}>{value}</Text>
        </View>
      </View>
    </View>
  );
};


// Estilos externos para melhor organização
const styles = StyleSheet.create({
  statusBarContainer: {
    height: 25,
    borderRadius: 15,
    marginVertical: 5,
    backgroundColor: '#ddd', // Cor de fundo (trilha)
    overflow: 'hidden', // Essencial para que a barra interna não ultrapasse as bordas
  },
  filledBar: {
    height: '100%',
    borderRadius: 15,
  },
  barContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: '100%',
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default StatusBar;