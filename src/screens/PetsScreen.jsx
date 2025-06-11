import React, { useCallback, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import PetCard from '../components/PetCard';
import { getAllPets } from '../services/petService';

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

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PetCard pet={item} />}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('PetForm')}
        label="Novo Pet"
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
