import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { getPets } from '../services/petService';

export default function HomeScreen() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getPets();
      setPets(data);
    }
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <Card style={{ marginVertical: 6 }}>
      <Card.Content>
        <Title>{item.nome}</Title>
        <Paragraph>Tipo: {item.tipo}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Cabeçalho de boas-vindas */}
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Avatar.Icon size={100} icon="paw" />
        <Text variant="headlineMedium" style={{ marginTop: 20 }}>
          Bem-vindo ao PetSaúde!
        </Text>
        <Text variant="bodyMedium" style={{ marginTop: 10, textAlign: 'center' }}>
          Gerencie a saúde e os dados dos seus animais de estimação.
        </Text>
      </View>

      {/* Lista de pets */}
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
