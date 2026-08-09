import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Building2, IndianRupee, Phone, ReceiptText, UserRound } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getGoodsCustomer } from '@/constants/goods-data';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function GoodsCustomerDetailScreen() {
  const { customerId } = useLocalSearchParams<{ customerId: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const theme = useTheme();
  const customer = getGoodsCustomer(customerId);

  if (!customer) {
    return (
      <ThemedView style={[styles.emptyScreen, { paddingTop: insets.top + Spacing.three }]}>
        <ThemedText type="subtitle">Customer not found</ThemedText>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={colors.primary} size={20} strokeWidth={2.6} />
        </Pressable>
      </ThemedView>
    );
  }

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
            <ThemedText type="subtitle">{customer.name}</ThemedText>
            <ThemedText themeColor="textSecondary">{customer.currentDemand}</ThemedText>
          </View>
        </View>

        <ThemedView type="surface" style={[styles.profileCard, { borderColor: `${customer.color}55` }]}>
          <View style={styles.infoRow}>
            <Building2 color={customer.color} size={16} strokeWidth={2.4} />
            <ThemedText style={styles.infoText}>{customer.company}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <UserRound color={customer.color} size={16} strokeWidth={2.4} />
            <ThemedText style={styles.infoText}>{customer.contact}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <Phone color={customer.color} size={16} strokeWidth={2.4} />
            <ThemedText style={styles.infoText}>{customer.phone}</ThemedText>
          </View>
          <ThemedText themeColor="textSecondary" type="small">{customer.address}</ThemedText>
        </ThemedView>

        <View style={styles.moneyGrid}>
          <ThemedView type="surface" style={styles.moneyCard}>
            <ThemedText style={styles.moneyValue}>{customer.totalBusiness}</ThemedText>
            <ThemedText themeColor="textSecondary" type="small">Total orders</ThemedText>
          </ThemedView>
          <ThemedView type="surface" style={styles.moneyCard}>
            <ThemedText style={styles.moneyValue}>{customer.paidTotal}</ThemedText>
            <ThemedText themeColor="textSecondary" type="small">Paid</ThemedText>
          </ThemedView>
          <ThemedView type="surface" style={styles.moneyCard}>
            <ThemedText style={customer.collectTotal === '₹0' ? styles.greyMoney : styles.collectMoney}>
              {customer.collectTotal}
            </ThemedText>
            <ThemedText style={styles.greyLabel}>Remaining</ThemedText>
          </ThemedView>
        </View>

        <View style={styles.sectionRow}>
          <ThemedText style={styles.sectionTitle}>Order history</ThemedText>
          <ThemedText themeColor="textMuted" type="small">{customer.orders.length} orders</ThemedText>
        </View>

        <View style={styles.orderList}>
          {customer.orders.map((order) => (
            <Pressable
              key={order.id}
              onPress={() => router.push(`/goods/order/${order.id}`)}
              style={({ pressed }) => pressed && styles.pressed}>
              <ThemedView
                type="surface"
                style={[styles.orderCard, { backgroundColor: `${order.color}12`, borderColor: `${order.color}55` }]}>
                <View style={styles.orderTop}>
                  <View style={styles.orderTitleRow}>
                    <ReceiptText color={order.color} size={16} strokeWidth={2.4} />
                    <ThemedText style={styles.orderId}>{order.id}</ThemedText>
                  </View>
                  <View style={[styles.statusChip, order.status === 'Paid' ? styles.paidChip : styles.partialChip]}>
                    <ThemedText style={order.status === 'Paid' ? styles.paidText : styles.partialText}>
                      {order.status}
                    </ThemedText>
                  </View>
                </View>
                <ThemedText style={[styles.orderNeed, { color: order.color }]}>
                  {order.material} · {order.qty}
                </ThemedText>
                <View style={styles.orderMoneyRow}>
                  <View style={styles.inlineMoney}>
                    <IndianRupee color={colors.textSecondary} size={14} strokeWidth={2.4} />
                    <ThemedText style={styles.orderTotal}>{order.total}</ThemedText>
                  </View>
                  <ThemedText style={order.remaining === '₹0' ? styles.greyBalance : styles.remainingBalance}>
                    Remaining {order.remaining}
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
  screen: { flex: 1 },
  emptyScreen: {
    flex: 1,
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
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
  headerText: { flex: 1 },
  profileCard: {
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.one,
    padding: Spacing.two,
  },
  infoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.one,
  },
  infoText: {
    color: colors.text,
    flex: 1,
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 17,
  },
  moneyGrid: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  moneyCard: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    gap: 2,
    padding: Spacing.two,
  },
  moneyValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 20,
  },
  collectMoney: {
    color: '#B45309',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 20,
  },
  greyMoney: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 20,
  },
  greyLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
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
  orderList: { gap: Spacing.two },
  pressed: { opacity: 0.72 },
  orderCard: {
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.one,
    padding: Spacing.two,
  },
  orderTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.one,
  },
  orderId: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 18,
  },
  orderNeed: {
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 19,
  },
  orderMoneyRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inlineMoney: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  orderTotal: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 17,
  },
  remainingBalance: {
    color: '#B45309',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 16,
  },
  greyBalance: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 16,
  },
  statusChip: {
    borderRadius: 8,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  paidChip: { backgroundColor: '#E5E7EB' },
  partialChip: { backgroundColor: '#FEF3C7' },
  paidText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 16,
  },
  partialText: {
    color: '#B45309',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 16,
  },
});
