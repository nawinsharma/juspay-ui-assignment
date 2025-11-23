
import nataliCraig from '../assets/images/profiles/natali-craig.png';
import drewCano from '../assets/images/profiles/drew-cano.png';
import orlandoDiggs from '../assets/images/profiles/orlando-diggs.png';
import andiLane from '../assets/images/profiles/andi-lane.png';
import kateMorrison from '../assets/images/profiles/kate-morrison.png';
import korayOkumus from '../assets/images/profiles/koray-okumus.png';

import profile1 from '../assets/images/profiles/profile1.png';
import profile2 from '../assets/images/profiles/profile2.png';
import profile3 from '../assets/images/profiles/profile3.png';
import profile4 from '../assets/images/profiles/profile4.png';
import profile5 from '../assets/images/profiles/profile5.png';

export const contacts = [
  { name: 'Natali Craig', avatar: nataliCraig },
  { name: 'Drew Cano', avatar: drewCano },
  { name: 'Orlando Diggs', avatar: orlandoDiggs },
  { name: 'Andi Lane', avatar: andiLane },
  { name: 'Kate Morrison', avatar: kateMorrison },
  { name: 'Koray Okumus', avatar: korayOkumus }
];

export const activities = [
  { user: 'You', action: 'have a bug that needs...', time: 'Just now', avatar: profile1 },
  { user: 'Released', action: 'a new version', time: '59 minutes ago', avatar: profile2 },
  { user: 'Submitted', action: 'a bug', time: '12 hours ago', avatar: profile3 },
  { user: 'Modified', action: 'a data in Page X', time: 'Today, 11:59 AM', avatar: profile4 },
  { user: 'Deleted', action: 'a page in Project X', time: 'Feb 2, 2023', avatar: profile5 }
];

export const topSellingProducts = [
  { name: 'ASOS Ridley High Waist', price: '$79.49', quantity: 82, amount: '$6,518.18' },
  { name: 'Marco Lightweight Shirt', price: '$128.50', quantity: 37, amount: '$4,754.50' },
  { name: 'Half Sleeve Shirt', price: '$39.99', quantity: 64, amount: '$2,559.36' },
  { name: 'Lightweight Jacket', price: '$20.00', quantity: 184, amount: '$3,680.00' },
];

export const revenueByLocation = [
  { city: 'New York', amount: 72 },   // 72% complete
  { city: 'San Francisco', amount: 39 },
  { city: 'Sydney', amount: 25 },
  { city: 'Singapore', amount: 61 },
];


export const totalSalesData = [
  { type: 'Direct', amount: '$300.56', color: 'bg-gray-800' },
  { type: 'Affiliate', amount: '$135.18', color: 'bg-blue-500' },
  { type: 'Sponsored', amount: '$154.02', color: 'bg-green-400' },
  { type: 'E-mail', amount: '$48.96', color: 'bg-purple-400' }
];

export const orders = [
  { id: "#CM9801", user: { name: "Natali Craig", avatar: null }, project: "Landing Page", address: "Meadow Lane Oakland", date: "Just now", status: "In Progress", dateSort: new Date("2024-02-28T10:00:00") },
  { id: "#CM9802", user: { name: "Kate Morrison", avatar: null }, project: "CRM Admin pages", address: "Larry San Francisco", date: "A minute ago", status: "Complete", dateSort: new Date("2024-02-28T09:59:00") },
  { id: "#CM9803", user: { name: "Drew Cano", avatar: null }, project: "Client Project", address: "Bagwell Avenue Ocala", date: "1 hour ago", status: "Pending", dateSort: new Date("2024-02-28T09:00:00") },
  { id: "#CM9804", user: { name: "Orlando Diggs", avatar: null }, project: "Admin Dashboard", address: "Washburn Baton Rouge", date: "Yesterday", status: "Approved", dateSort: new Date("2024-02-27T10:00:00") },
  { id: "#CM9805", user: { name: "Andi Lane", avatar: null }, project: "App Landing Page", address: "Nest Lane Olivette", date: "Feb 2, 2023", status: "Rejected", dateSort: new Date("2023-02-02T10:00:00") },
  { id: "#CM9806", user: { name: "John Smith", avatar: null }, project: "E-commerce Site", address: "Broadway New York", date: "Feb 3, 2023", status: "In Progress", dateSort: new Date("2023-02-03T10:00:00") },
  { id: "#CM9807", user: { name: "Sarah Johnson", avatar: null }, project: "Portfolio Website", address: "Sunset Boulevard LA", date: "Feb 4, 2023", status: "Complete", dateSort: new Date("2023-02-04T10:00:00") },
  { id: "#CM9808", user: { name: "Mike Davis", avatar: null }, project: "Mobile App", address: "Michigan Avenue Chicago", date: "Feb 5, 2023", status: "Pending", dateSort: new Date("2023-02-05T10:00:00") },
  { id: "#CM9809", user: { name: "Emma Wilson", avatar: null }, project: "Dashboard Redesign", address: "Pine Street Seattle", date: "Feb 6, 2023", status: "Approved", dateSort: new Date("2023-02-06T10:00:00") },
  { id: "#CM9810", user: { name: "Alex Brown", avatar: null }, project: "Marketing Site", address: "Oak Street Portland", date: "Feb 7, 2023", status: "Complete", dateSort: new Date("2023-02-07T10:00:00") },
  { id: "#CM9811", user: { name: "Lisa Garcia", avatar: null }, project: "Data Analytics Platform", address: "Main Street Boston", date: "Feb 8, 2023", status: "In Progress", dateSort: new Date("2023-02-08T10:00:00") },
  { id: "#CM9812", user: { name: "David Miller", avatar: null }, project: "Learning Management System", address: "University Avenue Austin", date: "Feb 9, 2023", status: "Pending", dateSort: new Date("2023-02-09T10:00:00") },
  { id: "#CM9813", user: { name: "Rachel Green", avatar: null }, project: "Event Management App", address: "Festival Street Miami", date: "Feb 10, 2023", status: "Rejected", dateSort: new Date("2023-02-10T10:00:00") },
  { id: "#CM9814", user: { name: "Tom Anderson", avatar: null }, project: "Inventory System", address: "Industrial Park Denver", date: "Feb 11, 2023", status: "Complete", dateSort: new Date("2023-02-11T10:00:00") },
  { id: "#CM9815", user: { name: "Jennifer Lee", avatar: null }, project: "Healthcare Portal", address: "Medical Center Phoenix", date: "Feb 12, 2023", status: "Approved", dateSort: new Date("2023-02-12T10:00:00") },
  { id: "#CM9816", user: { name: "Brian White", avatar: null }, project: "Job Board App", address: "King Street Charleston", date: "Feb 13, 2023", status: "Pending", dateSort: new Date("2023-02-13T10:00:00") },
  { id: "#CM9817", user: { name: "Olivia Moore", avatar: null }, project: "HR Management Tool", address: "Queen Street Toronto", date: "Feb 14, 2023", status: "Complete", dateSort: new Date("2023-02-14T10:00:00") },
  { id: "#CM9818", user: { name: "Ethan Taylor", avatar: null }, project: "Design System", address: "Creative Avenue Atlanta", date: "Feb 15, 2023", status: "In Progress", dateSort: new Date("2023-02-15T10:00:00") },
  { id: "#CM9819", user: { name: "Sophia Martin", avatar: null }, project: "Disaster Response Portal", address: "Firehouse Road Houston", date: "Feb 16, 2023", status: "Approved", dateSort: new Date("2023-02-16T10:00:00") },
  { id: "#CM9820", user: { name: "Daniel Walker", avatar: null }, project: "Recipe App", address: "Baker Street London", date: "Feb 17, 2023", status: "Rejected", dateSort: new Date("2023-02-17T10:00:00") },
  { id: "#CM9821", user: { name: "Ella Harris", avatar: null }, project: "Customer Support Dashboard", address: "Helpdesk Lane Dallas", date: "Feb 18, 2023", status: "In Progress", dateSort: new Date("2023-02-18T10:00:00") },
  { id: "#CM9822", user: { name: "Logan Martinez", avatar: null }, project: "Student Portal", address: "Campus Circle Raleigh", date: "Feb 19, 2023", status: "Pending", dateSort: new Date("2023-02-19T10:00:00") },
  { id: "#CM9823", user: { name: "Grace Thompson", avatar: null }, project: "Farm Management System", address: "Harvest Road Boise", date: "Feb 20, 2023", status: "Complete", dateSort: new Date("2023-02-20T10:00:00") },
  { id: "#CM9824", user: { name: "Henry Scott", avatar: null }, project: "Safety Compliance App", address: "Rescue Blvd Tampa", date: "Feb 21, 2023", status: "Approved", dateSort: new Date("2023-02-21T10:00:00") },
  { id: "#CM9825", user: { name: "Chloe Adams", avatar: null }, project: "Travel Booking Platform", address: "Aviation Road Nashville", date: "Feb 22, 2023", status: "In Progress", dateSort: new Date("2023-02-22T10:00:00") },
  { id: "#CM9826", user: { name: "Lucas Mitchell", avatar: null }, project: "Telemedicine App", address: "Wellness Drive Baltimore", date: "Feb 23, 2023", status: "Complete", dateSort: new Date("2023-02-23T10:00:00") },
  { id: "#CM9827", user: { name: "Amelia Perez", avatar: null }, project: "Space Education Portal", address: "Galaxy Street Houston", date: "Feb 24, 2023", status: "Pending", dateSort: new Date("2023-02-24T10:00:00") },
  { id: "#CM9828", user: { name: "Jack Rivera", avatar: null }, project: "AgriTech CRM", address: "Greenfield Road Fresno", date: "Feb 25, 2023", status: "Rejected", dateSort: new Date("2023-02-25T10:00:00") },
  { id: "#CM9829", user: { name: "Zoe Cooper", avatar: null }, project: "Music Collaboration App", address: "Harmony Lane Austin", date: "Feb 26, 2023", status: "Complete", dateSort: new Date("2023-02-26T10:00:00") },
  { id: "#CM9830", user: { name: "Nathan Bell", avatar: null }, project: "Lab Management System", address: "Science Park San Diego", date: "Feb 27, 2023", status: "Approved", dateSort: new Date("2023-02-27T10:00:00") },
];

