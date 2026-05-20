import React, { useState, useEffect, useRef } from "react";
import {
  useColorScheme,
  StatusBar,
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import NetInfo from "@react-native-community/netinfo";
import { WebView } from "react-native-webview";

import NoInternet from "@/components/NoInternet";


export default function TabLayout() {
  const colorScheme = useColorScheme();

  const webViewRef = useRef(null);

  const [isConnected, setIsConnected] = useState(true);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  // Retry internet
  const handleRetry = () => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected ?? false);

      if (state.isConnected) {
        webViewRef.current?.reload();
      }
    });
  };

  // Pull to refresh
  const onRefresh = () => {
    setRefreshing(true);

    webViewRef.current?.reload();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider
        value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <View style={styles.container}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />

          {/* Status bar background */}
          <View
            style={{
              height: StatusBar.currentHeight || 0,
              backgroundColor: "#005539",
            }}
          />

          {isConnected ? (
            <>
              {loading && (
                <View
                  style={styles.loader}>
                
                    <ActivityIndicator size={70} color="#fff" />
                  
                
                </View>
              )}

              <WebView
                ref={webViewRef}
                source={{ uri: "https://protiidin.com" }}
                style={{ flex: 1 }}

                // Loading
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => {
                  setLoading(false);
                  setRefreshing(false);
                }}

                // Error
                onError={() => setIsConnected(false)}

                // Pull to refresh
                pullToRefreshEnabled={true}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }

                // Open all href inside app
                setSupportMultipleWindows={false}

                automaticallyAdjustContentInsets={false}
              />
            </>
          ) : (
            <NoInternet onRetry={handleRetry} />
          )}
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});