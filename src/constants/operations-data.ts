export const dashboardMetrics = [
  { label: 'Active trips', value: '12', delta: '+3 today', tone: 'primary' },
  { label: 'Revenue today', value: '₹48.6k', delta: '₹1.82L week', tone: 'success' },
  { label: 'Delayed', value: '2', delta: 'needs follow up', tone: 'warning' },
  { label: 'Idle vehicles', value: '3', delta: 'ready to assign', tone: 'info' },
] as const;

export const liveTrips = [
  {
    id: 'TR-2048',
    route: 'Jaipur to Delhi',
    load: 'Tiles, 7.5T',
    driver: 'Rakesh Kumar',
    vehicle: 'RJ 14 GC 8241',
    eta: '2h 20m',
    amount: '₹18,400',
    status: 'On route',
    tone: '#16835D',
  },
  {
    id: 'TR-2047',
    route: 'Ajmer to Jaipur',
    load: 'Cement bags, 5T',
    driver: 'Mohit Sharma',
    vehicle: 'RJ 19 GA 4450',
    eta: 'Loading',
    amount: '₹9,800',
    status: 'Loading',
    tone: '#B45309',
  },
  {
    id: 'TR-2046',
    route: 'Kota to Udaipur',
    load: 'Machinery, 4T',
    driver: 'Unassigned',
    vehicle: 'Pending',
    eta: 'Not started',
    amount: '₹14,200',
    status: 'Needs driver',
    tone: '#C2410C',
  },
];

export const attentionItems = [
  { title: 'RJ 27 GB 9228 maintenance due', detail: 'Service window closes tomorrow', tone: '#C2410C' },
  { title: 'TR-2046 awaiting driver', detail: 'Pickup scheduled for 4:30 PM', tone: '#B45309' },
] as const;

export const tripItems = [
  {
    id: 'TR-2048',
    title: 'TR-2048',
    detail: 'Jaipur to Delhi',
    meta: 'Rakesh Kumar · RJ 14 GC 8241 · 2h 20m remaining',
    truckNumber: 'RJ 14 GC 8241',
    truckCapacity: '7.5T',
    source: 'Jaipur',
    destination: 'Delhi',
    driverName: 'Rakesh Kumar',
    companyName: 'Salasar Ceramics',
    fuelRequired: '42 L',
    fuelAvailableLitres: '68 L',
    fuelAvailable: '64%',
    timeRemaining: '2h 20m left',
    distanceLeftPercent: 33,
    amount: '₹18,400',
    status: 'On route',
    color: '#16835D',
    warnings: [
      { label: 'Fuel 68 L', color: '#16835D' },
      { label: 'On time', color: '#16835D' },
    ],
  },
  {
    id: 'TR-2047',
    title: 'TR-2047',
    detail: 'Ajmer to Jaipur',
    meta: 'Mohit Sharma · RJ 19 GA 4450 · loading at origin',
    truckNumber: 'RJ 19 GA 4450',
    truckCapacity: '5T',
    source: 'Ajmer',
    destination: 'Jaipur',
    driverName: 'Mohit Sharma',
    companyName: 'Shree Cement Depot',
    fuelRequired: '24 L',
    fuelAvailableLitres: '31 L',
    fuelAvailable: '31%',
    timeRemaining: '35m delay',
    distanceLeftPercent: 100,
    amount: '₹9,800',
    status: 'Loading',
    color: '#D97706',
    warnings: [
      { label: 'Fuel 31 L', color: '#B45309' },
      { label: 'Loading delay', color: '#B45309' },
    ],
  },
  {
    id: 'TR-2046',
    title: 'TR-2046',
    detail: 'Kota to Udaipur',
    meta: 'Driver assignment pending · pickup at 4:30 PM',
    truckNumber: 'Not assigned',
    truckCapacity: '4T',
    source: 'Kota',
    destination: 'Udaipur',
    driverName: 'Not assigned',
    companyName: 'Kota Machine Works',
    fuelRequired: '58 L',
    fuelAvailableLitres: 'Unknown',
    fuelAvailable: 'Unknown',
    timeRemaining: 'Pickup 4:30 PM',
    distanceLeftPercent: 100,
    amount: '₹14,200',
    status: 'Unassigned',
    color: '#C2410C',
    warnings: [
      { label: 'Fuel unknown', color: '#C2410C' },
      { label: 'Pickup risk', color: '#C2410C' },
    ],
  },
] as const;

export const completedTripItems = [
  {
    id: 'TR-2038',
    title: 'TR-2038',
    detail: 'Jaipur to Gurgaon',
    meta: 'Completed today · Suresh Yadav · RJ 14 GC 1180',
    truckNumber: 'RJ 14 GC 1180',
    truckCapacity: '7T',
    source: 'Jaipur',
    destination: 'Gurgaon',
    driverName: 'Suresh Yadav',
    companyName: 'NCR Tiles Mart',
    fuelRequired: '39 L',
    fuelAvailableLitres: '22 L',
    fuelAvailable: '22%',
    timeRemaining: 'Delivered 11:40 AM',
    distanceLeftPercent: 0,
    amount: '₹16,900',
    status: 'Completed',
    completedDay: 'Today',
    completedDate: '2026-08-10',
    color: '#16835D',
    warnings: [
      { label: 'Today', color: '#16835D' },
      { label: 'Paid', color: '#16835D' },
    ],
  },
  {
    id: 'TR-2037',
    title: 'TR-2037',
    detail: 'Ajmer to Beawar',
    meta: 'Completed yesterday · Imran Khan · RJ 19 GA 2091',
    truckNumber: 'RJ 19 GA 2091',
    truckCapacity: '5T',
    source: 'Ajmer',
    destination: 'Beawar',
    driverName: 'Imran Khan',
    companyName: 'Aravali Cement',
    fuelRequired: '18 L',
    fuelAvailableLitres: '44 L',
    fuelAvailable: '48%',
    timeRemaining: 'Delivered yesterday',
    distanceLeftPercent: 0,
    amount: '₹7,600',
    status: 'Completed',
    completedDay: 'Yesterday',
    completedDate: '2026-08-09',
    color: '#16835D',
    warnings: [
      { label: 'Yesterday', color: '#16835D' },
      { label: 'Paid', color: '#16835D' },
    ],
  },
  {
    id: 'TR-2032',
    title: 'TR-2032',
    detail: 'Kota to Jodhpur',
    meta: 'Completed this week · Naresh Meena · RJ 27 GB 7741',
    truckNumber: 'RJ 27 GB 7741',
    truckCapacity: '9T',
    source: 'Kota',
    destination: 'Jodhpur',
    driverName: 'Naresh Meena',
    companyName: 'Marwar Hardware',
    fuelRequired: '61 L',
    fuelAvailableLitres: '35 L',
    fuelAvailable: '36%',
    timeRemaining: 'Delivered Tue',
    distanceLeftPercent: 0,
    amount: '₹22,300',
    status: 'Completed',
    completedDay: 'This week',
    completedDate: '2026-08-04',
    color: '#16835D',
    warnings: [
      { label: 'This week', color: '#16835D' },
      { label: 'Settled', color: '#16835D' },
    ],
  },
] as const;

export const tripDetails = [
  {
    id: 'TR-2048',
    route: 'Jaipur to Delhi',
    status: 'On route',
    color: '#16835D',
    companyName: 'Salasar Ceramics',
    load: 'Tiles, 7.5T',
    amount: '₹18,400',
    fuelRequired: '42 L',
    fuelAvailableLitres: '68 L',
    distanceLeftPercent: 33,
    paymentStatus: '₹12,000 advance received · ₹6,400 pending on delivery',
    driver: {
      name: 'Rakesh Kumar',
      phone: '+91 98765 41028',
      license: 'RJ14-2018-445921',
      onTimeScore: '93%',
    },
    vehicle: {
      number: 'RJ 14 GC 8241',
      model: 'Tata 407',
      fuel: '68 L · 64%',
      range: '410 km estimated range',
      odometer: '84,120 km',
    },
    timing: {
      pickup: 'Today, 7:15 AM',
      expectedDelivery: 'Today, 6:20 PM',
      eta: '2h 20m remaining',
      delay: 'On schedule',
    },
    routePlan: {
      origin: 'VKI Industrial Area, Jaipur',
      destination: 'Okhla Phase II, Delhi',
      currentLocation: 'NH48 near Neemrana',
      distance: '278 km total · 91 km remaining',
    },
    warnings: [
      { title: 'Fuel healthy', detail: '68 L fuel is enough for the 42 L route requirement with reserve.', color: '#16835D' },
      { title: 'Time healthy', detail: 'ETA is within delivery window.', color: '#16835D' },
    ],
    timeline: ['Loaded at 7:05 AM', 'Departed Jaipur at 7:15 AM', 'Crossed Shahpura at 9:40 AM', 'Last GPS update 5 min ago'],
  },
  {
    id: 'TR-2047',
    route: 'Ajmer to Jaipur',
    status: 'Loading',
    color: '#B45309',
    companyName: 'Shree Cement Depot',
    load: 'Cement bags, 5T',
    amount: '₹9,800',
    fuelRequired: '24 L',
    fuelAvailableLitres: '31 L',
    distanceLeftPercent: 100,
    paymentStatus: 'No advance received · collect full amount after unload',
    driver: {
      name: 'Mohit Sharma',
      phone: '+91 98290 11844',
      license: 'RJ19-2019-118032',
      onTimeScore: '88%',
    },
    vehicle: {
      number: 'RJ 19 GA 4450',
      model: 'Eicher Pro',
      fuel: '31 L · 31%',
      range: '150 km estimated range',
      odometer: '62,880 km',
    },
    timing: {
      pickup: 'Today, 1:00 PM',
      expectedDelivery: 'Today, 5:30 PM',
      eta: 'Loading not complete',
      delay: '35 min loading delay',
    },
    routePlan: {
      origin: 'Ajmer Depot',
      destination: 'Sikar Road, Jaipur',
      currentLocation: 'Ajmer Depot loading bay',
      distance: '136 km total',
    },
    warnings: [
      { title: 'Fuel warning', detail: '31 L fuel covers the 24 L route requirement, but refuel before return trip.', color: '#B45309' },
      { title: 'Time warning', detail: 'Loading is running 35 minutes late. Call depot if not dispatched soon.', color: '#B45309' },
    ],
    timeline: ['Vehicle reached depot at 12:35 PM', 'Loading started at 1:10 PM', '20% load pending', 'Next check in 15 min'],
  },
  {
    id: 'TR-2046',
    route: 'Kota to Udaipur',
    status: 'Unassigned',
    color: '#C2410C',
    companyName: 'Kota Machine Works',
    load: 'Machinery, 4T',
    amount: '₹14,200',
    fuelRequired: '58 L',
    fuelAvailableLitres: 'Unknown',
    distanceLeftPercent: 100,
    paymentStatus: 'Advance pending · payment link not sent',
    driver: {
      name: 'Unassigned',
      phone: 'Not available',
      license: 'Not available',
      onTimeScore: 'Not available',
    },
    vehicle: {
      number: 'Pending',
      model: 'Pending assignment',
      fuel: 'Unknown',
      range: 'Assign vehicle to calculate range',
      odometer: 'Not available',
    },
    timing: {
      pickup: 'Today, 4:30 PM',
      expectedDelivery: 'Tomorrow, 11:00 AM',
      eta: 'Not started',
      delay: 'Pickup at risk',
    },
    routePlan: {
      origin: 'Kota Industrial Area',
      destination: 'Udaipur Transport Nagar',
      currentLocation: 'Not started',
      distance: '286 km total',
    },
    warnings: [
      { title: 'Fuel warning', detail: 'Vehicle not assigned, fuel cannot be verified.', color: '#C2410C' },
      { title: 'Time warning', detail: 'Pickup is at risk because no driver is assigned yet.', color: '#C2410C' },
    ],
    timeline: ['Trip created at 10:05 AM', 'Customer confirmed load at 11:20 AM', 'Driver assignment pending', 'Pickup window starts 4:30 PM'],
  },
] as const;

export function getTripDetail(id: string) {
  return tripDetails.find((trip) => trip.id === id);
}

export const driverItems = [
  {
    title: 'Rakesh Kumar',
    detail: 'On trip',
    meta: 'Jaipur to Delhi · 93% on-time score',
    amount: '₹42k earned',
    status: 'Active',
    color: '#16835D',
  },
  {
    title: 'Mohit Sharma',
    detail: 'Loading at Ajmer depot',
    meta: 'RJ 19 GA 4450 · documents verified',
    amount: '₹31k earned',
    status: 'Loading',
    color: '#B45309',
  },
  {
    title: 'Vikram Singh',
    detail: 'Available',
    meta: 'No vehicle assigned · near Kota',
    amount: 'Ready',
    status: 'Free',
    color: '#2563EB',
  },
] as const;

export type VehicleItem = {
  id: string;
  title: string;
  detail: string;
  meta: string;
  amount: string;
  status: string;
  color: string;
  hasProblem: boolean;
  vehicleState: string;
  assignedDriver: string;
  driverIssue: string;
  issueColor: string;
  paperWarning: string;
  paperColor: string;
  lastSeen: string;
  warnings: {
    label: string;
    color: string;
  }[];
};

export const vehicleItems: VehicleItem[] = [
  {
    id: 'RJ-02-PB-3301',
    title: 'RJ 02 PB 3301',
    detail: 'Mahindra Furio',
    meta: 'All okay · Vikram Singh · papers valid',
    amount: 'Ready',
    status: 'All okay',
    color: '#16835D',
    hasProblem: false,
    vehicleState: 'Available',
    assignedDriver: 'Vikram Singh',
    driverIssue: '',
    issueColor: '#16835D',
    paperWarning: '',
    paperColor: '#16835D',
    lastSeen: 'Jaipur yard · ready',
    warnings: [
      { label: 'Available', color: '#16835D' },
      { label: 'Papers valid', color: '#16835D' },
    ],
  },
  {
    id: 'RJ-14-GC-8241',
    title: 'RJ 14 GC 8241',
    detail: 'Tata 407',
    meta: 'Running with issue · Rakesh Kumar · 61% fuel',
    amount: 'Delhi route',
    status: 'Running issue',
    color: '#B45309',
    hasProblem: true,
    vehicleState: 'Running',
    assignedDriver: 'Rakesh Kumar',
    driverIssue: 'Driver reported brake noise from app',
    issueColor: '#D97706',
    paperWarning: 'Fitness expires in 6 days',
    paperColor: '#D97706',
    lastSeen: 'NH48 near Neemrana · 5 min ago',
    warnings: [
      { label: 'Driver issue', color: '#D97706' },
      { label: 'Paper expiring', color: '#D97706' },
    ],
  },
  {
    id: 'RJ-19-GA-4450',
    title: 'RJ 19 GA 4450',
    detail: 'Eicher Pro',
    meta: 'Idle out of order · Mohit Sharma · insurance expired',
    amount: 'Ajmer depot',
    status: 'Out of order',
    color: '#C2410C',
    hasProblem: true,
    vehicleState: 'Idle',
    assignedDriver: 'Mohit Sharma',
    driverIssue: 'Hydraulic lift not responding',
    issueColor: '#C2410C',
    paperWarning: 'Insurance expired yesterday',
    paperColor: '#DC2626',
    lastSeen: 'Ajmer depot · parked',
    warnings: [
      { label: 'Out of order', color: '#C2410C' },
      { label: 'Paper expired', color: '#C2410C' },
    ],
  },
  {
    id: 'RJ-27-GB-9228',
    title: 'RJ 27 GB 9228',
    detail: 'Ashok Leyland',
    meta: 'Idle broken · no driver assigned · last service 44 days ago',
    amount: 'Workshop',
    status: 'Broken',
    color: '#C2410C',
    hasProblem: true,
    vehicleState: 'Idle',
    assignedDriver: 'Unassigned',
    driverIssue: 'Engine overheating marked by driver app',
    issueColor: '#C2410C',
    paperWarning: 'Permit expires in 3 days',
    paperColor: '#B45309',
    lastSeen: 'Workshop bay 2',
    warnings: [
      { label: 'Broken', color: '#C2410C' },
      { label: 'Permit soon', color: '#B45309' },
    ],
  },
] as const;

export function getVehicleDetail(id: string): VehicleItem | undefined {
  return vehicleItems.find((vehicle) => vehicle.id === id) as VehicleItem | undefined;
}

export const moreItems = [
  {
    id: 'drivers',
    title: 'Drivers',
    detail: 'People',
    meta: 'Availability, documents, compliance, and trip readiness',
    amount: '15 drivers',
    status: 'Open',
    color: '#2563EB',
  },
  {
    title: 'Business profile',
    detail: 'Company details',
    meta: 'GST, address, owner contact, and documents',
    amount: 'Open',
    status: 'Manage',
    color: '#145DA0',
  },
  {
    title: 'Notifications',
    detail: 'Trip alerts',
    meta: 'Driver updates, payment reminders, delay alerts',
    amount: 'Enabled',
    status: 'On',
    color: '#16835D',
  },
  {
    title: 'Help and support',
    detail: 'Account assistance',
    meta: 'Raise service requests and track support tickets',
    amount: '24h SLA',
    status: 'Open',
    color: '#667085',
  },
] as const;
