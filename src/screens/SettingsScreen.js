import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const stored = await AsyncStorage.getItem('user');
      if (stored) {
        const user = JSON.parse(stored);
        setUsername(user.username || '');
        setEmail(user.email || '');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    if (!username || !email) {
      Alert.alert('Error', 'Fields cannot be empty');
      return;
    }
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem('user');
      const user = stored ? JSON.parse(stored) : {};
      const updated = { ...user, username, email };
      await AsyncStorage.setItem('user', JSON.stringify(updated));
      Alert.alert('Success', 'Profile updated!');
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Settings</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.avatarSection}>
          <Text style={styles.avatar}>👤</Text>
          <Text style={styles.avatarName}>{username || 'User'}</Text>
        </View>

        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Enter username" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter email" autoCapitalize="none" keyboardType="email-address" />

        <Text style={styles.emailDisplay}>Logged in as: {email}</Text>

        <TouchableOpacity style={[styles.saveBtn, loading && styles.disabled]} onPress={handleSave} disabled={loading}>
          <Text style={styles.saveBtnText}>{loading ? 'Saving...' : 'Save Changes'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4ff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#6C63FF', padding: 16, paddingTop: 40 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  backBtn: { padding: 8 },
  backText: { color: 'white', fontSize: 16 },
  scroll: { padding: 16 },
  avatarSection: { alignItems: 'center', marginBottom: 24 },
  avatar: { fontSize: 80 },
  avatarName: { fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 8 },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 8 },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 16, marginBottom: 16, fontSize: 16 },
  emailDisplay: { fontSize: 13, color: '#999', marginBottom: 24 },
  saveBtn: { backgroundColor: '#6C63FF', padding: 16, borderRadius: 12, alignItems: 'center' },
  disabled: { opacity: 0.7 },
  saveBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});