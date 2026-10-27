import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'System Admin' | 'Traffic Operations Manager' | 'Senior HR' | 'Resolution Specialist';
  permissions: string[];
  status: 'Active' | 'Invited' | 'Suspended';
  lastActive: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement {
  searchQuery = signal<string>('');
  selectedRoleFilter = signal<string>('All');
  showAddUserModal = signal<boolean>(false);

  // New user form state
  newUserName = signal<string>('');
  newUserEmail = signal<string>('');
  newUserRole = signal<'System Admin' | 'Traffic Operations Manager' | 'Senior HR' | 'Resolution Specialist'>('Resolution Specialist');
  newUserPermissions = signal<string[]>(['Dispatch Access', 'SLA Calculation']);

  users = signal<UserAccount[]>([
    {
      id: 'USR-001',
      name: 'Alex Rivera',
      email: 'alex.rivera@deskflow.io',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
      role: 'Traffic Operations Manager',
      permissions: ['Full Admin Rights', 'Traffic Dispatch', 'SLA Override', 'Escalation Tier-3'],
      status: 'Active',
      lastActive: 'Just now'
    },
    {
      id: 'USR-002',
      name: 'Marcus Vance',
      email: 'marcus.vance@deskflow.io',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      role: 'Resolution Specialist',
      permissions: ['Ticket Resolution', 'SLA Calculation', 'Internal Notes'],
      status: 'Active',
      lastActive: '12 mins ago'
    },
    {
      id: 'USR-003',
      name: 'Elena Rostova',
      email: 'elena.rostova@deskflow.io',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
      role: 'System Admin',
      permissions: ['Full Admin Rights', 'System Configuration', 'Audit Log Access', 'API Keys'],
      status: 'Active',
      lastActive: '1 hour ago'
    },
    {
      id: 'USR-004',
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@deskflow.io',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
      role: 'Senior HR',
      permissions: ['Employee Directory Access', 'Workload Supervisory Rights', 'Audit View'],
      status: 'Active',
      lastActive: '3 hours ago'
    },
    {
      id: 'USR-005',
      name: 'Devon Miles',
      email: 'devon.miles@deskflow.io',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
      role: 'Resolution Specialist',
      permissions: ['Ticket Resolution', 'SLA Calculation'],
      status: 'Active',
      lastActive: 'Yesterday'
    }
  ]);

  filteredUsers = computed(() => {
    let list = this.users();
    const role = this.selectedRoleFilter();
    const query = this.searchQuery().toLowerCase().trim();

    if (role !== 'All') {
      list = list.filter(u => u.role === role);
    }

    if (query) {
      list = list.filter(u =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.role.toLowerCase().includes(query)
      );
    }

    return list;
  });

  openModal(): void {
    this.newUserName.set('');
    this.newUserEmail.set('');
    this.newUserRole.set('Resolution Specialist');
    this.showAddUserModal.set(true);
  }

  closeModal(): void {
    this.showAddUserModal.set(false);
  }

  addUser(): void {
    const name = this.newUserName().trim();
    const email = this.newUserEmail().trim();
    if (!name || !email) return;

    const newUser: UserAccount = {
      id: `USR-00${this.users().length + 1}`,
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120',
      role: this.newUserRole(),
      permissions: ['Traffic Dispatch', 'SLA Calculation'],
      status: 'Active',
      lastActive: 'Invited just now'
    };

    this.users.update(list => [newUser, ...list]);
    this.closeModal();
  }
}
