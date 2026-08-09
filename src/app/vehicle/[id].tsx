import { AlertTriangle, ArrowLeft, ClipboardCheck, FileWarning, MapPin, Truck, UserRound } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getVehicleDetail, type VehicleItem } from '@/constants/operations-data';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function VehicleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const vehicle: VehicleItem | undefined = getVehicleDetail(String(id ?? ''));

  if (!vehicle) {
    return (
      <ThemedView style={[styles.emptyScreen, { paddingTop: insets.top + Spacing.three }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={colors.primary} size={22} />
        </Pressable>
        <ThemedText type="subtitle">Vehicle not found</ThemedText>
        <ThemedText themeColor="textSecondary">This vehicle may have been removed from the fleet.</ThemedText>
      </ThemedView>
    );
  }

  const issueColor = vehicle.issueColor ?? vehicle.color;
  const paperColor = vehicle.paperColor ?? vehicle.color;

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
            <ThemedText style={styles.vehicleId}>{vehicle.detail}</ThemedText>
            <ThemedText type="subtitle">{vehicle.title}</ThemedText>
          </View>
          <View style={[styles.statusChip, { backgroundColor: `${vehicle.color}1F` }]}>
            <ThemedText style={[styles.statusText, { color: vehicle.color }]}>{vehicle.status}</ThemedText>
          </View>
        </View>

        <ThemedView
          style={[
            styles.heroCard,
            {
              backgroundColor: `${vehicle.color}22`,
              borderColor: `${vehicle.color}66`,
            },
          ]}>
          <InfoRow icon={<Truck color={vehicle.color} size={19} />} label="State" value={vehicle.vehicleState} />
          <InfoRow icon={<UserRound color={vehicle.color} size={19} />} label="Driver" value={vehicle.assignedDriver} />
          <InfoRow icon={<MapPin color={vehicle.color} size={19} />} label="Last seen" value={vehicle.lastSeen} />
        </ThemedView>

        {vehicle.hasProblem ? (
          <Section title="Driver reported issue">
            <AlertCard
              color={issueColor}
              icon={<AlertTriangle color={issueColor} size={19} />}
              title={vehicle.driverIssue}
              detail="This comes from the driver app and needs owner follow-up."
            />
          </Section>
        ) : null}

        <Section title="Papers">
          {vehicle.hasProblem ? (
            <AlertCard
              color={paperColor}
              icon={<FileWarning color={paperColor} size={19} />}
              title={vehicle.paperWarning}
              detail={paperColor === '#DC2626' ? 'Expired document. Do not dispatch until fixed.' : 'Renew before dispatch risk increases.'}
            />
          ) : (
            <AlertCard
              color={vehicle.color}
              icon={<ClipboardCheck color={vehicle.color} size={19} />}
              title="All papers valid"
              detail="No document action needed right now."
            />
          )}
        </Section>

        <Section title="Action">
          <InfoRow
            label="Owner action"
            value={vehicle.hasProblem ? 'Call driver, verify document, then mark resolved' : 'Ready for assignment'}
          />
          <InfoRow label="Current work" value={vehicle.amount} />
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

function InfoRow({ icon, label, value }: { icon?: ReactNode; label: string; value?: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLabel}>
        {icon}
        <ThemedText themeColor="textSecondary" type="small">
          {label}
        </ThemedText>
      </View>
      <ThemedText style={styles.infoValue}>{value}</ThemedText>
    </View>
  );
}

function AlertCard({ color, icon, title, detail }: { color: string; icon: ReactNode; title?: string; detail: string }) {
  return (
    <View style={[styles.alertCard, { backgroundColor: `${color}18`, borderColor: `${color}55` }]}>
      {icon}
      <View style={styles.alertCopy}>
        <ThemedText style={[styles.alertTitle, { color }]}>{title}</ThemedText>
        <ThemedText themeColor="textSecondary" type="small">
          {detail}
        </ThemedText>
      </View>
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
  vehicleId: {
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
  infoRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: Spacing.two,
    justifyContent: 'space-between',
  },
  infoLabel: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.one,
    minWidth: 94,
  },
  infoValue: {
    color: colors.text,
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
    textAlign: 'right',
  },
  alertCard: {
    alignItems: 'flex-start',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.two,
    padding: Spacing.two,
  },
  alertCopy: {
    flex: 1,
    gap: Spacing.half,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 19,
  },
});
