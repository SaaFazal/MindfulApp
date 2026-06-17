import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const menuItems = [
  { icon: '👤', label: 'Profile Settings', route: 'SettingsScreen' },
  { icon: '🔔', label: 'Notifications', route: 'Notifications' },
  { icon: '🎨', label: 'Theme', route: null },
  { icon: '🔒', label: 'Privacy', route: null },
  { icon: '❓', label: 'Help & Support', route: null },
  { icon: '📋', label: 'About', route: null },
];

export default function SettingsMenuScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('user');
          Alert.alert('Logged out successfully');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚙️ Settings</Text>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              if (item.route) navigation.navigate(item.route);
              else Alert.alert(item.label, 'Coming soon!');
            }}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4ff' },
  header: { backgroundColor: '#6C63FF', padding: 20, paddingTop: 40, alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  menu: { margin: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 8, elevation: 1 },
  menuIcon: { fontSize: 22, marginRight: 16 },
  menuLabel: { flex: 1, fontSize: 16, color: '#333' },
  menuArrow: { fontSize: 20, color: '#6C63FF' },
  logoutBtn: { margin: 16, backgroundColor: 'white', borderWidth: 1, borderColor: '#FF4444', borderRadius: 12, padding: 16, alignItems: 'center' },
  logoutText: { color: '#FF4444', fontSize: 16, fontWeight: '600' },
});