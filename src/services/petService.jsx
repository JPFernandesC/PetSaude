import AsyncStorage from '@react-native-async-storage/async-storage';


const PETS_KEY = '@pets_data';


export const getAllPets = async () => {
  try {
    const pets = await AsyncStorage.getItem(PETS_KEY);
    return pets ? JSON.parse(pets) : []; 
  } catch (error) {
    console.error('Erro ao buscar pets!', error);
    return [];
  }
};


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



export const deletePet = async (id) => {
  try {
    const pets = await getAllPets();
    const filtered = pets.filter((pet) => pet.id !== id);
    await AsyncStorage.setItem(PETS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Erro ao deletar pet!', error);
  }
};


export async function getPets() {
  return await getAllPets();
}
