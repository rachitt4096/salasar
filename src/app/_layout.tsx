import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="trip/completed" />
        <Stack.Screen name="trip/new" />
        <Stack.Screen name="trip/[id]" />
        <Stack.Screen name="vehicle/[id]" />
        <Stack.Screen name="goods/customers" />
        <Stack.Screen name="goods/future-orders" />
        <Stack.Screen name="goods/customer/[customerId]" />
        <Stack.Screen name="goods/order/[orderId]" />
      </Stack>
    </ThemeProvider>
  );
}
