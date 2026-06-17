import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function ApiScreen() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://restcountries.com/v3.1/region/asia?fields=name,capital,population,flags,languages,currencies');
      if (!response.ok) {
        console.error('Error fetching data:', response.status);
        setError('Failed to fetch data');
        return;
      }
      const data = await response.json();
      setCountries(data.slice(0, 20));
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.flag}>{item.flags?.emoji || '🏳️'}</Text>
      <View style={styles.cardInfo}>
        <Text style={styles.countryName}>{item.name?.common}</Text>
        <Text style={styles.cardDetail}>🏙 {item.capital?.[0] || 'N/A'}</Text>
        <Text style={styles.cardDetail}>👥 {item.population?.toLocaleString()}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌐 Countries API</Text>
        <Text style={styles.headerSubtitle}>Asian Countries from REST Countries API</Text>
      </View>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text style={styles.loadingText}>Fetching countries...</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={fetchCountries}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={countries}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4ff' },
  header: { backgroundColor: '#6C63FF', padding: 20, paddingTop: 40, alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  headerSubtitle: { color: 'rgba(255,255,255,0.8)', marginTop: 4, fontSize: 13 },
  list: { padding: 16 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12, elevation: 2 },
  flag: { fontSize: 36, marginRight: 16 },
  cardInfo: { flex: 1 },
  countryName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardDetail: { fontSize: 13, color: '#666', marginTop: 2 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, color: '#666' },
  errorText: { color: 'red', fontSize: 16, marginBottom: 16 },
  retryBtn: { backgroundColor: '#6C63FF', padding: 12, borderRadius: 12 },
  retryText: { color: 'white', fontWeight: 'bold' },
});