import React, { useEffect, useState } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';

export default function DashboardScreen() {
  const [dados, setDados] = useState({ labels: [], datasets: [{ data: [] }] });

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const petsSalvos = await AsyncStorage.getItem('@pets');
    const pets = petsSalvos ? JSON.parse(petsSalvos) : [];

    const contagem = {};
    pets.forEach(pet => {
      const tipo = pet.alimentacao || 'Não informado';
      contagem[tipo] = (contagem[tipo] || 0) + 1;
    });

    const labels = Object.keys(contagem);
    const data = Object.values(contagem);

    setDados({
      labels,
      datasets: [{ data }]
    });
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
        Pets por Tipo de Alimentação
      </Text>

      {dados.labels.length > 0 ? (
        <BarChart
          data={dados}
          width={Dimensions.get('window').width - 32}
          height={300}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#eee',
            backgroundGradientTo: '#ddd',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{
            borderRadius: 12,
          }}
        />
      ) : (
        <Text>Nenhum dado para exibir.</Text>
      )}
    </ScrollView>
  );
}
