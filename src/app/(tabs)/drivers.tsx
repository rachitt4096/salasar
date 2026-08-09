import { ManagementList } from '@/components/management-list';
import { driverItems } from '@/constants/operations-data';

export default function DriversScreen() {
  return (
    <ManagementList
      eyebrow="People"
      title="Drivers"
      subtitle="Track availability, compliance, and trip readiness."
      primaryAction="Add driver"
      total="15 drivers"
      totalLabel="12 on duty and 3 available"
      stats={[
        { label: 'Verified', value: '14' },
        { label: 'On leave', value: '1' },
      ]}
      filters={['All', 'Active', 'Free', 'Loading', 'Documents']}
      items={driverItems}
    />
  );
}
