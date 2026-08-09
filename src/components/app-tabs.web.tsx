import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { Boxes, Car, ClipboardList, LayoutDashboard, MoreHorizontal } from 'lucide-react-native';
import type { ComponentType } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton Icon={LayoutDashboard}>Dashboard</TabButton>
          </TabTrigger>
          <TabTrigger name="trips" href="/trips" asChild>
            <TabButton Icon={ClipboardList}>Trips</TabButton>
          </TabTrigger>
          <TabTrigger name="goods" href="/goods" asChild>
            <TabButton Icon={Boxes}>Goods</TabButton>
          </TabTrigger>
          <TabTrigger name="vehicles" href="/vehicles" asChild>
            <TabButton Icon={Car}>Vehicles</TabButton>
          </TabTrigger>
          <TabTrigger name="more" href="/more" asChild>
            <TabButton Icon={MoreHorizontal}>More</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

type TabIcon = ComponentType<{ color?: string; size?: number; strokeWidth?: number }>;

export function TabButton({ children, isFocused, Icon, ...props }: TabTriggerSlotProps & { Icon: TabIcon }) {
  const iconColor = isFocused ? colors.primary : colors.textMuted;

  return (
    <Pressable {...props} style={({ pressed }) => [styles.tabButton, pressed && styles.pressed]}>
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'surface'}
        style={styles.tabButtonView}>
        <Icon color={iconColor} size={21} strokeWidth={isFocused ? 2.6 : 2.1} />
        <ThemedText style={styles.tabLabel} themeColor={isFocused ? 'primary' : 'textSecondary'}>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView type="surface" style={styles.innerContainer}>
        {props.children}
      </ThemedView>
    </View>
  );
}

const colors = Colors.light;

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingHorizontal: Spacing.two,
    paddingBottom: Spacing.one,
    paddingTop: Spacing.one,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: Spacing.one,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: Spacing.one,
    maxWidth: MaxContentWidth,
  },
  tabButton: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  tabButtonView: {
    alignItems: 'center',
    borderRadius: 8,
    gap: Spacing.one,
    minHeight: 50,
    justifyContent: 'center',
    paddingHorizontal: Spacing.one,
    paddingVertical: Spacing.two,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '800',
    lineHeight: 14,
  },
});
