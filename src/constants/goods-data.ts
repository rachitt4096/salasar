export type PaymentStatus = 'Paid' | 'Partial' | 'Unpaid';

export type GoodsOrder = {
  id: string;
  customerId: string;
  date: string;
  dueDate: string;
  material: 'Sand' | 'Blocks' | 'Cement';
  qty: string;
  rate: string;
  goodsAmount: string;
  transportAmount: string;
  total: string;
  paid: string;
  remaining: string;
  status: PaymentStatus;
  site: string;
  truck: string;
  driver: string;
  source: string;
  note: string;
  color: string;
};

export type GoodsCustomer = {
  id: string;
  name: string;
  company: string;
  phone: string;
  contact: string;
  address: string;
  color: string;
  currentDemand: string;
  demandDue: string;
  totalBusiness: string;
  paidTotal: string;
  collectTotal: string;
  orders: GoodsOrder[];
};

export const goodsCustomers: GoodsCustomer[] = [
  {
    id: 'shree-balaji-builders',
    name: 'Shree Balaji Builders',
    company: 'Shree Balaji Builders Pvt Ltd',
    phone: '+91 98290 44120',
    contact: 'Mukesh Sharma',
    address: 'Vaishali Nagar, Jaipur',
    color: '#B45309',
    currentDemand: 'Sand · 22 ton',
    demandDue: 'Today 5 PM',
    totalBusiness: '₹1,10,100',
    paidTotal: '₹91,700',
    collectTotal: '₹18,400',
    orders: [
      {
        id: 'INV-2048',
        customerId: 'shree-balaji-builders',
        date: '10 Aug',
        dueDate: 'Today 5 PM',
        material: 'Sand',
        qty: '22 ton',
        rate: '₹1,650/t',
        goodsAmount: '₹29,700',
        transportAmount: '₹6,600',
        total: '₹36,300',
        paid: '₹17,900',
        remaining: '₹18,400',
        status: 'Partial',
        site: 'Vaishali Nagar Site',
        truck: 'RJ 02 PB 3301',
        driver: 'Vikram Singh',
        source: 'Banas river yard',
        note: 'Send before evening casting work.',
        color: '#B45309',
      },
      {
        id: 'INV-2031',
        customerId: 'shree-balaji-builders',
        date: '4 Aug',
        dueDate: 'Paid',
        material: 'Cement',
        qty: '180 bags',
        rate: '₹410/bag',
        goodsAmount: '₹73,800',
        transportAmount: '₹0',
        total: '₹73,800',
        paid: '₹73,800',
        remaining: '₹0',
        status: 'Paid',
        site: 'Vaishali Nagar Site',
        truck: 'RJ 14 GC 8241',
        driver: 'Rakesh Kumar',
        source: 'Depot',
        note: 'Delivered at main gate.',
        color: '#16835D',
      },
    ],
  },
  {
    id: 'mahadev-construction',
    name: 'Mahadev Construction',
    company: 'Mahadev Construction Co.',
    phone: '+91 94140 77018',
    contact: 'Dinesh Meena',
    address: 'Mansarovar, Jaipur',
    color: '#2563EB',
    currentDemand: 'Blocks · 4,800 pcs',
    demandDue: 'Tomorrow',
    totalBusiness: '₹1,93,300',
    paidTotal: '₹1,51,300',
    collectTotal: '₹42,000',
    orders: [
      {
        id: 'INV-2047',
        customerId: 'mahadev-construction',
        date: '10 Aug',
        dueDate: 'Tomorrow',
        material: 'Blocks',
        qty: '4,800 pcs',
        rate: '₹31/pc',
        goodsAmount: '₹1,48,800',
        transportAmount: '₹14,800',
        total: '₹1,63,600',
        paid: '₹1,06,800',
        remaining: '₹42,000',
        status: 'Partial',
        site: 'Mansarovar Block C',
        truck: 'RJ 27 GB 9228',
        driver: 'Naresh Meena',
        source: 'Factory',
        note: 'Unload at tower 2 side.',
        color: '#2563EB',
      },
      {
        id: 'INV-2029',
        customerId: 'mahadev-construction',
        date: '2 Aug',
        dueDate: 'Paid',
        material: 'Sand',
        qty: '18 ton',
        rate: '₹1,650/t',
        goodsAmount: '₹29,700',
        transportAmount: '₹0',
        total: '₹29,700',
        paid: '₹29,700',
        remaining: '₹0',
        status: 'Paid',
        site: 'Mansarovar Block B',
        truck: 'RJ 19 GA 4450',
        driver: 'Mohit Sharma',
        source: 'Banas river yard',
        note: 'Old order cleared.',
        color: '#B45309',
      },
    ],
  },
  {
    id: 'rk-infra',
    name: 'R.K. Infra',
    company: 'R.K. Infra Projects',
    phone: '+91 99822 11880',
    contact: 'Rajesh Verma',
    address: 'Ajmer Road, Jaipur',
    color: '#16835D',
    currentDemand: 'Cement · 300 bags',
    demandDue: '12 Aug',
    totalBusiness: '₹1,31,900',
    paidTotal: '₹1,31,900',
    collectTotal: '₹0',
    orders: [
      {
        id: 'INV-2046',
        customerId: 'rk-infra',
        date: '9 Aug',
        dueDate: '12 Aug',
        material: 'Cement',
        qty: '300 bags',
        rate: '₹410/bag',
        goodsAmount: '₹1,23,000',
        transportAmount: '₹8,900',
        total: '₹1,31,900',
        paid: '₹1,31,900',
        remaining: '₹0',
        status: 'Paid',
        site: 'Ajmer Road Plot',
        truck: 'RJ 14 GC 8241',
        driver: 'Rakesh Kumar',
        source: 'Depot',
        note: 'Full advance received.',
        color: '#16835D',
      },
    ],
  },
  {
    id: 'surya-residency',
    name: 'Surya Residency',
    company: 'Surya Residency LLP',
    phone: '+91 90019 55072',
    contact: 'Anil Jain',
    address: 'Kalwar Road, Jaipur',
    color: '#B45309',
    currentDemand: 'Sand · 16 ton',
    demandDue: '13 Aug',
    totalBusiness: '₹31,200',
    paidTotal: '₹21,600',
    collectTotal: '₹9,600',
    orders: [
      {
        id: 'INV-2045',
        customerId: 'surya-residency',
        date: '8 Aug',
        dueDate: '13 Aug',
        material: 'Sand',
        qty: '16 ton',
        rate: '₹1,650/t',
        goodsAmount: '₹26,400',
        transportAmount: '₹4,800',
        total: '₹31,200',
        paid: '₹21,600',
        remaining: '₹9,600',
        status: 'Partial',
        site: 'Kalwar Road Phase 2',
        truck: 'RJ 02 PB 3301',
        driver: 'Vikram Singh',
        source: 'Banas river yard',
        note: 'Second trip may be needed.',
        color: '#B45309',
      },
    ],
  },
  {
    id: 'om-sai-contractors',
    name: 'Om Sai Contractors',
    company: 'Om Sai Contractors',
    phone: '+91 97841 22009',
    contact: 'Suresh Yadav',
    address: 'Tonk Road, Jaipur',
    color: '#16835D',
    currentDemand: 'Cement · 180 bags',
    demandDue: '15 Aug',
    totalBusiness: '₹79,200',
    paidTotal: '₹56,700',
    collectTotal: '₹22,500',
    orders: [
      {
        id: 'INV-2044',
        customerId: 'om-sai-contractors',
        date: '7 Aug',
        dueDate: '15 Aug',
        material: 'Cement',
        qty: '180 bags',
        rate: '₹410/bag',
        goodsAmount: '₹73,800',
        transportAmount: '₹5,400',
        total: '₹79,200',
        paid: '₹56,700',
        remaining: '₹22,500',
        status: 'Partial',
        site: 'Tonk Road Site',
        truck: 'RJ 14 GC 8241',
        driver: 'Rakesh Kumar',
        source: 'Depot',
        note: 'Collect balance on next delivery.',
        color: '#16835D',
      },
    ],
  },
  {
    id: 'city-build-mart',
    name: 'City Build Mart',
    company: 'City Build Mart',
    phone: '+91 98281 44017',
    contact: 'Farhan Khan',
    address: 'Sanganer, Jaipur',
    color: '#2563EB',
    currentDemand: 'Blocks · 2,500 pcs',
    demandDue: '17 Aug',
    totalBusiness: '₹81,000',
    paidTotal: '₹81,000',
    collectTotal: '₹0',
    orders: [
      {
        id: 'INV-2043',
        customerId: 'city-build-mart',
        date: '6 Aug',
        dueDate: '17 Aug',
        material: 'Blocks',
        qty: '2,500 pcs',
        rate: '₹31/pc',
        goodsAmount: '₹77,500',
        transportAmount: '₹3,500',
        total: '₹81,000',
        paid: '₹81,000',
        remaining: '₹0',
        status: 'Paid',
        site: 'Sanganer Godown',
        truck: 'RJ 27 GB 9228',
        driver: 'Naresh Meena',
        source: 'Factory',
        note: 'Retail stock order.',
        color: '#2563EB',
      },
    ],
  },
];

export const customerOrders = goodsCustomers.map((customer) => ({
  id: customer.id,
  customer: customer.name,
  site: customer.orders[0].site,
  wants: customer.orders[0].material,
  qty: customer.orders[0].qty,
  needBy: customer.demandDue,
  pending: customer.collectTotal,
  paid: customer.paidTotal,
  remaining: customer.collectTotal,
  truck: customer.orders[0].truck,
  goodsAmount: customer.orders[0].goodsAmount,
  transportAmount: customer.orders[0].transportAmount,
  totalAmount: customer.orders[0].total,
  color: customer.color,
  paymentStatus: customer.collectTotal === '₹0' ? 'Paid' : 'Partial',
}));

export const futureOrders = [
  { customer: 'Ganpati Developers', wants: 'Sand', qty: '30 ton', date: '14 Aug', color: '#B45309' },
  { customer: 'Arihant Homes', wants: 'Blocks', qty: '6,000 pcs', date: '16 Aug', color: '#2563EB' },
  { customer: 'S.K. Traders', wants: 'Cement', qty: '500 bags', date: '18 Aug', color: '#16835D' },
  { customer: 'Royal Heights', wants: 'Sand', qty: '24 ton', date: '20 Aug', color: '#B45309' },
  { customer: 'Pinkcity Infra', wants: 'Cement', qty: '420 bags', date: '22 Aug', color: '#16835D' },
  { customer: 'Bhawani Sites', wants: 'Blocks', qty: '8,000 pcs', date: '25 Aug', color: '#2563EB' },
] as const;

export const ownTruckLoads = [
  {
    id: 'GL-118',
    tripId: 'TR-2048',
    material: 'Sand',
    truck: 'RJ 02 PB 3301',
    driver: 'Vikram Singh',
    source: 'Banas river yard',
    destination: 'Jaipur stockyard',
    qty: '18 ton',
    status: 'Bringing',
    color: '#B45309',
    goodsAmount: '₹29,700',
    transportAmount: '₹6,600',
    totalAmount: '₹36,300',
  },
  {
    id: 'GL-117',
    tripId: 'TR-2047',
    material: 'Blocks',
    truck: 'RJ 27 GB 9228',
    driver: 'Naresh Meena',
    source: 'Factory',
    destination: 'Mahadev Construction',
    qty: '3,200 pcs',
    status: 'Delivery',
    color: '#2563EB',
    goodsAmount: '₹99,200',
    transportAmount: '₹14,800',
    totalAmount: '₹1,14,000',
  },
  {
    id: 'GL-116',
    tripId: 'TR-2046',
    material: 'Cement',
    truck: 'RJ 14 GC 8241',
    driver: 'Rakesh Kumar',
    source: 'Depot',
    destination: 'Jaipur stockyard',
    qty: '220 bags',
    status: 'Bringing',
    color: '#16835D',
    goodsAmount: '₹90,200',
    transportAmount: '₹8,900',
    totalAmount: '₹99,100',
  },
] as const;

export function getGoodsCustomer(customerId: string) {
  return goodsCustomers.find((customer) => customer.id === customerId);
}

export function getGoodsOrder(orderId: string) {
  for (const customer of goodsCustomers) {
    const order = customer.orders.find((item) => item.id === orderId);
    if (order) {
      return { customer, order };
    }
  }

  return undefined;
}
