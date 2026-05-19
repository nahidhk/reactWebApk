import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { useColorScheme, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from '.';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <StatusBar 
        translucent={true} 
        backgroundColor="transparent" 
      />
      {/* Status bar এর জায়গায় website এর header color দাও */}
      <View style={{ 
        height: StatusBar.currentHeight, 
        backgroundColor: '#1a472a'  // Protiidin এর dark green color
      }} />
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <HomeScreen />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}