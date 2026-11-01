
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';

import GameCard from '../components/GameCard';

export default function FavoritesScreen({
  games,
  favorites,
  onFavorite,
  onSelectGame,
  onBack,
}) {
  const favoriteGames = games.filter((game) =>
    favorites.includes(game.id)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>❤️ Favoritos</Text>

      <FlatList
        style={styles.list}
        data={favoriteGames}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameCard
            game={item}
            isFavorite
            onFavorite={() => onFavorite(item.id)}
            onPress={() => onSelectGame(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Você ainda não favoritou nenhum jogo.
          </Text>
        }
      />

      <Pressable style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}>Voltar ao início</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181b',
    padding: 20,
    paddingTop: 45,
  },
  heading: {
    color: '#a78bfa',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  empty: {
    color: '#d4d4d8',
    textAlign: 'center',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#6d28d9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
