import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface InboundRequest {
  id: string;
  source: string;
  sourceIcon: string;
  title: string;
  customer: string;
  tier: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  slaMinutesRemaining: number;
  calculatedEffort: string;
  status: 'Unassigned' | 'Calculating' | 'Escalated' | 'Assigned';
  timestamp: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  activeLoad: number;
  maxLoad: number;
  status: 'Available' | 'Busy' | 'Overloaded';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  // Telemetry Metrics
  totalInbound = signal(1428);
  unassignedCount = signal(38);
  escalationsCount = signal(7);
  slaCompliance = signal('98.4%');

  // Live Traffic Feed
  recentRequests = signal<InboundRequest[]>([
    {
      id: 'REQ-9104',
      source: 'FinTech Portal',
      sourceIcon: 'bi-bank',
      title: 'High-Value Settlement Discrepancy Calculation',
      customer: 'Apex Global Corp',
      tier: 'Tier 3 (Enterprise)',
      priority: 'Critical',
      slaMinutesRemaining: 14,
      calculatedEffort: 'Score: 8.5 / Complex',
      status: 'Escalated',
      timestamp: '2 mins ago'
    },
    {
      id: 'REQ-9103',
      source: 'CRM Webhook',
      sourceIcon: 'bi-hdd-network',
      title: 'Tiered Pricing Escalation for Multi-Seat Contract',
      customer: 'Nordic Logistics Ltd',
      tier: 'Tier 2 (Pro)',
      priority: 'High',
      slaMinutesRemaining: 42,
      calculatedEffort: 'Score: 6.0 / Medium',
      status: 'Unassigned',
      timestamp: '5 mins ago'
    },
    {
      id: 'REQ-9102',
      source: 'Partner API',
      sourceIcon: 'bi-cloud-arrow-down',
      title: 'Data Ingestion Rate Limit Exemption Request',
      customer: 'DataStream Systems',
      tier: 'Tier 1 (Standard)',
      priority: 'Medium',
      slaMinutesRemaining: 95,
      calculatedEffort: 'Score: 3.2 / Low',
      status: 'Calculating',
      timestamp: '12 mins ago'
    },
    {
      id: 'REQ-9101',
      source: 'Customer App',
      sourceIcon: 'bi-phone',
      title: 'Billing Account Re-evaluation & Tax Adjustment',
      customer: 'Solaria Energy Inc',
      tier: 'Tier 2 (Pro)',
      priority: 'Medium',
      slaMinutesRemaining: 110,
      calculatedEffort: 'Score: 4.8 / Medium',
      status: 'Assigned',
      timestamp: '18 mins ago'
    },
    {
      id: 'REQ-9100',
      source: 'Core Banking API',
      sourceIcon: 'bi-currency-exchange',
      title: 'Automated Fraud Flag Resolution & Clearance',
      customer: 'Vanguard Trading',
      tier: 'Tier 3 (Enterprise)',
      priority: 'Critical',
      slaMinutesRemaining: 8,
      calculatedEffort: 'Score: 9.1 / Severe',
      status: 'Escalated',
      timestamp: '24 mins ago'
    }
  ]);

  // Team Dispatch Roster
  teamRoster = signal<TeamMember[]>([
    {
      id: 'TM-1',
      name: 'Marcus Vance',
      role: 'Senior Traffic Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      activeLoad: 2,
      maxLoad: 5,
      status: 'Available'
    },
    {
      id: 'TM-2',
      name: 'Elena Rostova',
      role: 'Escalation Engineer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
      activeLoad: 4,
      maxLoad: 5,
      status: 'Busy'
    },
    {
      id: 'TM-3',
      name: 'Devon Miles',
      role: 'Resolution Analyst',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
      activeLoad: 1,
      maxLoad: 5,
      status: 'Available'
    },
    {
      id: 'TM-4',
      name: 'Sophia Chen',
      role: 'Senior Operations Lead',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120',
      activeLoad: 5,
      maxLoad: 5,
      status: 'Overloaded'
    }
  ]);

  // Quick Dispatch Simulation
  assignRequest(reqId: string, memberName: string): void {
    this.recentRequests.update(list =>
      list.map(r => r.id === reqId ? { ...r, status: 'Assigned' } : r)
    );
  }
}
