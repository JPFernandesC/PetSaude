import React, { useCallback, useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { FAB, IconButton } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import PetCard from '../components/PetCard';
import { getAllPets, deletePet } from '../services/petService';

export default function PetsScreen() {
  const [pets, setPets] = useState([]);
  const navigation = useNavigation();

  
  useFocusEffect(
    useCallback(() => {
      loadPets();
    }, [])
  );

  const loadPets = async () => {
    const data = await getAllPets();
    setPets(data);
  };

  const handleEdit = (pet) => {

    navigation.navigate('PetForm', { pet });
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja excluir o pet?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            await deletePet(id);
            loadPets();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PetCard
            pet={item}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        )}

        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        label="Novo Pet"
        onPress={() => navigation.navigate('PetForm')}
      />
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    padding: 16,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
