import { useRouter } from 'expo-router';

import { ManagementList } from '@/components/management-list';
import { vehicleItems } from '@/constants/operations-data';

export default function VehiclesScreen() {
  const router = useRouter();

  return (
    <ManagementList
      title="Vehicles"
      subtitle="Watch assignments, service health, and readiness."
      primaryAction="Add vehicle"
      total="18 vehicles"
      totalLabel="1 all okay · 1 warning · 2 blocked"
      stats={[
        { label: 'All okay', value: '1' },
        { label: 'Driver issues', value: '3' },
      ]}
      filters={['All', 'All okay', 'Running', 'Idle', 'Broken', 'Maintenance', 'Documents']}
      items={vehicleItems}
      onItemPress={(item) => {
        if (item.id) {
          router.push({ pathname: '/vehicle/[id]', params: { id: item.id } });
        }
      }}
    />
  );
}
