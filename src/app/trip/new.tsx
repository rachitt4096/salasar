import { ArrowLeft, Check, ChevronDown, Fuel, MapPin, Truck, UserRound } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const truckOptions = [
  { number: 'RJ 27 GB 9228', capacity: '8T', status: 'Available', tone: '#16835D', surface: '#DFF3EA' },
  { number: 'RJ 14 GC 8241', capacity: '7.5T', status: 'Running', tone: '#667085', surface: '#FFFFFF' },
  { number: 'RJ 19 GA 4450', capacity: '5T', status: 'Running', tone: '#667085', surface: '#FFFFFF' },
  { number: 'RJ 11 TA 7088', capacity: '10T', status: 'Maintenance', tone: '#C2410C', surface: '#FDE7DD' },
  { number: 'RJ 02 PB 3301', capacity: '4T', status: 'Available', tone: '#16835D', surface: '#DFF3EA' },
] as const;

const driverOptions = [
  { name: 'Rakesh Kumar', meta: 'On Delhi route' },
  { name: 'Mohit Sharma', meta: 'Loading at Ajmer' },
  { name: 'Vikram Singh', meta: 'Available near Kota' },
  { name: 'Suresh Yadav', meta: 'Available today' },
] as const;

export default function NewTripScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [form, setForm] = useState({
    source: '',
    destination: '',
    company: '',
    load: '',
    driver: '',
    truck: '',
    fuelRequired: '',
    amount: '',
  });
  const [openPicker, setOpenPicker] = useState<'truck' | 'driver' | null>(null);
  const selectedTruck = truckOptions.find((truck) => truck.number === form.truck);
  const selectedDriver = driverOptions.find((driver) => driver.name === form.driver);

  const canCreate = form.source && form.destination && form.company && form.load && form.amount;

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function createTrip() {
    if (!canCreate) {
      Alert.alert('Missing trip details', 'Add source, destination, company, load, and amount.');
      return;
    }

    Alert.alert('Trip ready', 'This trip can now be sent for assignment.');
    router.back();
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
          <Pressable onPress={() => router.back()} style={styles.iconButton}>
            <ArrowLeft color={colors.primary} size={22} />
          </Pressable>
          <View style={styles.headerCopy}>
            <ThemedText type="subtitle">New trip</ThemedText>
            <ThemedText themeColor="textSecondary">Create order, route, vehicle, and billing details.</ThemedText>
          </View>
        </View>

        <ThemedView type="surface" style={styles.formCard}>
          <View style={styles.twoColumn}>
            <Field
              icon={<MapPin color={colors.primary} size={18} />}
              label="Source"
              value={form.source}
              onChangeText={(value) => updateField('source', value)}
            />
            <Field
              label="Destination"
              value={form.destination}
              onChangeText={(value) => updateField('destination', value)}
            />
          </View>

          <Field label="Company" value={form.company} onChangeText={(value) => updateField('company', value)} />
          <Field label="Load" value={form.load} onChangeText={(value) => updateField('load', value)} />

          <View style={styles.pickerBlock}>
            <View style={styles.fieldLabel}>
              <Truck color={colors.primary} size={18} />
              <ThemedText themeColor="textSecondary" type="smallBold">
                Truck
              </ThemedText>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => setOpenPicker((current) => (current === 'truck' ? null : 'truck'))}
              style={({ pressed }) => [styles.selectorRow, pressed && styles.pressed]}>
              <View style={styles.selectorCopy}>
                <ThemedText style={selectedTruck ? styles.selectorValue : styles.selectorPlaceholder}>
                  {selectedTruck ? selectedTruck.number : 'Select truck'}
                </ThemedText>
                {selectedTruck ? (
                  <ThemedText style={[styles.selectorMeta, { color: selectedTruck.tone }]}>
                    {selectedTruck.status} · {selectedTruck.capacity}
                  </ThemedText>
                ) : null}
              </View>
              <ChevronDown color={colors.textSecondary} size={18} />
            </Pressable>

            {openPicker === 'truck' ? (
              <View style={styles.optionList}>
              {truckOptions.map((truck) => {
                const isSelected = form.truck === truck.number;

                return (
                  <Pressable
                    key={truck.number}
                    accessibilityRole="button"
                    accessibilityLabel={`Select truck ${truck.number}`}
                    onPress={() => {
                      updateField('truck', truck.number);
                      setOpenPicker(null);
                    }}
                    style={({ pressed }) => [
                      styles.truckOption,
                      {
                        backgroundColor: truck.surface,
                        borderColor: isSelected ? colors.primary : `${truck.tone}55`,
                      },
                      isSelected && styles.truckOptionSelected,
                      pressed && styles.pressed,
                    ]}>
                    <View style={styles.truckOptionTop}>
                      <Truck color={truck.tone} size={15} strokeWidth={2.4} />
                      <ThemedText style={styles.truckNumber}>{truck.number}</ThemedText>
                    </View>
                    <View style={styles.truckOptionBottom}>
                      <ThemedText style={[styles.truckStatus, { color: truck.tone }]}>{truck.status}</ThemedText>
                      <ThemedText style={styles.truckCapacity}>{truck.capacity}</ThemedText>
                    </View>
                  </Pressable>
                );
              })}
              </View>
            ) : null}
          </View>

          <View style={styles.pickerBlock}>
            <View style={styles.fieldLabel}>
              <UserRound color={colors.primary} size={18} />
              <ThemedText themeColor="textSecondary" type="smallBold">
                Driver
              </ThemedText>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => setOpenPicker((current) => (current === 'driver' ? null : 'driver'))}
              style={({ pressed }) => [styles.selectorRow, pressed && styles.pressed]}>
              <View style={styles.selectorCopy}>
                <ThemedText style={selectedDriver ? styles.selectorValue : styles.selectorPlaceholder}>
                  {selectedDriver ? selectedDriver.name : 'Select driver'}
                </ThemedText>
                {selectedDriver ? <ThemedText style={styles.selectorMeta}>{selectedDriver.meta}</ThemedText> : null}
              </View>
              <ChevronDown color={colors.textSecondary} size={18} />
            </Pressable>

            {openPicker === 'driver' ? (
              <View style={styles.optionList}>
                {driverOptions.map((driver) => {
                  const isSelected = form.driver === driver.name;

                  return (
                    <Pressable
                      key={driver.name}
                      accessibilityRole="button"
                      onPress={() => {
                        updateField('driver', driver.name);
                        setOpenPicker(null);
                      }}
                      style={({ pressed }) => [
                        styles.driverOption,
                        isSelected && styles.driverOptionSelected,
                        pressed && styles.pressed,
                      ]}>
                      <ThemedText style={styles.truckNumber}>{driver.name}</ThemedText>
                      <ThemedText style={styles.selectorMeta}>{driver.meta}</ThemedText>
                    </Pressable>
                  );
                })}
              </View>
            ) : null}
          </View>

          <View style={styles.twoColumn}>
            <Field
              icon={<Fuel color={colors.primary} size={18} />}
              label="Fuel required"
              keyboardType="numeric"
              value={form.fuelRequired}
              onChangeText={(value) => updateField('fuelRequired', value)}
            />
            <Field
              label="Amount"
              keyboardType="numeric"
              value={form.amount}
              onChangeText={(value) => updateField('amount', value)}
            />
          </View>
        </ThemedView>

        <Pressable
          accessibilityRole="button"
          onPress={createTrip}
          style={({ pressed }) => [styles.createButton, !canCreate && styles.createButtonDisabled, pressed && styles.pressed]}>
          <Check color="#FFFFFF" size={19} strokeWidth={2.4} />
          <ThemedText style={styles.createButtonText}>Create trip</ThemedText>
        </Pressable>
      </ThemedView>
    </ScrollView>
  );
}

function Field({
  icon,
  label,
  value,
  keyboardType,
  onChangeText,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  keyboardType?: 'default' | 'numeric';
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.field}>
      <View style={styles.fieldLabel}>
        {icon}
        <ThemedText themeColor="textSecondary" type="smallBold">
          {label}
        </ThemedText>
      </View>
      <TextInput
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={label}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        value={value}
      />
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
    gap: Spacing.two,
  },
  iconButton: {
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
  formCard: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.two,
    padding: Spacing.three,
  },
  twoColumn: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  field: {
    flex: 1,
    gap: Spacing.one,
    minWidth: 0,
  },
  fieldLabel: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.one,
  },
  pickerBlock: {
    gap: Spacing.one,
  },
  selectorRow: {
    alignItems: 'center',
    backgroundColor: colors.backgroundElement,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.two,
    justifyContent: 'space-between',
    minHeight: 44,
    paddingHorizontal: Spacing.two,
    paddingVertical: 8,
  },
  selectorCopy: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  selectorValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 19,
  },
  selectorPlaceholder: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 19,
  },
  selectorMeta: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  optionList: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.one,
    maxHeight: 220,
    overflow: 'hidden',
    padding: Spacing.one,
  },
  truckOption: {
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: 9,
  },
  truckOptionSelected: {
    borderWidth: 2,
  },
  driverOption: {
    backgroundColor: colors.backgroundElement,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 2,
    paddingHorizontal: Spacing.two,
    paddingVertical: 9,
  },
  driverOptionSelected: {
    backgroundColor: colors.backgroundSelected,
    borderColor: colors.primary,
  },
  truckOptionTop: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.one,
  },
  truckNumber: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 17,
  },
  truckOptionBottom: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  truckStatus: {
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 16,
  },
  truckCapacity: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '900',
    lineHeight: 15,
  },
  input: {
    backgroundColor: colors.backgroundElement,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    minHeight: 44,
    paddingHorizontal: Spacing.two,
  },
  createButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    gap: Spacing.one,
    justifyContent: 'center',
    padding: Spacing.three,
  },
  createButtonDisabled: {
    opacity: 0.55,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.72,
  },
});
