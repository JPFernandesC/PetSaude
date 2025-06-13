
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import PetsScreen from './screens/PetsScreen';
import PetFormScreen from './screens/PetFormScreen';
import DashboardScreen from './screens/DashboardScreen';

const Stack = createBottomTabNavigator();

function PetsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pets" component={PetsScreen} />
      <Stack.Screen name="PetForm" component={PetFormScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          
          let iconName;

          if (route.name === 'Inicio') iconName = 'home';
          else if (route.name === 'Pets') iconName = 'dog';
          else if (route.name === 'Dashboard') iconName = 'view-dashboard';

          return ( 
            <MaterialCommunityIcons 
              name={iconName} 
              size={size} 
              color={color} 
            />
          );
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Pets" component={PetsStack} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
    </Tab.Navigator>
  );
}

