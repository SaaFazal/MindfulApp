import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const meditations = [
  { id: '1', title: 'Morning Calm', duration: '10 min', category: 'Morning', emoji: '🌅', description: 'Start your day with peace and clarity. This meditation helps you set a positive intention for the day ahead.' },
  { id: '2', title: 'Stress Relief', duration: '15 min', category: 'Stress', emoji: '😮‍💨', description: 'Release tension and find your center. Perfect for when you feel overwhelmed or anxious.' },
  { id: '3', title: 'Deep Sleep', duration: '20 min', category: 'Sleep', emoji: '🌙', description: 'Drift into a restful sleep with guided breathing and body scan techniques.' },
  { id: '4', title: 'Focus Boost', duration: '12 min', category: 'Focus', emoji: '🎯', description: 'Sharpen your concentration and mental clarity for productive work sessions.' },
  { id: '5', title: 'Gratitude Practice', duration: '8 min', category: 'Gratitude', emoji: '🙏', description: 'Cultivate thankfulness and positive emotions with this heart-opening practice.' },
  { id: '6', title: 'Body Scan', duration: '18 min', category: 'Relaxation', emoji: '✨', description: 'A full body relaxation technique that releases tension from head to toe.' },
  { id: '7', title: 'Breathing Basics', duration: '5 min', category: 'Breathing', emoji: '🌬️', description: 'Learn fundamental breathing techniques to calm your nervous system instantly.' },
  { id: '8', title: 'Loving Kindness', duration: '14 min', category: 'Compassion', emoji: '💝', description: 'Develop compassion for yourself and others with this ancient loving-kindness practice.' },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { item })}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <Text style={styles.cardDuration}>⏱ {item.duration}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🧘 MindfulApp</Text>
        <Text style={styles.headerSubtitle}>Find your peace today</Text>
      </View>
      <FlatList
        data={meditations}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4ff' },
  header: { backgroundColor: '#6C63FF', padding: 20, paddingTop: 40, alignItems: 'center' },
  logo: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  headerSubtitle: { color: 'rgba(255,255,255,0.8)', marginTop: 4, fontSize: 14 },
  list: { padding: 16 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4 },
  emoji: { fontSize: 36, marginRight: 16 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardCategory: { fontSize: 13, color: '#6C63FF', marginTop: 2 },
  cardDuration: { fontSize: 12, color: '#999', marginTop: 2 },
  arrow: { fontSize: 24, color: '#6C63FF' },
});