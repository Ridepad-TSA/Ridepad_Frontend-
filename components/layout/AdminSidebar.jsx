'use client';

import { LayoutDashboard, CarFront, Plus, CalendarDays, Activity, Clock3 } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
const LINKS = [
  { label: 'Overview', href: '/admin/overview', icon: LayoutDashboard },
  { label: 'Inventory', href: '/admin/inventory', icon: CarFront },
  { label: 'Add vehicle', href: '/admin/inventory/new', icon: Plus },
  { label: 'Booking management', href: '/admin/bookings', icon: CalendarDays },
  { label: 'Active rentals', href: '/admin/bookings/active', icon: Activity },
  { label: 'Overdue rentals', href: '/admin/bookings/overdue', icon: Clock3 },
];
export default function AdminSidebar() { return <DashboardSidebar homeHref="/admin/overview" links={LINKS} />; }
