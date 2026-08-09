import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const colors = Colors.light;

  return (
    <NativeTabs
      backgroundColor={colors.background}
      iconColor={{ default: colors.textMuted, selected: colors.primary }}
      indicatorColor={colors.backgroundSelected}
      labelStyle={{
        default: { color: colors.textSecondary, fontSize: 11, fontWeight: '700' },
        selected: { color: colors.primary, fontSize: 11, fontWeight: '800' },
      }}
      rippleColor={colors.backgroundSelected}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Dashboard</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md={{ default: 'dashboard', selected: 'space_dashboard' }}
          sf={{ default: 'square.grid.2x2', selected: 'square.grid.2x2.fill' }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="trips">
        <NativeTabs.Trigger.Label>Trips</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md={{ default: 'route', selected: 'map' }}
          sf={{ default: 'map', selected: 'map.fill' }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="goods">
        <NativeTabs.Trigger.Label>Goods</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md={{ default: 'inventory_2', selected: 'inventory' }}
          sf={{ default: 'shippingbox', selected: 'shippingbox.fill' }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="vehicles">
        <NativeTabs.Trigger.Label>Vehicles</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md={{ default: 'local_shipping', selected: 'directions_car' }}
          sf={{ default: 'car', selected: 'car.fill' }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="more">
        <NativeTabs.Trigger.Label>More</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md={{ default: 'more_horiz', selected: 'menu' }}
          sf="ellipsis"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
