import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ManagementList } from '@/components/management-list';
import { ThemedText } from '@/components/themed-text';
import { completedTripItems } from '@/constants/operations-data';
import { Colors, Spacing } from '@/constants/theme';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;
const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

type SelectedDate = 'all' | string;

export default function CompletedTripsScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<SelectedDate>('all');
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState({ month: 7, year: 2026 });
  const selectedLabel = selectedDate === 'all' ? 'All trips till now' : formatReadableDate(selectedDate);
  const calendarCells = useMemo(() => buildCalendarCells(visibleMonth.year, visibleMonth.month), [visibleMonth]);
  const visibleTrips = useMemo(() => {
    if (selectedDate === 'all') {
      return completedTripItems;
    }

    return completedTripItems.filter((trip) => trip.completedDate === selectedDate);
  }, [selectedDate]);

  function selectDate(value: typeof selectedDate) {
    setSelectedDate(value);
    setCalendarOpen(false);
  }

  function moveMonth(direction: -1 | 1) {
    setVisibleMonth((current) => {
      const nextDate = new Date(current.year, current.month + direction, 1);

      return {
        month: nextDate.getMonth(),
        year: nextDate.getFullYear(),
      };
    });
  }

  return (
    <ManagementList
      title="Completed"
      subtitle="Delivered trips across all days."
      primaryAction="New trip"
      total="19 completed"
      totalLabel={selectedLabel}
      stats={[
        { label: 'Trips today', value: '4', rightLabel: 'Payment left', rightValue: '1' },
        { label: 'Trips week', value: '19', rightLabel: 'Payment left', rightValue: '2' },
      ]}
      topAccessory={
        <View style={styles.dateArea}>
          <View style={styles.dateHeader}>
            <ThemedText style={styles.dateTitle}>Date</ThemedText>
            <Pressable
              accessibilityLabel={isCalendarOpen ? 'Close calendar' : 'Open calendar'}
              accessibilityRole="button"
              onPress={() => setCalendarOpen((current) => !current)}
              style={({ pressed }) => [styles.calendarButton, isCalendarOpen && styles.calendarButtonActive, pressed && styles.pressed]}>
              <CalendarDays color={colors.primary} size={17} strokeWidth={2.3} />
              <ThemedText themeColor="primary" type="smallBold">
                {isCalendarOpen ? 'Close' : 'Calendar'}
              </ThemedText>
            </Pressable>
          </View>

          {selectedDate !== 'all' ? (
            <Pressable accessibilityRole="button" onPress={() => selectDate('all')} style={styles.selectedDatePill}>
              <ThemedText themeColor="primary" type="smallBold">
                {selectedLabel} x
              </ThemedText>
            </Pressable>
          ) : null}

          {isCalendarOpen ? (
            <View style={styles.calendarPanel}>
            <View style={styles.calendarTop}>
              <Pressable accessibilityLabel="Previous month" accessibilityRole="button" onPress={() => moveMonth(-1)} style={styles.monthButton}>
                <ChevronLeft color={colors.primary} size={18} />
              </Pressable>
              <ThemedText style={styles.calendarMonth}>
                {monthNames[visibleMonth.month]} {visibleMonth.year}
              </ThemedText>
              <Pressable accessibilityLabel="Next month" accessibilityRole="button" onPress={() => moveMonth(1)} style={styles.monthButton}>
                <ChevronRight color={colors.primary} size={18} />
              </Pressable>
            </View>
            <View style={styles.weekdayGrid}>
              {weekdayLabels.map((label, index) => (
                <ThemedText key={`${label}-${index}`} style={styles.weekdayText}>
                  {label}
                </ThemedText>
              ))}
            </View>
            <View style={styles.calendarGrid}>
              {calendarCells.map((day, index) => {
                if (!day) {
                  return <View key={`empty-${index}`} style={styles.calendarDayBlank} />;
                }

                const isActive = day.value === selectedDate;
                const hasTrips = completedTripItems.some((trip) => trip.completedDate === day.value);

                return (
                  <Pressable
                    key={day.value}
                    accessibilityRole="button"
                    onPress={() => selectDate(day.value)}
                    style={({ pressed }) => [
                      styles.calendarDay,
                      hasTrips && styles.calendarDayHasTrip,
                      isActive && styles.calendarDayActive,
                      pressed && styles.pressed,
                    ]}>
                    <ThemedText
                      style={[
                        styles.calendarDayText,
                        hasTrips && styles.calendarDayHasTripText,
                        isActive && styles.calendarDayActiveText,
                      ]}>
                      {day.label}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>
          </View>
          ) : null}
        </View>
      }
      filters={['All days', 'Today', 'Yesterday', 'This week']}
      hideFilters
      items={visibleTrips}
      onPrimaryAction={() => router.push('/trip/new')}
    />
  );
}

function buildCalendarCells(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  const emptyCells = Array.from({ length: firstWeekday }, () => null);
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;

    return {
      label: String(day),
      value: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    };
  });

  return [...emptyCells, ...days];
}

function formatReadableDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);

  return `${day} ${monthNames[month - 1]} ${year}`;
}

const colors = Colors.light;

const styles = StyleSheet.create({
  dateArea: {
    gap: Spacing.one,
  },
  dateHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 20,
  },
  calendarButton: {
    alignItems: 'center',
    backgroundColor: colors.backgroundSelected,
    borderColor: '#BCD7FF',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: 7,
  },
  calendarButtonActive: {
    backgroundColor: '#DCEBFF',
  },
  selectedDatePill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.backgroundSelected,
    borderColor: '#BCD7FF',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: Spacing.two,
    paddingVertical: 7,
  },
  calendarPanel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: Spacing.two,
    padding: Spacing.two,
  },
  calendarTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthButton: {
    alignItems: 'center',
    backgroundColor: colors.backgroundSelected,
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  calendarMonth: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 19,
  },
  weekdayGrid: {
    flexDirection: 'row',
    gap: 5,
  },
  weekdayText: {
    color: colors.textMuted,
    flex: 1,
    fontSize: 11,
    fontWeight: '800',
    lineHeight: 14,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  calendarDay: {
    alignItems: 'center',
    backgroundColor: colors.backgroundElement,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    width: '13.34%',
  },
  calendarDayBlank: {
    height: 34,
    width: '13.34%',
  },
  calendarDayHasTrip: {
    backgroundColor: '#E0F2EA',
    borderColor: '#9DD1BA',
  },
  calendarDayActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  calendarDayText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 17,
  },
  calendarDayHasTripText: {
    color: colors.primaryDark,
  },
  calendarDayActiveText: {
    color: '#FFFFFF',
  },
  pressed: {
    opacity: 0.72,
  },
});
