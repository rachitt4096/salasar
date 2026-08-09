import { AlertTriangle, Building2, Clock3, FileWarning, Fuel, MapPin, Truck, UserRound } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Item = {
  id?: string;
  title: string;
  detail: string;
  meta: string;
  amount: string;
  status: string;
  color: string;
  warnings?: readonly {
    label: string;
    color: string;
  }[];
  truckNumber?: string;
  truckCapacity?: string;
  source?: string;
  destination?: string;
  driverName?: string;
  companyName?: string;
  fuelRequired?: string;
  fuelAvailableLitres?: string;
  fuelAvailable?: string;
  timeRemaining?: string;
  distanceLeftPercent?: number;
  completedDay?: string;
  completedDate?: string;
  assignedDriver?: string;
  driverIssue?: string;
  hasProblem?: boolean;
  issueColor?: string;
  lastSeen?: string;
  paperColor?: string;
  paperWarning?: string;
  vehicleState?: string;
};

type Stat = {
  label: string;
  value: string;
  rightLabel?: string;
  rightValue?: string;
};

type ManagementListProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryAction: string;
  total: string;
  totalLabel: string;
  stats: readonly Stat[];
  filters: readonly string[];
  items: readonly Item[];
  onItemPress?: (item: Item) => void;
  onPrimaryAction?: () => void;
  onStatPress?: (stat: Stat) => void;
  hideFilters?: boolean;
  topAccessory?: ReactNode;
};

export function ManagementList({
  eyebrow,
  title,
  subtitle,
  primaryAction,
  total,
  totalLabel,
  stats,
  filters,
  items,
  onItemPress,
  onPrimaryAction,
  onStatPress,
  hideFilters,
  topAccessory,
}: ManagementListProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState(filters[0] ?? 'All');
  const visibleItems = useMemo(() => {
    if (activeFilter === 'All' || activeFilter === 'All days') {
      return items;
    }

    const needle = activeFilter.toLowerCase();

    return items.filter((item) => {
      const searchable = [
        item.status,
        item.detail,
        item.meta,
        item.completedDay,
        ...(item.warnings?.map((warning) => warning.label) ?? []),
      ]
        .join(' ')
        .toLowerCase();

      return searchable.includes(needle);
    });
  }, [activeFilter, items]);

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
            {eyebrow ? (
              <ThemedText themeColor="primary" style={styles.eyebrow}>
                {eyebrow}
              </ThemedText>
            ) : null}
            <ThemedText type="subtitle">{title}</ThemedText>
            <ThemedText themeColor="textSecondary">{subtitle}</ThemedText>
          </View>

          <Pressable
            accessibilityLabel={primaryAction}
            accessibilityRole="button"
            onPress={onPrimaryAction}
            style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
            <ThemedText style={styles.primaryButtonText}>+</ThemedText>
          </Pressable>
        </View>

        <ThemedView type="backgroundElement" style={styles.summaryPanel}>
          <View>
            <ThemedText style={styles.summaryValue}>{total}</ThemedText>
            <ThemedText themeColor="textSecondary" type="small">
              {totalLabel}
            </ThemedText>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={onPrimaryAction}
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
            <ThemedText themeColor="primary" type="smallBold">
              {primaryAction}
            </ThemedText>
          </Pressable>
        </ThemedView>

        <View style={styles.statsGrid}>
          {stats.map((stat) => {
            const isActionable = Boolean(onStatPress);

            return (
              <Pressable
                key={stat.label}
                accessibilityLabel={isActionable ? `Open ${stat.label}` : undefined}
                accessibilityRole={isActionable ? 'button' : undefined}
                disabled={!isActionable}
                onPress={isActionable ? () => onStatPress?.(stat) : undefined}
                style={({ pressed }) => [
                  styles.statCard,
                  isActionable && styles.actionableStatCard,
                  pressed && styles.pressed,
                ]}>
                <View style={styles.statContent}>
                  <View style={styles.statSide}>
                    <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
                    <ThemedText themeColor="textSecondary" type="small">
                      {stat.label}
                    </ThemedText>
                  </View>

                  {stat.rightValue ? (
                    <View style={[styles.statSide, styles.statRightSide]}>
                      <ThemedText style={[styles.statValue, styles.statWarningValue]}>{stat.rightValue}</ThemedText>
                      <ThemedText style={styles.statWarningLabel}>{stat.rightLabel}</ThemedText>
                    </View>
                  ) : null}
                </View>
              </Pressable>
            );
          })}
        </View>

        {topAccessory}

        {!hideFilters ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
            {filters.map((filter) => {
              const isActive = filter === activeFilter;

              return (
                <Pressable
                  key={filter}
                  accessibilityRole="button"
                  onPress={() => setActiveFilter(filter)}
                  style={({ pressed }) => [
                    styles.filterChip,
                    isActive && styles.activeFilterChip,
                    pressed && styles.pressed,
                  ]}>
                  <ThemedText type="smallBold" themeColor={isActive ? 'primary' : 'textSecondary'}>
                    {filter}
                  </ThemedText>
                </Pressable>
              );
            })}
          </ScrollView>
        ) : null}

        <View style={styles.sectionRow}>
          <ThemedText style={styles.sectionTitle}>Records</ThemedText>
          <ThemedText themeColor="textMuted" type="small">
            Updated now
          </ThemedText>
        </View>

        <View style={styles.list}>
          {visibleItems.map((item) => {
            const isTrip = item.truckNumber !== undefined;
            const isVehicle = item.vehicleState !== undefined;
            const distanceLeft = Math.max(0, Math.min(100, item.distanceLeftPercent ?? 0));
            const distanceComplete = 100 - distanceLeft;
            const issueColor = item.issueColor ?? item.color;
            const paperColor = item.paperColor ?? item.color;

            return (
              <Pressable
                key={`${item.title}-${item.status}`}
                accessibilityLabel={`Open ${item.title}`}
                accessibilityRole={onItemPress ? 'button' : undefined}
                onPress={onItemPress ? () => onItemPress(item) : undefined}
                style={({ pressed }) => [
                  styles.item,
                  {
                    backgroundColor: `${item.color}24`,
                    borderColor: `${item.color}59`,
                  },
                  isTrip && styles.compactTripItem,
                  isVehicle && styles.vehicleItem,
                  isVehicle && { borderLeftColor: item.color, borderLeftWidth: 5 },
                  pressed && styles.pressed,
                ]}>
                {isTrip ? (
                  <>
                    <View style={styles.compactRow}>
                      <ThemedText style={styles.tripOrder}>{item.title}</ThemedText>
                      <View style={[styles.inlineValue, styles.inlineValueRight]}>
                        <Truck color={colors.textSecondary} size={15} strokeWidth={2.2} />
                        <ThemedText numberOfLines={1} style={styles.compactStrong}>
                          {item.truckNumber}
                        </ThemedText>
                        {item.truckCapacity ? (
                          <View style={styles.capacityChip}>
                            <ThemedText numberOfLines={1} style={styles.capacityText}>
                              {item.truckCapacity}
                            </ThemedText>
                          </View>
                        ) : null}
                      </View>
                    </View>

                    <View style={styles.compactRow}>
                      <View style={styles.inlineValue}>
                        <MapPin color={colors.textSecondary} size={15} strokeWidth={2.2} />
                        <ThemedText numberOfLines={1} style={styles.compactText}>
                          {item.source} → {item.destination}
                        </ThemedText>
                      </View>
                      <View style={[styles.inlineValue, styles.inlineValueRight]}>
                        <UserRound color={colors.textSecondary} size={15} strokeWidth={2.2} />
                        <ThemedText numberOfLines={1} style={[styles.compactText, styles.rightText]}>
                          {item.driverName}
                        </ThemedText>
                      </View>
                    </View>

                    <View style={styles.compactRow}>
                      <View style={styles.inlineValue}>
                        <Building2 color={colors.textSecondary} size={15} strokeWidth={2.2} />
                        <ThemedText numberOfLines={1} style={styles.compactText}>
                          {item.companyName}
                        </ThemedText>
                      </View>
                      <View style={[styles.statusChip, { backgroundColor: `${item.color}1F` }]}>
                        <ThemedText style={[styles.statusText, { color: item.color }]}>{item.status}</ThemedText>
                      </View>
                    </View>

                    <View style={[styles.compactMetrics, { backgroundColor: `${item.color}12` }]}>
                      <View style={styles.compactMetric}>
                        <Fuel color={item.color} size={15} strokeWidth={2.3} />
                        <ThemedText numberOfLines={1} style={styles.metricValue}>
                          {item.fuelAvailableLitres} / {item.fuelRequired}
                        </ThemedText>
                      </View>
                      <View style={styles.compactMetric}>
                        <Clock3 color={item.color} size={15} strokeWidth={2.3} />
                        <ThemedText numberOfLines={1} style={styles.metricValue}>
                          {item.timeRemaining}
                        </ThemedText>
                      </View>
                      <ThemedText numberOfLines={1} style={styles.amountCompact}>
                        {item.amount}
                      </ThemedText>
                    </View>

                    <View style={styles.progressBlock}>
                      <View style={styles.progressHeader}>
                        <ThemedText style={[styles.progressPercent, { color: item.color }]}>
                          {distanceComplete}% done
                        </ThemedText>
                      </View>
                      <View style={styles.progressTrack}>
                        <View
                          style={[
                            styles.progressFill,
                            { backgroundColor: item.color, width: `${distanceComplete}%` },
                          ]}
                        />
                      </View>
                    </View>
                  </>
                ) : isVehicle ? (
                  <>
                    <View style={styles.compactRow}>
                      <View style={styles.inlineValue}>
                        <Truck color={item.color} size={16} strokeWidth={2.4} />
                        <ThemedText style={styles.tripOrder}>{item.title}</ThemedText>
                      </View>
                      <View style={[styles.statusChip, { backgroundColor: `${item.color}1F` }]}>
                        <ThemedText style={[styles.statusText, { color: item.color }]}>{item.status}</ThemedText>
                      </View>
                    </View>

                    <View style={styles.compactRow}>
                      <ThemedText numberOfLines={1} style={styles.compactText}>
                        {item.detail} · {item.vehicleState}
                      </ThemedText>
                      <View style={[styles.inlineValue, styles.inlineValueRight]}>
                        <UserRound color={colors.textSecondary} size={15} strokeWidth={2.2} />
                        <ThemedText numberOfLines={1} style={[styles.compactText, styles.rightText]}>
                          {item.assignedDriver}
                        </ThemedText>
                      </View>
                    </View>

                    {item.hasProblem ? (
                      <View
                        style={[
                          styles.vehicleAlert,
                          { backgroundColor: `${issueColor}18`, borderColor: `${issueColor}55` },
                        ]}>
                        <AlertTriangle color={issueColor} size={15} strokeWidth={2.4} />
                        <ThemedText numberOfLines={2} style={[styles.vehicleAlertText, { color: issueColor }]}>
                          {item.driverIssue}
                        </ThemedText>
                      </View>
                    ) : null}

                    <View style={styles.vehicleMetaGrid}>
                      {item.hasProblem ? (
                        <View
                          style={[
                            styles.vehicleMetaPill,
                            { backgroundColor: `${paperColor}12`, borderColor: `${paperColor}4D` },
                          ]}>
                          <FileWarning color={paperColor} size={14} strokeWidth={2.3} />
                          <ThemedText numberOfLines={1} style={[styles.vehicleMetaText, { color: paperColor }]}>
                            {item.paperWarning}
                          </ThemedText>
                        </View>
                      ) : null}
                      <View style={[styles.vehicleMetaPill, styles.locationPill]}>
                        <MapPin color={colors.textSecondary} size={14} strokeWidth={2.3} />
                        <ThemedText numberOfLines={1} style={styles.vehicleMetaText}>
                          {item.lastSeen}
                        </ThemedText>
                      </View>
                    </View>

                    {item.warnings?.length ? (
                      <View style={styles.warningRow}>
                        {item.warnings.map((warning) => (
                          <View
                            key={`${item.title}-${warning.label}`}
                            style={[styles.warningChip, { backgroundColor: `${warning.color}1F` }]}>
                            <ThemedText style={[styles.warningText, { color: warning.color }]}>
                              {warning.label}
                            </ThemedText>
                          </View>
                        ))}
                      </View>
                    ) : null}
                  </>
                ) : (
                  <>
                    <View style={styles.itemTopRow}>
                      <View style={styles.itemTitleBlock}>
                        <ThemedText style={styles.itemTitle}>{item.title}</ThemedText>
                        <ThemedText themeColor="textSecondary" type="small">
                          {item.detail}
                        </ThemedText>
                      </View>
                      <View style={[styles.statusChip, { backgroundColor: `${item.color}1A` }]}>
                        <ThemedText style={[styles.statusText, { color: item.color }]}>{item.status}</ThemedText>
                      </View>
                    </View>

                    <ThemedText themeColor="textSecondary" type="small">
                      {item.meta}
                    </ThemedText>

                    {item.warnings?.length ? (
                      <View style={styles.warningRow}>
                        {item.warnings.map((warning) => (
                          <View
                            key={`${item.title}-${warning.label}`}
                            style={[styles.warningChip, { backgroundColor: `${warning.color}1F` }]}>
                            <ThemedText style={[styles.warningText, { color: warning.color }]}>
                              {warning.label}
                            </ThemedText>
                          </View>
                        ))}
                      </View>
                    ) : null}

                    <View style={styles.itemFooter}>
                      <View style={[styles.marker, { backgroundColor: item.color }]} />
                      <ThemedText style={styles.amount}>{item.amount}</ThemedText>
                      <ThemedText type="smallBold" style={[styles.rowAction, { color: item.color }]}>
                        Open
                      </ThemedText>
                    </View>
                  </>
                )}
              </Pressable>
            );
          })}
          {!visibleItems.length ? (
            <ThemedView type="surface" style={styles.emptyState}>
              <ThemedText style={styles.emptyTitle}>No records</ThemedText>
              <ThemedText themeColor="textSecondary" type="small">
                Nothing matches {activeFilter.toLowerCase()} right now.
              </ThemedText>
            </ThemedView>
          ) : null}
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
    paddingHorizontal: Platform.OS === 'web' ? 0 : Spacing.three,
    width: Platform.select({
      web: `calc(100vw - ${Spacing.three * 2}px)` as '100%',
      default: '100%',
    }),
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: Spacing.three,
    justifyContent: 'space-between',
  },
  headerCopy: {
    flex: 1,
    gap: Spacing.one,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '600',
    lineHeight: 29,
  },
  summaryPanel: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.two,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.two,
    paddingVertical: 7,
  },
  summaryValue: {
    color: colors.primaryDark,
    fontSize: 21,
    fontWeight: '800',
    lineHeight: 26,
  },
  secondaryButton: {
    alignSelf: 'center',
    backgroundColor: colors.backgroundSelected,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  statCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minWidth: '31%',
    paddingHorizontal: Spacing.two,
    paddingVertical: 8,
  },
  statContent: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: Spacing.one,
    justifyContent: 'space-between',
  },
  statSide: {
    flex: 1,
    minWidth: 0,
  },
  statRightSide: {
    alignItems: 'flex-end',
  },
  actionableStatCard: {
    borderColor: '#CFE0F8',
  },
  statValue: {
    color: colors.primaryDark,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 23,
  },
  statWarningValue: {
    color: '#B45309',
  },
  statWarningLabel: {
    color: '#B45309',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 15,
    textAlign: 'right',
  },
  filters: {
    gap: Spacing.one,
  },
  filterChip: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: Spacing.two,
    paddingVertical: 8,
  },
  activeFilterChip: {
    backgroundColor: colors.backgroundSelected,
    borderColor: '#BCD7FF',
  },
  sectionRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
  },
  list: {
    gap: Spacing.two,
  },
  emptyState: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.half,
    padding: Spacing.three,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 20,
  },
  item: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.two,
    padding: Spacing.three,
  },
  compactTripItem: {
    gap: 6,
    padding: 12,
  },
  vehicleItem: {
    gap: 7,
    padding: 12,
  },
  itemTopRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: Spacing.two,
    justifyContent: 'space-between',
  },
  itemTitleBlock: {
    flex: 1,
    gap: Spacing.half,
  },
  itemTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 21,
  },
  tripOrder: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 20,
  },
  compactRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.two,
    justifyContent: 'space-between',
  },
  inlineValue: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    minWidth: 0,
  },
  inlineValueRight: {
    justifyContent: 'flex-end',
  },
  compactStrong: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 18,
    textAlign: 'right',
  },
  capacityChip: {
    backgroundColor: '#FFFFFFB8',
    borderColor: colors.border,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  capacityText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '900',
    lineHeight: 12,
  },
  compactText: {
    color: colors.textSecondary,
    flexShrink: 1,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
  rightText: {
    textAlign: 'right',
  },
  compactMetrics: {
    alignItems: 'center',
    borderRadius: 7,
    flexDirection: 'row',
    gap: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: 6,
  },
  compactMetric: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    minWidth: 0,
  },
  metricValue: {
    color: colors.text,
    flexShrink: 1,
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 16,
  },
  amountCompact: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 17,
  },
  vehicleAlert: {
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: 'row',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: 7,
  },
  vehicleAlertText: {
    color: colors.text,
    flex: 1,
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 16,
  },
  vehicleMetaGrid: {
    gap: Spacing.one,
  },
  vehicleMetaPill: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF9C',
    borderColor: colors.border,
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: 6,
  },
  locationPill: {
    backgroundColor: '#FFFFFFB8',
  },
  vehicleMetaText: {
    color: colors.textSecondary,
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  progressBlock: {
    gap: Spacing.one,
  },
  progressHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 16,
  },
  progressTrack: {
    backgroundColor: '#FFFFFFB8',
    borderRadius: 999,
    height: 8,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 999,
    height: '100%',
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
  warningRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  warningChip: {
    borderRadius: 8,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  warningText: {
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 16,
  },
  itemFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.two,
  },
  marker: {
    borderRadius: 3,
    height: 6,
    width: 6,
  },
  amount: {
    color: colors.text,
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  rowAction: {
    paddingLeft: Spacing.two,
  },
  pressed: {
    opacity: 0.72,
  },
});
