import { AlertTriangle, ArrowLeft, Clock, Fuel, MapPin, Truck, UserRound } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getTripDetail } from '@/constants/operations-data';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const trip = getTripDetail(String(id ?? ''));
  const distanceLeft = Math.max(0, Math.min(100, trip?.distanceLeftPercent ?? 0));
  const distanceComplete = 100 - distanceLeft;

  if (!trip) {
    return (
      <ThemedView style={[styles.emptyScreen, { paddingTop: insets.top + Spacing.three }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={colors.primary} size={22} />
        </Pressable>
        <ThemedText type="subtitle">Trip not found</ThemedText>
        <ThemedText themeColor="textSecondary">This trip may have been removed or reassigned.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + Spacing.three, paddingBottom: insets.bottom + Spacing.four },
      ]}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color={colors.primary} size={22} />
          </Pressable>
          <View style={styles.headerCopy}>
            <ThemedText style={styles.tripId}>{trip.id}</ThemedText>
            <ThemedText type="subtitle">{trip.route}</ThemedText>
          </View>
          <View style={[styles.statusChip, { backgroundColor: `${trip.color}1F` }]}>
            <ThemedText style={[styles.statusText, { color: trip.color }]}>{trip.status}</ThemedText>
          </View>
        </View>

        <ThemedView
          style={[
            styles.heroCard,
            {
              backgroundColor: `${trip.color}24`,
              borderColor: `${trip.color}59`,
            },
          ]}>
          <View style={styles.heroRow}>
            <InfoTile label="Load" value={trip.load} />
            <InfoTile label="Amount" value={trip.amount} />
          </View>
          <InfoTile label="Company" value={trip.companyName} />
          <ThemedText themeColor="textSecondary">{trip.paymentStatus}</ThemedText>
        </ThemedView>

        <Section title="Warnings">
          {trip.warnings.map((warning) => (
            <View
              key={warning.title}
              style={[
                styles.warningCard,
                { backgroundColor: `${warning.color}1F`, borderColor: `${warning.color}4D` },
              ]}>
              <AlertTriangle color={warning.color} size={19} />
              <View style={styles.warningCopy}>
                <ThemedText style={[styles.warningTitle, { color: warning.color }]}>{warning.title}</ThemedText>
                <ThemedText themeColor="textSecondary" type="small">
                  {warning.detail}
                </ThemedText>
              </View>
            </View>
          ))}
        </Section>

        <Section title="Driver">
          <DetailRow icon={<UserRound color={colors.primary} size={19} />} label="Name" value={trip.driver.name} />
          <DetailRow label="Phone" value={trip.driver.phone} />
          <DetailRow label="License" value={trip.driver.license} />
          <DetailRow label="On-time score" value={trip.driver.onTimeScore} />
        </Section>

        <Section title="Vehicle and fuel">
          <DetailRow icon={<Truck color={colors.primary} size={19} />} label="Vehicle" value={trip.vehicle.number} />
          <DetailRow label="Model" value={trip.vehicle.model} />
          <DetailRow icon={<Fuel color={colors.primary} size={19} />} label="Fuel" value={trip.vehicle.fuel} />
          <DetailRow label="Available" value={trip.fuelAvailableLitres} />
          <DetailRow label="Required for trip" value={trip.fuelRequired} />
          <DetailRow label="Range" value={trip.vehicle.range} />
          <DetailRow label="Odometer" value={trip.vehicle.odometer} />
        </Section>

        <Section title="Time">
          <DetailRow icon={<Clock color={colors.primary} size={19} />} label="Pickup" value={trip.timing.pickup} />
          <DetailRow label="Delivery" value={trip.timing.expectedDelivery} />
          <DetailRow label="ETA" value={trip.timing.eta} />
          <DetailRow label="Delay" value={trip.timing.delay} />
        </Section>

        <Section title="Route">
          <DetailRow icon={<MapPin color={colors.primary} size={19} />} label="Origin" value={trip.routePlan.origin} />
          <DetailRow label="Destination" value={trip.routePlan.destination} />
          <DetailRow label="Current" value={trip.routePlan.currentLocation} />
          <DetailRow label="Distance" value={trip.routePlan.distance} />
          <View style={styles.progressBlock}>
            <View style={styles.progressHeader}>
              <ThemedText themeColor="textSecondary" type="small">
                Distance complete
              </ThemedText>
              <ThemedText style={[styles.progressPercent, { color: trip.color }]}>
                {distanceComplete}%
              </ThemedText>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { backgroundColor: trip.color, width: `${distanceComplete}%` },
                ]}
              />
            </View>
            <View style={styles.progressScale}>
              <ThemedText themeColor="textMuted" style={styles.scaleText}>0</ThemedText>
              <ThemedText themeColor="textMuted" style={styles.scaleText}>100</ThemedText>
            </View>
          </View>
        </Section>

        <Section title="Timeline">
          {trip.timeline.map((event) => (
            <View key={event} style={styles.timelineRow}>
              <View style={[styles.timelineDot, { backgroundColor: trip.color }]} />
              <ThemedText themeColor="textSecondary">{event}</ThemedText>
            </View>
          ))}
        </Section>
      </ThemedView>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <ThemedView type="surface" style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <View style={styles.sectionBody}>{children}</View>
    </ThemedView>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoTile}>
      <ThemedText themeColor="textSecondary" type="small">
        {label}
      </ThemedText>
      <ThemedText style={styles.infoValue}>{value}</ThemedText>
    </View>
  );
}

function DetailRow({ icon, label, value }: { icon?: ReactNode; label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailLabelWrap}>
        {icon}
        <ThemedText themeColor="textSecondary" type="small">
          {label}
        </ThemedText>
      </View>
      <ThemedText style={styles.detailValue}>{value}</ThemedText>
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
  emptyScreen: {
    flex: 1,
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
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
    gap: Spacing.two,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: colors.backgroundSelected,
    borderRadius: 8,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  headerCopy: {
    flex: 1,
    gap: Spacing.half,
  },
  tripId: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 16,
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
  heroCard: {
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.two,
    padding: Spacing.three,
  },
  heroRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  infoTile: {
    flex: 1,
    gap: Spacing.half,
  },
  infoValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
  },
  section: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.two,
    padding: Spacing.three,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 23,
  },
  sectionBody: {
    gap: Spacing.two,
  },
  warningCard: {
    alignItems: 'flex-start',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.two,
    padding: Spacing.two,
  },
  warningCopy: {
    flex: 1,
    gap: Spacing.half,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  detailRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: Spacing.two,
    justifyContent: 'space-between',
  },
  detailLabelWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.two,
    minWidth: 106,
  },
  detailValue: {
    color: colors.text,
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    textAlign: 'right',
  },
  timelineRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.two,
  },
  progressBlock: {
    gap: Spacing.one,
    paddingTop: Spacing.one,
  },
  progressHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 16,
  },
  progressTrack: {
    backgroundColor: colors.backgroundElement,
    borderRadius: 999,
    height: 8,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 999,
    height: '100%',
  },
  progressScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scaleText: {
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
  },
  timelineDot: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
});
