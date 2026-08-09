import { useRouter } from 'expo-router';
import { ArrowLeft, CalendarClock } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { futureOrders } from '@/constants/goods-data';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function GoodsFutureOrdersScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + Spacing.three }]}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color={colors.primary} size={20} strokeWidth={2.6} />
          </Pressable>
          <View style={styles.headerText}>
            <ThemedText type="subtitle">Future orders</ThemedText>
            <ThemedText themeColor="textSecondary">Upcoming customer material demand.</ThemedText>
          </View>
        </View>

        <View style={styles.futureList}>
          {futureOrders.map((order) => (
            <ThemedView
              key={`${order.customer}-${order.date}`}
              type="surface"
              style={[styles.futureCard, { borderColor: `${order.color}55` }]}>
              <View style={styles.futureMain}>
                <View style={[styles.futureIcon, { backgroundColor: `${order.color}18` }]}>
                  <CalendarClock color={order.color} size={16} strokeWidth={2.4} />
                </View>
                <View style={styles.futureInfo}>
                  <ThemedText numberOfLines={1} style={styles.futureCustomer}>{order.customer}</ThemedText>
                  <ThemedText style={[styles.futureNeed, { color: order.color }]}>
                    {order.wants} · {order.qty}
                  </ThemedText>
                </View>
              </View>
              <View style={[styles.statusChip, { backgroundColor: `${order.color}1F` }]}>
                <ThemedText style={[styles.statusText, { color: order.color }]}>{order.date}</ThemedText>
              </View>
            </ThemedView>
          ))}
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const colors = Colors.light;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    paddingBottom: Spacing.four,
    width: '100%',
  },
  container: {
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.two,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: colors.backgroundSelected,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  headerText: {
    flex: 1,
  },
  futureList: {
    gap: Spacing.two,
  },
  futureCard: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.two,
  },
  futureMain: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: Spacing.two,
  },
  futureIcon: {
    alignItems: 'center',
    borderRadius: 8,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  futureInfo: {
    flex: 1,
  },
  futureCustomer: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 16,
  },
  futureNeed: {
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 18,
  },
  statusChip: {
    borderRadius: 8,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 16,
  },
});
