import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function DetailScreen({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('About');

  useEffect(() => {
    checkFavorite();
  }, []);

  const checkFavorite = async () => {
    const stored = await AsyncStorage.getItem('favorites');
    if (stored) {
      const favs = JSON.parse(stored);
      setIsFavorite(favs.some(f => f.id === item.id));
    }
  };

  const toggleFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem('favorites');
      let favs = stored ? JSON.parse(stored) : [];
      if (isFavorite) {
        favs = favs.filter(f => f.id !== item.id);
        Alert.alert('Removed', 'Removed from favorites');
      } else {
        favs.push(item);
        Alert.alert('Added', 'Added to favorites!');
      }
      await AsyncStorage.setItem('favorites', JSON.stringify(favs));
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favBtn}>
          <Text style={styles.favText}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>{item.emoji}</Text>
        <Text style={styles.heroTitle}>{item.title}</Text>
        <Text style={styles.heroDuration}>⏱ {item.duration} • {item.category}</Text>
      </View>

      <View style={styles.tabs}>
        {['About', 'Instructions'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {activeTab === 'About' ? (
          <View>
            <Text style={styles.contentTitle}>About this meditation</Text>
            <Text style={styles.contentText}>{item.description}</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoItem}>🎯 Category: {item.category}</Text>
              <Text style={styles.infoItem}>⏱ Duration: {item.duration}</Text>
              <Text style={styles.infoItem}>📊 Level: Beginner friendly</Text>
              <Text style={styles.infoItem}>🌟 Benefits: Stress relief, Focus, Calm</Text>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.contentTitle}>How to practice</Text>
            <Text style={styles.step}>1. Find a quiet, comfortable place to sit or lie down.</Text>
            <Text style={styles.step}>2. Close your eyes and take three deep breaths.</Text>
            <Text style={styles.step}>3. Allow your body to relax with each exhale.</Text>
            <Text style={styles.step}>4. Focus your attention on your breath or the guided audio.</Text>
            <Text style={styles.step}>5. When your mind wanders, gently bring it back.</Text>
            <Text style={styles.step}>6. Continue for the full {item.duration} session.</Text>
            <Text style={styles.step}>7. End by slowly opening your eyes and stretching.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4ff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, paddingTop: 50 },
  backBtn: { backgroundColor: 'white', padding: 10, borderRadius: 20 },
  backText: { color: '#6C63FF', fontWeight: '600' },
  favBtn: { backgroundColor: 'white', padding: 10, borderRadius: 20 },
  favText: { fontSize: 20 },
  hero: { alignItems: 'center', padding: 24 },
  heroEmoji: { fontSize: 80, marginBottom: 16 },
  heroTitle: { fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  heroDuration: { fontSize: 14, color: '#6C63FF', marginTop: 8 },
  tabs: { flexDirection: 'row', margin: 16, backgroundColor: 'white', borderRadius: 12, padding: 4 },
  tab: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 10 },
  activeTab: { backgroundColor: '#6C63FF' },
  tabText: { color: '#666', fontWeight: '600' },
  activeTabText: { color: 'white' },
  content: { margin: 16, backgroundColor: 'white', borderRadius: 16, padding: 16 },
  contentTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  contentText: { fontSize: 15, color: '#555', lineHeight: 24 },
  infoCard: { marginTop: 16, backgroundColor: '#f0f4ff', borderRadius: 12, padding: 16 },
  infoItem: { fontSize: 14, color: '#555', marginBottom: 8 },
  step: { fontSize: 15, color: '#555', lineHeight: 26, marginBottom: 8 },
});