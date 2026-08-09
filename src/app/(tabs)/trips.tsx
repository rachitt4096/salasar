import { useRouter } from 'expo-router';

import { ManagementList } from '@/components/management-list';
import { tripItems } from '@/constants/operations-data';

export default function TripsScreen() {
  const router = useRouter();

  return (
    <ManagementList
      title="Trips"
      subtitle="Plan, dispatch, and monitor every delivery."
      primaryAction="New trip"
      total="12 active · 3 idle"
      totalLabel="3 trips need owner attention"
      stats={[
        { label: 'Scheduled today', value: '8' },
        { label: 'Completed', value: '19' },
      ]}
      filters={['All', 'On route', 'Loading', 'Delayed', 'Unassigned']}
      items={tripItems}
      onPrimaryAction={() => router.push('/trip/new')}
      onStatPress={(stat) => {
        if (stat.label === 'Completed') {
          router.push('/trip/completed');
        }
      }}
      onItemPress={(item) => {
        if (item.id) {
          router.push({ pathname: '/trip/[id]', params: { id: item.id } });
        }
      }}
    />
  );
}
