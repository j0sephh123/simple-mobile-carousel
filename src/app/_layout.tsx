import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    "Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../../assets/fonts/Inter-Medium.ttf"),
    "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
  });

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 30, // 30 minutes
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
          },
        },
      })
  );

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={DarkTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(stack)/movie/[id]"
              options={{
                headerShown: true,
                headerBackTitle: "Back",
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="light" />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
