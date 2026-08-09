import { IndianRupee, PackagePlus, UserCheck } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { attentionItems, dashboardMetrics, liveTrips } from '@/constants/operations-data';
import { BottomTabInset, Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const quickActions = [
  { label: 'Create trip', Icon: PackagePlus, backgroundColor: '#EAF2FF', iconColor: '#145DA0' },
  { label: 'Assign driver', Icon: UserCheck, backgroundColor: '#EAFBF3', iconColor: '#16835D' },
  { label: 'Record payment', Icon: IndianRupee, backgroundColor: '#FFF7E8', iconColor: '#B45309' },
] as const;

export default function OwnerDashboard() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + Spacing.three, paddingBottom: insets.bottom + BottomTabInset + Spacing.four },
      ]}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <ThemedText type="subtitle">Salasar Logistics</ThemedText>
          </View>

          <View style={styles.avatarWrap}>
            <View style={styles.onlineDot} />
            <ThemedText style={styles.avatarText}>SL</ThemedText>
          </View>
        </View>

        <ThemedView type="backgroundElement" style={styles.commandPanel}>
          <View style={styles.metricsGrid}>
            {dashboardMetrics.map((metric) => (
              <ThemedView key={metric.label} type="surface" style={styles.metricCard}>
                <ThemedText style={styles.metricValue}>{metric.value}</ThemedText>
                <View style={styles.metricCopy}>
                  <ThemedText style={styles.metricLabel}>{metric.label}</ThemedText>
                  <ThemedText themeColor={metric.tone} style={styles.metricDelta}>
                    {metric.delta}
                  </ThemedText>
                </View>
              </ThemedView>
            ))}
          </View>
        </ThemedView>

        <View style={styles.actionGrid}>
          {quickActions.map((action) => {
            const Icon = action.Icon;

            return (
              <Pressable
                key={action.label}
                accessibilityLabel={action.label}
                style={({ pressed }) => [
                  styles.actionCard,
                  { backgroundColor: action.backgroundColor },
                  pressed && styles.pressed,
                ]}>
                <Icon color={action.iconColor} size={26} strokeWidth={2.4} />
              </Pressable>
            );
          })}
        </View>

        <View style={styles.sectionRow}>
          <ThemedText style={styles.sectionTitle}>Needs attention</ThemedText>
          <Pressable>
            <ThemedText themeColor="primary" type="smallBold">
              Review
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.attentionList}>
          {attentionItems.map((item) => (
            <ThemedView key={item.title} type="surface" style={styles.attentionItem}>
              <View style={[styles.attentionMarker, { backgroundColor: item.tone }]} />
              <View style={styles.attentionCopy}>
                <ThemedText style={styles.attentionTitle}>{item.title}</ThemedText>
                <ThemedText themeColor="textSecondary" type="small">
                  {item.detail}
                </ThemedText>
              </View>
            </ThemedView>
          ))}
        </View>

        <View style={styles.sectionRow}>
          <ThemedText style={styles.sectionTitle}>Live trips</ThemedText>
          <Pressable>
            <ThemedText themeColor="primary" type="smallBold">
              View all
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.tripList}>
          {liveTrips.map((trip) => (
            <ThemedView key={trip.id} type="surface" style={styles.tripCard}>
              <View style={styles.tripHeader}>
                <View>
                  <ThemedText style={styles.tripId}>{trip.id}</ThemedText>
                  <ThemedText style={styles.tripRoute}>{trip.route}</ThemedText>
                </View>
                <View style={[styles.statusChip, { backgroundColor: `${trip.tone}14` }]}>
                  <ThemedText style={[styles.statusText, { color: trip.tone }]}>{trip.status}</ThemedText>
                </View>
              </View>

              <ThemedText themeColor="textSecondary" type="small">
                {trip.load}
              </ThemedText>

              <View style={styles.tripMetaGrid}>
                <TripMeta label="Driver" value={trip.driver} />
                <TripMeta label="Vehicle" value={trip.vehicle} />
                <TripMeta label="ETA" value={trip.eta} />
                <TripMeta label="Amount" value={trip.amount} />
              </View>
            </ThemedView>
          ))}
        </View>

        <ThemedView type="backgroundElement" style={styles.financePanel}>
          <View>
            <ThemedText style={styles.financeTitle}>Collections</ThemedText>
            <ThemedText themeColor="textSecondary" type="small">
              ₹22,400 pending from completed trips
            </ThemedText>
          </View>
          <Pressable style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed]}>
            <ThemedText themeColor="primary" type="smallBold">
              Follow up
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

function TripMeta({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.tripMeta}>
      <ThemedText themeColor="textMuted" style={styles.metaLabel}>
        {label}
      </ThemedText>
      <ThemedText style={styles.metaValue}>{value}</ThemedText>
    </View>
  );
}

const colors = Colors.light;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },
  container: {
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
    width: '100%',
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: Spacing.three,
    justifyContent: 'space-between',
  },
  headerCopy: {
    flex: 1,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  avatarWrap: {
    alignItems: 'center',
    backgroundColor: colors.backgroundSelected,
    borderColor: '#BCD7FF',
    borderRadius: 8,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  avatarText: {
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: '800',
  },
  onlineDot: {
    backgroundColor: colors.success,
    borderColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 2,
    height: 10,
    position: 'absolute',
    right: -2,
    top: -2,
    width: 10,
  },
  commandPanel: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: Spacing.one,
    padding: Spacing.two,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  metricCard: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: '48%',
    flexGrow: 1,
    gap: Spacing.one,
    minHeight: 86,
    padding: Spacing.two,
  },
  metricCopy: {
    flex: 1,
    gap: Spacing.half,
  },
  metricValue: {
    color: colors.primaryDark,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 27,
  },
  metricLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 16,
  },
  metricDelta: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  actionGrid: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.two,
  },
  actionCard: {
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
    height: 56,
    justifyContent: 'center',
  },
  sectionRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
  },
  attentionList: {
    gap: Spacing.two,
  },
  attentionItem: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.two,
    padding: Spacing.three,
  },
  attentionMarker: {
    borderRadius: 3,
    height: 34,
    width: 5,
  },
  attentionCopy: {
    flex: 1,
    gap: Spacing.half,
  },
  attentionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  tripList: {
    gap: Spacing.two,
  },
  tripCard: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.two,
    padding: Spacing.three,
  },
  tripHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: Spacing.two,
    justifyContent: 'space-between',
  },
  tripId: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 16,
  },
  tripRoute: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 23,
  },
  statusChip: {
    borderRadius: 8,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 16,
  },
  tripMetaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    paddingTop: Spacing.one,
  },
  tripMeta: {
    minWidth: '48%',
  },
  metaLabel: {
    fontSize: 11,
    fontWeight: '800',
    lineHeight: 15,
    textTransform: 'uppercase',
  },
  metaValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  financePanel: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.three,
    justifyContent: 'space-between',
    padding: Spacing.three,
  },
  financeTitle: {
    color: colors.primaryDark,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  outlineButton: {
    backgroundColor: colors.backgroundSelected,
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  pressed: {
    opacity: 0.72,
  },
});
