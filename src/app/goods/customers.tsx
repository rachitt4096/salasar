import { useRouter } from 'expo-router';
import { ArrowLeft, Truck, UserRound } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { customerOrders } from '@/constants/goods-data';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function GoodsCustomersScreen() {
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
            <ThemedText type="subtitle">Customers</ThemedText>
            <ThemedText themeColor="textSecondary">All material demand.</ThemedText>
          </View>
        </View>

        <View style={styles.customerList}>
          {customerOrders.map((order) => (
            <Pressable
              key={order.customer}
              onPress={() => router.push(`/goods/customer/${order.id}`)}
              style={({ pressed }) => pressed && styles.pressed}>
              <ThemedView
              type="surface"
              style={[
                styles.customerCard,
                { backgroundColor: `${order.color}12`, borderColor: `${order.color}55` },
              ]}>
              <View style={styles.customerTop}>
                <View style={styles.customerNameRow}>
                  <UserRound color={order.color} size={16} strokeWidth={2.4} />
                  <ThemedText numberOfLines={1} style={styles.customerName}>
                    {order.customer}
                  </ThemedText>
                </View>
                <View style={[styles.statusChip, { backgroundColor: `${order.color}1F` }]}>
                  <ThemedText style={[styles.statusText, { color: order.color }]}>{order.needBy}</ThemedText>
                </View>
              </View>

              <View style={styles.demandRow}>
                <ThemedText style={[styles.demandText, { color: order.color }]}>
                  {order.wants} · {order.qty}
                </ThemedText>
                <View style={styles.moneyColumn}>
                  <ThemedText style={order.remaining === '₹0' ? styles.settledText : styles.pendingText}>
                    {order.pending}
                  </ThemedText>
                  <ThemedText style={styles.remainingText}>
                    {order.remaining === '₹0' ? 'Settled' : 'Remaining'}
                  </ThemedText>
                </View>
              </View>

              <ThemedText numberOfLines={1} themeColor="textSecondary" type="small">
                {order.site}
              </ThemedText>

              <View style={styles.routeRow}>
                <Truck color={colors.textSecondary} size={14} strokeWidth={2.3} />
                <ThemedText numberOfLines={1} style={styles.routeText}>
                  {order.truck} · Goods {order.goodsAmount} · Transport {order.transportAmount}
                </ThemedText>
              </View>
            </ThemedView>
            </Pressable>
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
  customerList: {
    gap: Spacing.two,
  },
  customerCard: {
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.one,
    padding: Spacing.two,
  },
  pressed: {
    opacity: 0.72,
  },
  customerTop: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.one,
    justifyContent: 'space-between',
  },
  customerNameRow: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: Spacing.one,
  },
  customerName: {
    color: colors.text,
    flex: 1,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 18,
  },
  demandRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  demandText: {
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 19,
  },
  pendingText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 17,
  },
  moneyColumn: {
    alignItems: 'flex-end',
  },
  remainingText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    lineHeight: 13,
  },
  settledText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 17,
  },
  routeRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.one,
  },
  routeText: {
    color: colors.textSecondary,
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  amountBreakdown: {
    flexDirection: 'row',
    gap: Spacing.one,
  },
  amountBox: {
    backgroundColor: '#FFFFFF99',
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    gap: 1,
    paddingHorizontal: Spacing.one,
    paddingVertical: Spacing.one,
  },
  amountLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    lineHeight: 13,
  },
  amountText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 16,
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
