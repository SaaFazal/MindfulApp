import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Switch, ScrollView, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const [enabled, setEnabled] = useState(true);
  const [morningReminder, setMorningReminder] = useState(true);
  const [eveningReminder, setEveningReminder] = useState(false);
  const [streakAlerts, setStreakAlerts] = useState(true);

  useEffect(() => {
    loadSettings();
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please enable notifications in your settings.');
    }
  };

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem('notificationSettings');
      if (stored) {
        const settings = JSON.parse(stored);
        setEnabled(settings.enabled ?? true);
        setMorningReminder(settings.morningReminder ?? true);
        setEveningReminder(settings.eveningReminder ?? false);
        setStreakAlerts(settings.streakAlerts ?? true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      await AsyncStorage.setItem('notificationSettings', JSON.stringify(newSettings));
    } catch (err) {
      console.log(err);
    }
  };

  const sendTestNotification = async () => {
    try {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🧘 MindfulApp',
          body: 'Time for your daily meditation session!',
          data: { screen: 'Home' },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 2,
          channelId: 'default',
        },
      });
      Alert.alert('Success', 'Test notification sent! Check your notifications in 2 seconds.');
    } catch (err) {
      Alert.alert('Error', 'Could not send notification: ' + err.message);
    }
  };

  const toggleSetting = (key, value) => {
    const newSettings = { enabled, morningReminder, eveningReminder, streakAlerts, [key]: value };
    saveSettings(newSettings);
    if (key === 'enabled') setEnabled(value);
    if (key === 'morningReminder') setMorningReminder(value);
    if (key === 'eveningReminder') setEveningReminder(value);
    if (key === 'streakAlerts') setStreakAlerts(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🔔 Notifications</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notification Settings</Text>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Enable Notifications</Text>
              <Text style={styles.settingSubLabel}>Turn all notifications on or off</Text>
            </View>
            <Switch
              value={enabled}
              onValueChange={(v) => toggleSetting('enabled', v)}
              trackColor={{ false: '#ccc', true: '#6C63FF' }}
              thumbColor="white"
            />
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Morning Reminder</Text>
              <Text style={styles.settingSubLabel}>Daily at 8:00 AM</Text>
            </View>
            <Switch
              value={morningReminder}
              onValueChange={(v) => toggleSetting('morningReminder', v)}
              trackColor={{ false: '#ccc', true: '#6C63FF' }}
              thumbColor="white"
              disabled={!enabled}
            />
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Evening Reminder</Text>
              <Text style={styles.settingSubLabel}>Daily at 8:00 PM</Text>
            </View>
            <Switch
              value={eveningReminder}
              onValueChange={(v) => toggleSetting('eveningReminder', v)}
              trackColor={{ false: '#ccc', true: '#6C63FF' }}
              thumbColor="white"
              disabled={!enabled}
            />
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Streak Alerts</Text>
              <Text style={styles.settingSubLabel}>Get notified about your streak</Text>
            </View>
            <Switch
              value={streakAlerts}
              onValueChange={(v) => toggleSetting('streakAlerts', v)}
              trackColor={{ false: '#ccc', true: '#6C63FF' }}
              thumbColor="white"
              disabled={!enabled}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.testBtn} onPress={sendTestNotification}>
          <Text style={styles.testBtnText}>🔔 Send Test Notification</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>Tap the button above to test if notifications are working on your device.</Text>
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
  card: { backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  settingLabel: { fontSize: 16, color: '#333', fontWeight: '500' },
  settingSubLabel: { fontSize: 12, color: '#999', marginTop: 2 },
  testBtn: { backgroundColor: '#6C63FF', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  testBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  hint: { fontSize: 13, color: '#999', textAlign: 'center' },
});