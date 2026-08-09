import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, IndianRupee, ReceiptText, Share2, Truck } from 'lucide-react-native';
import { Alert, Pressable, ScrollView, Share, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getGoodsOrder } from '@/constants/goods-data';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function GoodsOrderDetailScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const theme = useTheme();
  const result = getGoodsOrder(orderId);

  if (!result) {
    return (
      <ThemedView style={[styles.emptyScreen, { paddingTop: insets.top + Spacing.three }]}>
        <ThemedText type="subtitle">Order not found</ThemedText>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={colors.primary} size={20} strokeWidth={2.6} />
        </Pressable>
      </ThemedView>
    );
  }

  const { customer, order } = result;

  async function shareInvoice() {
    const message = [
      `Invoice ${order.id}`,
      customer.company,
      `Customer: ${customer.contact} (${customer.phone})`,
      `Material: ${order.material}`,
      `Quantity: ${order.qty}`,
      `Rate: ${order.rate}`,
      `Goods amount: ${order.goodsAmount}`,
      `Transport: ${order.transportAmount}`,
      `Total: ${order.total}`,
      `Paid: ${order.paid}`,
      `Remaining: ${order.remaining}`,
      `Site: ${order.site}`,
      `Truck: ${order.truck}`,
    ].join('\n');

    try {
      await Share.share({ message, title: `Invoice ${order.id}` });
    } catch {
      Alert.alert('Could not share invoice right now');
    }
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
            <ThemedText type="subtitle">{order.id}</ThemedText>
            <ThemedText themeColor="textSecondary">{customer.name}</ThemedText>
          </View>
        </View>

        <ThemedView type="surface" style={[styles.invoiceCard, { borderColor: `${order.color}55` }]}>
          <View style={styles.invoiceTop}>
            <View style={styles.invoiceTitleRow}>
              <ReceiptText color={order.color} size={18} strokeWidth={2.4} />
              <ThemedText style={styles.invoiceTitle}>Bill / invoice</ThemedText>
            </View>
            <View style={order.status === 'Paid' ? styles.paidChip : styles.partialChip}>
              <ThemedText style={order.status === 'Paid' ? styles.paidText : styles.partialText}>
                {order.status}
              </ThemedText>
            </View>
          </View>

          <View style={styles.lineItem}>
            <ThemedText themeColor="textSecondary" type="small">Material</ThemedText>
            <ThemedText style={[styles.lineValue, { color: order.color }]}>{order.material} · {order.qty}</ThemedText>
          </View>
          <View style={styles.lineItem}>
            <ThemedText themeColor="textSecondary" type="small">Rate</ThemedText>
            <ThemedText style={styles.lineValue}>{order.rate}</ThemedText>
          </View>
          <View style={styles.lineItem}>
            <ThemedText themeColor="textSecondary" type="small">Goods amount</ThemedText>
            <ThemedText style={styles.lineValue}>{order.goodsAmount}</ThemedText>
          </View>
          <View style={styles.lineItem}>
            <ThemedText themeColor="textSecondary" type="small">Transport</ThemedText>
            <ThemedText style={styles.lineValue}>{order.transportAmount}</ThemedText>
          </View>
          <View style={styles.lineItem}>
            <ThemedText themeColor="textSecondary" type="small">Date</ThemedText>
            <ThemedText style={styles.lineValue}>{order.date}</ThemedText>
          </View>
          <View style={styles.lineItem}>
            <ThemedText themeColor="textSecondary" type="small">Site</ThemedText>
            <ThemedText numberOfLines={1} style={styles.lineValue}>{order.site}</ThemedText>
          </View>
        </ThemedView>

        <View style={styles.moneyGrid}>
          <ThemedView type="surface" style={styles.moneyCard}>
            <IndianRupee color={colors.textSecondary} size={16} strokeWidth={2.4} />
            <ThemedText style={styles.moneyValue}>{order.total}</ThemedText>
            <ThemedText themeColor="textSecondary" type="small">Total</ThemedText>
          </ThemedView>
          <ThemedView type="surface" style={styles.moneyCard}>
            <IndianRupee color={colors.success} size={16} strokeWidth={2.4} />
            <ThemedText style={styles.moneyValue}>{order.paid}</ThemedText>
            <ThemedText themeColor="textSecondary" type="small">Paid</ThemedText>
          </ThemedView>
          <ThemedView type="surface" style={styles.moneyCard}>
            <IndianRupee color={colors.textMuted} size={16} strokeWidth={2.4} />
            <ThemedText style={order.remaining === '₹0' ? styles.greyMoney : styles.collectMoney}>
              {order.remaining}
            </ThemedText>
            <ThemedText style={styles.greyLabel}>Remaining</ThemedText>
          </ThemedView>
        </View>

        <ThemedView type="surface" style={styles.transportCard}>
          <View style={styles.infoRow}>
            <Truck color={colors.textSecondary} size={16} strokeWidth={2.4} />
            <ThemedText style={styles.infoText}>{order.truck} · {order.driver}</ThemedText>
          </View>
          <ThemedText themeColor="textSecondary" type="small">{order.source} to {order.site}</ThemedText>
          <ThemedText themeColor="textSecondary" type="small">{order.note}</ThemedText>
        </ThemedView>

        <Pressable onPress={shareInvoice} style={({ pressed }) => [styles.shareButton, pressed && styles.pressed]}>
          <Share2 color="#FFFFFF" size={18} strokeWidth={2.6} />
          <ThemedText style={styles.shareText}>Share invoice / bill</ThemedText>
        </Pressable>
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
  invoiceCard: {
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.two,
    padding: Spacing.two,
  },
  invoiceTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  invoiceTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.one,
  },
  invoiceTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 20,
  },
  lineItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lineValue: {
    color: colors.text,
    flexShrink: 1,
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 17,
    textAlign: 'right',
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
  transportCard: {
    borderColor: colors.border,
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
  shareButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    gap: Spacing.one,
    justifyContent: 'center',
    padding: Spacing.two,
  },
  shareText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 18,
  },
  pressed: { opacity: 0.72 },
  paidChip: {
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  partialChip: {
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
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
