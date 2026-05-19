import React, { useState, useEffect } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { WebView } from "react-native-webview";
import NoInternet from "@/components/NoInternet";

export default function HomeScreen() {
  const [isConnected, setIsConnected] = useState(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const handleRetry = () => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
    });
  };

  return (
    <View style={styles.container}>
      {isConnected ? (
    <WebView
  key={key}
  source={{ uri: "https://protiidin.com" }}
  style={{ flex: 1 }}
  onError={() => setIsConnected(false)}
  automaticallyAdjustContentInsets={false}  
/>
      ) : (
        <NoInternet onRetry={handleRetry} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight, 
  },
});