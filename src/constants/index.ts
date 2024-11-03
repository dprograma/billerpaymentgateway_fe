import { faTools, faGlobe, faHandHoldingHeart, faLandmark, faHandHoldingUsd, faTv, faMobileAlt, faLightbulb, faTrash, faHotel, faPlane, faStethoscope } from '@fortawesome/free-solid-svg-icons';

export const TopBillers = [
  { name: 'Utilities', icon: faTools, description: 'Utility payments for airtime, data, electricity, and more', url: '/utilities' },
  { name: 'Educational', icon: faGlobe, description: 'Educational payments for schools, exams, and courses', url: '/educational' },
  {
    name: 'Medicals',
    icon: faStethoscope,
    description: 'Payments for healthcare services and treatments',
    url: '/medicals'
  },
  { name: 'Donations', icon: faHandHoldingHeart, description: 'Make donations to various organizations', url: '/donations' },
  { name: 'Embassies', icon: faLandmark, description: 'Payments for embassies and consular services', url: '/embassies' },
  { name: 'Contributions', icon: faHandHoldingUsd, description: 'Local Contributions between groups, clubs, societies and individuals', url: '/contributions' },
];

export const Utilities = [
  { name: 'Airtime', icon: faMobileAlt },
  { name: 'Data', icon: faGlobe },
  { name: 'Electricity', icon: faLightbulb },
  { name: 'TV Subscriptions', icon: faTv },
  { name: 'Waste Management', icon: faTrash },
  { name: 'Hotel Bookings', icon: faHotel },
  { name: 'Flight Bookings', icon: faPlane },
];
