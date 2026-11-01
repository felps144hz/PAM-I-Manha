
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import initialGames from './data/games';

import HomeScreen from './screens/HomeScreen';
import AddGameScreen from './screens/AddGameScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import ProfileScreen from './screens/ProfileScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [games, setGames] = useState(initialGames);
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(gameId) {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(gameId)) {
        return currentFavorites.filter((id) => id !== gameId);
      }

      return [...currentFavorites, gameId];
    });
  }

  function addGame(game, navigation) {
    setGames((currentGames) => [game, ...currentGames]);
    navigation.navigate('Início');
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Início"
        screenOptions={{
          headerStyle: { backgroundColor: '#27272a' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#18181b' },
        }}
      >
        <Stack.Screen name="Início">
          {(props) => (
            <HomeScreen
              {...props}
              games={games}
              favorites={favorites}
              onFavorite={toggleFavorite}
              onAddGame={() => props.navigation.navigate('Adicionar jogo')}
              onFavorites={() => props.navigation.navigate('Favoritos')}
              onProfile={() => props.navigation.navigate('Perfil')}
              onSelectGame={(game) =>
                props.navigation.navigate('Detalhes', { gameId: game.id })
              }
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Adicionar jogo">
          {(props) => (
            <AddGameScreen
              {...props}
              onAdd={(game) => addGame(game, props.navigation)}
              onBack={() => props.navigation.goBack()}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Favoritos">
          {(props) => (
            <FavoritesScreen
              {...props}
              games={games}
              favorites={favorites}
              onFavorite={toggleFavorite}
              onSelectGame={(game) =>
                props.navigation.navigate('Detalhes', { gameId: game.id })
              }
              onBack={() => props.navigation.navigate('Início')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Perfil">
          {(props) => (
            <ProfileScreen
              {...props}
              gamesCount={games.length}
              favoritesCount={favorites.length}
              onBack={() => props.navigation.navigate('Início')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Detalhes">
          {(props) => {
            const game = games.find(
              (item) => item.id === props.route.params.gameId
            );

            if (!game) {
              return null;
            }

            return (
              <DetailsScreen
                game={game}
                isFavorite={favorites.includes(game.id)}
                onFavorite={() => toggleFavorite(game.id)}
                onBack={() => props.navigation.goBack()}
              />
            );
          }}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
