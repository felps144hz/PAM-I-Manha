
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';

import GameCard from '../components/GameCard';

export default function HomeScreen({
  games,
  favorites,
  onFavorite,
  onAddGame,
  onSelectGame,
  onProfile,
  onFavorites,
}) {
  const [search, setSearch] = useState('');

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase()) ||
    game.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🎮 GameHub</Text>
      <Text style={styles.subtitle}>
        Seu universo de jogos
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Pesquisar jogos..."
        placeholderTextColor="#a1a1aa"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.actions}>
        <Pressable style={styles.action} onPress={onAddGame}>
          <Text style={styles.actionText}>＋ Adicionar</Text>
        </Pressable>

        <Pressable style={styles.action} onPress={onFavorites}>
          <Text style={styles.actionText}>
            ❤️ Favoritos ({favorites.length})
          </Text>
        </Pressable>

        <Pressable style={styles.action} onPress={onProfile}>
          <Text style={styles.actionText}>👤 Perfil</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>
        Minha coleção ({filteredGames.length})
      </Text>

      <FlatList
        data={filteredGames}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameCard
            game={item}
            isFavorite={favorites.includes(item.id)}
            onFavorite={() => onFavorite(item.id)}
            onPress={() => onSelectGame(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhum jogo encontrado.
          </Text>
        }
        contentContainerStyle={styles.list}
      />
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
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#d4d4d8',
    marginTop: 5,
    marginBottom: 20,
  },
  search: {
    backgroundColor: '#27272a',
    color: '#ffffff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#52525b',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  action: {
    backgroundColor: '#6d28d9',
    padding: 10,
    borderRadius: 8,
  },
  actionText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  list: {
    paddingBottom: 20,
  },
  empty: {
    color: '#d4d4d8',
    textAlign: 'center',
    marginTop: 30,
  },
});
