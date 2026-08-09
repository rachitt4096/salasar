import { useRouter } from 'expo-router';
import { CalendarClock, IndianRupee, PackageCheck, Truck, UserRound } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { customerOrders, futureOrders, ownTruckLoads } from '@/constants/goods-data';
import { BottomTabInset, Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function GoodsScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();

  const visibleCustomers = customerOrders.slice(0, 3);
  const visibleFutureOrders = futureOrders.slice(0, 3);

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + Spacing.three, paddingBottom: insets.bottom + BottomTabInset + Spacing.four },
      ]}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <View>
            <ThemedText type="subtitle">Goods</ThemedText>
            <ThemedText themeColor="textSecondary">Customer demand and own truck movement.</ThemedText>
          </View>
        </View>

        <View style={styles.sectionRow}>
          <ThemedText style={styles.sectionTitle}>Customers</ThemedText>
          <Pressable onPress={() => router.push('/goods/customers')} hitSlop={10}>
            <ThemedText style={styles.viewAllText}>View all</ThemedText>
          </Pressable>
        </View>

        <View style={styles.customerList}>
          {visibleCustomers.map((order) => (
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

        <View style={styles.sectionRow}>
          <ThemedText style={styles.sectionTitle}>Future orders</ThemedText>
          <Pressable onPress={() => router.push('/goods/future-orders')} hitSlop={10}>
            <ThemedText style={styles.viewAllText}>View all</ThemedText>
          </Pressable>
        </View>

        <View style={styles.futureList}>
          {visibleFutureOrders.map((order) => (
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

        <View style={styles.sectionRow}>
          <ThemedText style={styles.sectionTitle}>Our trucks bringing goods</ThemedText>
          <ThemedText themeColor="textMuted" type="small">Updated now</ThemedText>
        </View>

        <View style={styles.loadList}>
          {ownTruckLoads.map((load) => (
            <ThemedView
              key={load.id}
              type="surface"
              style={[
                styles.loadCard,
                {
                  backgroundColor: `${load.color}18`,
                  borderColor: `${load.color}55`,
                  borderLeftColor: load.color,
                },
              ]}>
              <View style={styles.loadTop}>
                <View>
                  <ThemedText style={styles.loadId}>{load.id} · {load.tripId}</ThemedText>
                  <ThemedText style={styles.loadMaterial}>{load.material} · {load.qty}</ThemedText>
                </View>
                <View style={[styles.statusChip, { backgroundColor: `${load.color}1F` }]}>
                  <ThemedText style={[styles.statusText, { color: load.color }]}>{load.status}</ThemedText>
                </View>
              </View>

              <View style={styles.routeRow}>
                <Truck color={colors.textSecondary} size={15} strokeWidth={2.3} />
                <ThemedText numberOfLines={1} style={styles.routeText}>
                  {load.truck} · {load.driver}
                </ThemedText>
              </View>

              <View style={styles.routeRow}>
                <PackageCheck color={colors.textSecondary} size={15} strokeWidth={2.3} />
                <ThemedText numberOfLines={1} style={styles.routeText}>
                  {load.source} to {load.destination}
                </ThemedText>
              </View>

              <View style={styles.amountBreakdown}>
                <View style={styles.amountBox}>
                  <ThemedText style={styles.amountLabel}>Goods</ThemedText>
                  <ThemedText style={styles.amountText}>{load.goodsAmount}</ThemedText>
                </View>
                <View style={styles.amountBox}>
                  <ThemedText style={styles.amountLabel}>Transport</ThemedText>
                  <ThemedText style={styles.amountText}>{load.transportAmount}</ThemedText>
                </View>
                <View style={[styles.amountBox, { borderColor: `${load.color}55` }]}>
                  <ThemedText style={[styles.amountLabel, { color: load.color }]}>Total</ThemedText>
                  <View style={styles.totalAmountRow}>
                    <IndianRupee color={load.color} size={13} strokeWidth={2.4} />
                    <ThemedText style={[styles.amountText, { color: load.color }]}>{load.totalAmount}</ThemedText>
                  </View>
                </View>
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
    width: '100%',
  },
  container: {
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
  },
  viewAllText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 16,
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
  loadList: {
    gap: Spacing.two,
  },
  loadCard: {
    borderLeftWidth: 5,
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.two,
    padding: Spacing.two,
  },
  loadTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loadId: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 20,
  },
  loadMaterial: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
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
  totalAmountRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 1,
  },
  amountText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 16,
  },
});
