import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TicketItem {
  id: string;
  requestId: string;
  title: string;
  customer: string;
  assignee: string;
  assigneeAvatar: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'In Progress' | 'Under Review' | 'Resolved' | 'Escalated';
  slaDueTime: string;
  slaBreached: boolean;
  notesCount: number;
}

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets {
  selectedStatus = signal<string>('All');
  searchQuery = signal<string>('');

  tickets = signal<TicketItem[]>([
    {
      id: 'TCK-4012',
      requestId: 'REQ-9101',
      title: 'Tax Adjustment & VAT Cross-Border Settlement',
      customer: 'Solaria Energy Inc',
      assignee: 'Marcus Vance',
      assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      priority: 'Medium',
      status: 'In Progress',
      slaDueTime: '1h 45m remaining',
      slaBreached: false,
      notesCount: 3
    },
    {
      id: 'TCK-4011',
      requestId: 'REQ-9099',
      title: 'Cross-Border Merchant Gateway Timeout Fix',
      customer: 'TransOceanic Pay',
      assignee: 'Elena Rostova',
      assigneeAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
      priority: 'High',
      status: 'Under Review',
      slaDueTime: '42m remaining',
      slaBreached: false,
      notesCount: 5
    },
    {
      id: 'TCK-4010',
      requestId: 'REQ-9095',
      title: 'Security Token Regeneration for Webhook Ingestion',
      customer: 'Quantrix Capital',
      assignee: 'Devon Miles',
      assigneeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
      priority: 'Low',
      status: 'Resolved',
      slaDueTime: 'Resolved within SLA',
      slaBreached: false,
      notesCount: 2
    },
    {
      id: 'TCK-4009',
      requestId: 'REQ-9091',
      title: 'Enterprise Single-Sign-On Callback Mismatch',
      customer: 'Horizon Media Group',
      assignee: 'Sophia Chen',
      assigneeAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120',
      priority: 'Critical',
      status: 'Escalated',
      slaDueTime: 'BREACH RISK: 9m left',
      slaBreached: true,
      notesCount: 7
    }
  ]);

  filteredTickets = computed(() => {
    let list = this.tickets();
    const status = this.selectedStatus();
    const query = this.searchQuery().toLowerCase().trim();

    if (status !== 'All') {
      list = list.filter(t => t.status === status);
    }

    if (query) {
      list = list.filter(t =>
        t.id.toLowerCase().includes(query) ||
        t.requestId.toLowerCase().includes(query) ||
        t.title.toLowerCase().includes(query) ||
        t.customer.toLowerCase().includes(query) ||
        t.assignee.toLowerCase().includes(query)
      );
    }

    return list;
  });

  markResolved(ticketId: string): void {
    this.tickets.update(list =>
      list.map(t => t.id === ticketId ? { ...t, status: 'Resolved', slaDueTime: 'Resolved Just Now' } : t)
    );
  }
}
