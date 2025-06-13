import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave que vamos usar no AsyncStorage
const PETS_KEY = '@pets_data';

// Buscar todos os pets
export const getAllPets = async () => {
  try {
    const pets = await AsyncStorage.getItem(PETS_KEY);
    return pets ? JSON.parse(pets) : []; // se nada, um array vazio
  } catch (error) {
    console.error('Erro ao buscar pets!', error);
    return []; // fallback
  }
};

// Salvar um novo pet
export const savePet = async (newPet) => {
  try {
    const pets = await getAllPets();
    newPet.id = Date.now().toString();
    const updatedPets = [...pets, newPet];
    await AsyncStorage.setItem(PETS_KEY, JSON.stringify(updatedPets));
  } catch (error) {
    console.error('Erro ao salvar pet!', error);
  }
};
 
// Atualizar um pet existente
export const updatePet = async (updatedPet) => {
  try {
    const pets = await getAllPets();
    const updatedPets = pets.map((pet) =>
      pet.id === updatedPet.id ? updatedPet : pet
    );
    await AsyncStorage.setItem(PETS_KEY, JSON.stringify(updatedPets)); 
  } catch (error) {
    console.error('Erro ao atualizar pet!', error);
  }
};


// Remover um pet
export const deletePet = async (id) => {
  try {
    const pets = await getAllPets();
    const filtered = pets.filter((pet) => pet.id !== id);
    await AsyncStorage.setItem(PETS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Erro ao deletar pet!', error);
  }
};

// Agora o getPets faz exatamente o que o getAllPets faz
export async function getPets() {
  return await getAllPets();
}
