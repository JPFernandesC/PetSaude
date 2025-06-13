import React from 'react';
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/stack"
import AppNavigator from './src/AppNavigator';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
