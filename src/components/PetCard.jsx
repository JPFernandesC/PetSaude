// src/components/PetCard.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

export default function PetCard({ pet, onEdit, onDelete }) {
  return (
    <Card style={styles.card}>
      <Card.Title title={pet.nome} subtitle={`${pet.tipo} - ${pet.raca}`} />

      <Card.Actions>
        <IconButton icon="pencil" onPress={onEdit} />
        <IconButton icon="delete" onPress={onDelete} color="#d32f2f" />
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({ 
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#fff',
  },
});
