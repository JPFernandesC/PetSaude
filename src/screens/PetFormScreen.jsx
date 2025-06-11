import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { savePet } from '../services/petService';
import { useNavigation } from '@react-navigation/native';
import { MaskedTextInput } from 'react-native-mask-text';

export default function PetFormScreen() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [tipo, setTipo] = useState('');
  const [raca, setRaca] = useState('');
  const [telefone, setTelefone] = useState('');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!nome) newErrors.nome = 'Nome é obrigatório';
    if (!idade) newErrors.idade = 'Idade é obrigatória';
    if (!tipo) newErrors.tipo = 'Tipo é obrigatório';
    if (!raca) newErrors.raca = 'Raça é obrigatória';
    if (!telefone || telefone.length < 14) newErrors.telefone = 'Telefone inválido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validate()) {
      await savePet({ nome, idade, tipo, raca, telefone });
      navigation.goBack();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.title}>Cadastrar Pet</Text>

      <TextInput
        label="Nome"
        value={nome}
        onChangeText={setNome}
        error={!!errors.nome}
        mode="outlined"
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.nome}>{errors.nome}</HelperText>

      <TextInput
        label="Idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
        error={!!errors.idade}
        mode="outlined"
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.idade}>{errors.idade}</HelperText>

      <TextInput
        label="Tipo (Ex: Cachorro, Gato)"
        value={tipo}
        onChangeText={setTipo}
        error={!!errors.tipo}
        mode="outlined"
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.tipo}>{errors.tipo}</HelperText>

      <TextInput
        label="Raça"
        value={raca}
        onChangeText={setRaca}
        error={!!errors.raca}
        mode="outlined"
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.raca}>{errors.raca}</HelperText>

      <MaskedTextInput
        mask="(99) 99999-9999"
        value={telefone}
        onChangeText={(text) => setTelefone(text)}
        keyboardType="numeric"
        style={[styles.input, { borderColor: errors.telefone ? 'red' : '#ccc', borderWidth: 1, borderRadius: 5, padding: 10 }]}
        placeholder="Telefone"
      />
      {errors.telefone && <Text style={styles.errorText}>{errors.telefone}</Text>}

      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Salvar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});
