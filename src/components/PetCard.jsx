import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

export default function PetCard({ pet }) {
  return (
    <Card style={styles.card}>
      <Card.Title title={pet.nome} subtitle={`Raça: ${pet.raca}`} />
      <Card.Content>
        <Text>Idade: {pet.idade}</Text>
        <Text>Tipo: {pet.tipo}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
});
