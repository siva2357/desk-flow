import { NavLink } from '../models/sidebar.interface';

export const NAV_LINKS: NavLink[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'bi bi-grid-1x2',
    roles: ['manager', 'admin', 'system_admin', 'hr', 'employee']
  },
  {
    label: 'Requests',
    path: '/request',
    icon: 'bi bi-inbox',
    roles: ['manager', 'admin', 'system_admin', 'hr', 'employee']
  },
  {
    label: 'Tickets',
    path: '/tickets',
    icon: 'bi bi-ticket-detailed',
    roles: ['manager', 'admin', 'system_admin', 'hr', 'employee']
  },
  {
    label: 'Audit & Analytics',
    path: '/audit-and-analytics',
    icon: 'bi bi-graph-up',
    roles: ['manager', 'admin', 'system_admin', 'hr', 'employee']
  },
  {
    label: 'User Management',
    path: '/user-management',
    icon: 'bi bi-people',
    roles: ['manager', 'admin', 'system_admin', 'hr', 'employee']
  }
];
