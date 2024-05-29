import { DarkTheme, DefaultTheme, ThemeProvider as RNThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PaperProvider } from 'react-native-paper';
import { store } from './store'
import { Provider } from 'react-redux'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


// Create a client
const queryClient = new QueryClient()

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <QueryClientProvider client={queryClient}>
          <RNThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="index"
                options={{ headerTitle: "React native community" }}
              />
              <Stack.Screen name="detail/[name]"
                options={{ headerTitle: "Repository Detail" }}
              />
              <Stack.Screen name="search"
                options={{ headerTitle: "Search" }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </RNThemeProvider>
        </QueryClientProvider>
      </PaperProvider>
    </Provider>
  );
}
