
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

export default function GameCard({
  game,
  isFavorite,
  onFavorite,
  onPress,
}) {
  return (
    <View style={styles.card}>
      <Pressable
        style={styles.gameInfo}
        onPress={onPress}
      >
        <Text style={styles.emoji}>{game.emoji}</Text>

        <View style={styles.details}>
          <Text style={styles.title}>{game.name}</Text>
          <Text style={styles.category}>
            {game.category} • {game.year}
          </Text>
          <Text style={styles.description}>
            {game.description}
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={styles.favoriteButton}
        onPress={onFavorite}
      >
        <Text style={styles.favoriteText}>
          {isFavorite ? '❤️' : '🤍'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#27272a',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3f3f46',
  },
  gameInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 36,
    marginRight: 14,
  },
  details: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    color: '#c4b5fd',
    marginTop: 4,
  },
  description: {
    color: '#d4d4d8',
    marginTop: 6,
    fontSize: 13,
  },
  favoriteButton: {
    padding: 8,
    marginLeft: 6,
  },
  favoriteText: {
    fontSize: 23,
  },
});
