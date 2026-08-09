import { useRouter } from 'expo-router';

import { ManagementList } from '@/components/management-list';
import { moreItems } from '@/constants/operations-data';

export default function MoreScreen() {
  const router = useRouter();

  return (
    <ManagementList
      eyebrow="Workspace"
      title="More"
      subtitle="Business settings, alerts, and account tools."
      primaryAction="Edit"
      total="Salasar Logistics"
      totalLabel="Owner account · production workspace"
      stats={[
        { label: 'Alerts enabled', value: '9' },
        { label: 'Open tickets', value: '0' },
      ]}
      filters={['All', 'People', 'Account', 'Alerts', 'Support']}
      items={moreItems}
      onItemPress={(item) => {
        if (item.id === 'drivers') {
          router.push('/drivers');
        }
      }}
    />
  );
}
