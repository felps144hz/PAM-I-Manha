import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import RotinaScreen from '../screens/RotinaScreen';
import SobreScreen from '../screens/SobreScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2563eb',
        },
        headerTintColor: '#fff',
      }}
    >

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Minha Rotina' }}
      />

      <Stack.Screen
        name="Rotina"
        component={RotinaScreen}
        options={{ title: 'Minha Rotina' }}
      />

      <Stack.Screen
        name="Sobre"
        component={SobreScreen}
        options={{ title: 'Sobre o App' }}
      />

    </Stack.Navigator>
  );
}