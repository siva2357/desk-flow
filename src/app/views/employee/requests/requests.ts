import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface RequestItem {
  id: string;
  source: string;
  sourceBadge: string;
  title: string;
  customer: string;
  tier: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  slaMinutesRemaining: number;
  initialSlaMinutes: number;
  complexityScore: number;
  financialImpact: string;
  assignedTo: string | null;
  assignedAvatar?: string;
  status: 'Unassigned' | 'Calculating' | 'Escalated' | 'Assigned';
  timestamp: string;
  externalRef: string;
  payload: {
    transactionId: string;
    originatingIp: string;
    endpoint: string;
    currency?: string;
    amount?: number;
    errorSummary: string;
    callbackWebhook: string;
  };
}

export interface TeamMemberOption {
  id: string;
  name: string;
  role: string;
  avatar: string;
  activeLoad: number;
  maxLoad: number;
  available: boolean;
}

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './requests.html',
  styleUrl: './requests.css',
})
export class Requests {
  // Filters & State
  selectedStatusTab = signal<string>('All');
  searchQuery = signal<string>('');
  selectedPriority = signal<string>('All');
  selectedSource = signal<string>('All');

  // Currently Selected Request for Drawer/Modal
  activeRequest = signal<RequestItem | null>(null);
  activeModalTab = signal<'payload' | 'calculate' | 'dispatch' | 'escalate'>('calculate');

  // Calculator inputs in active modal
  calcRiskFactor = signal<number>(2); // 1-3
  calcDataPoints = signal<number>(45);
  calcImpactTier = signal<string>('Medium');

  // Dispatch selection
  selectedAssigneeId = signal<string>('');
  dispatchNote = signal<string>('');
  escalationReason = signal<string>('SLA Threat Threshold');

  // Team Specialists
  teamMembers = signal<TeamMemberOption[]>([
    {
      id: 'TM-1',
      name: 'Marcus Vance',
      role: 'Senior Settlement Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      activeLoad: 2,
      maxLoad: 5,
      available: true
    },
    {
      id: 'TM-2',
      name: 'Elena Rostova',
      role: 'Escalation & Compliance Engineer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
      activeLoad: 4,
      maxLoad: 5,
      available: true
    },
    {
      id: 'TM-3',
      name: 'Devon Miles',
      role: 'Resolution Analyst',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
      activeLoad: 1,
      maxLoad: 5,
      available: true
    },
    {
      id: 'TM-4',
      name: 'Sophia Chen',
      role: 'Operations Lead Specialist',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120',
      activeLoad: 5,
      maxLoad: 5,
      available: false
    }
  ]);

  // Request Pool
  requests = signal<RequestItem[]>([
    {
      id: 'REQ-9104',
      source: 'FinTech Portal',
      sourceBadge: 'df-badge-purple',
      title: 'High-Value Settlement Discrepancy Calculation',
      customer: 'Apex Global Corp',
      tier: 'Enterprise Tier',
      priority: 'Critical',
      slaMinutesRemaining: 14,
      initialSlaMinutes: 60,
      complexityScore: 8.8,
      financialImpact: '$184,200 USD',
      assignedTo: null,
      status: 'Escalated',
      timestamp: 'Just now',
      externalRef: 'EXT-FIN-882194',
      payload: {
        transactionId: 'TXN-9948271A',
        originatingIp: '198.51.100.44',
        endpoint: 'https://api.partner-settle.com/v3/reconcile',
        currency: 'USD',
        amount: 184200,
        errorSummary: 'Ledger discrepancy detected: delta of 1.4% between settlement batches',
        callbackWebhook: 'https://webhook.apex-global.com/notify/deskflow'
      }
    },
    {
      id: 'REQ-9103',
      source: 'CRM Webhook',
      sourceBadge: 'df-badge-blue',
      title: 'Tiered Pricing Escalation for Multi-Seat Contract',
      customer: 'Nordic Logistics Ltd',
      tier: 'Pro Tier',
      priority: 'High',
      slaMinutesRemaining: 42,
      initialSlaMinutes: 120,
      complexityScore: 6.2,
      financialImpact: '$45,000 ARR',
      assignedTo: null,
      status: 'Unassigned',
      timestamp: '5 mins ago',
      externalRef: 'CRM-SF-004291',
      payload: {
        transactionId: 'CRM-LEAD-33198',
        originatingIp: '54.210.82.19',
        endpoint: 'https://salesforce.com/services/apexrest/v1/contract-escalate',
        amount: 45000,
        errorSummary: 'Special discount approval requested (> 25% discount threshold requires VP signoff)',
        callbackWebhook: 'https://hooks.nordiclogistics.com/contracts'
      }
    },
    {
      id: 'REQ-9102',
      source: 'Partner API',
      sourceBadge: 'df-badge-amber',
      title: 'Data Ingestion Rate Limit Exemption Request',
      customer: 'DataStream Systems',
      tier: 'Standard Tier',
      priority: 'Medium',
      slaMinutesRemaining: 95,
      initialSlaMinutes: 180,
      complexityScore: 3.5,
      financialImpact: '$12,000 USD',
      assignedTo: null,
      status: 'Calculating',
      timestamp: '14 mins ago',
      externalRef: 'GW-PRT-7712',
      payload: {
        transactionId: 'GW-RATE-9921',
        originatingIp: '13.228.112.7',
        endpoint: 'https://gateway.deskflow.io/v1/limits/override',
        errorSummary: 'Client hitting 429 Too Many Requests limit during midnight backup dump',
        callbackWebhook: 'https://api.datastream.io/alerts'
      }
    },
    {
      id: 'REQ-9101',
      source: 'Customer App',
      sourceBadge: 'df-badge-emerald',
      title: 'Billing Account Re-evaluation & Tax Adjustment',
      customer: 'Solaria Energy Inc',
      tier: 'Enterprise Tier',
      priority: 'Medium',
      slaMinutesRemaining: 120,
      initialSlaMinutes: 240,
      complexityScore: 4.6,
      financialImpact: '$8,400 USD',
      assignedTo: 'Marcus Vance',
      assignedAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      status: 'Assigned',
      timestamp: '22 mins ago',
      externalRef: 'APP-MOB-9931',
      payload: {
        transactionId: 'INV-2026-904',
        originatingIp: '172.56.21.99',
        endpoint: 'https://mobile-backend.deskflow.io/billing/recalc',
        errorSummary: 'VAT calculation mismatch for cross-border EU tax exemption certificate',
        callbackWebhook: 'https://solaria-energy.com/billing-webhook'
      }
    },
    {
      id: 'REQ-9100',
      source: 'Core Banking API',
      sourceBadge: 'df-badge-purple',
      title: 'Automated Fraud Flag Resolution & Clearance',
      customer: 'Vanguard Trading',
      tier: 'Enterprise Tier',
      priority: 'Critical',
      slaMinutesRemaining: 7,
      initialSlaMinutes: 45,
      complexityScore: 9.4,
      financialImpact: '$410,000 USD',
      assignedTo: null,
      status: 'Escalated',
      timestamp: '35 mins ago',
      externalRef: 'BNK-FRAUD-552',
      payload: {
        transactionId: 'TXN-FRD-000881',
        originatingIp: '185.199.108.153',
        endpoint: 'https://banking-sec.vanguard.com/alerts/fraud-hold',
        amount: 410000,
        errorSummary: 'Suspicious outbound wire detected: velocity trigger 4 txns within 30 seconds',
        callbackWebhook: 'https://vanguard-security.net/webhook/clearance'
      }
    },
    {
      id: 'REQ-9099',
      source: 'FinTech Portal',
      sourceBadge: 'df-badge-purple',
      title: 'Cross-Border Merchant Payment Routing Timeout',
      customer: 'TransOceanic Pay',
      tier: 'Pro Tier',
      priority: 'High',
      slaMinutesRemaining: 55,
      initialSlaMinutes: 120,
      complexityScore: 7.1,
      financialImpact: '$62,000 USD',
      assignedTo: 'Elena Rostova',
      assignedAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
      status: 'Assigned',
      timestamp: '48 mins ago',
      externalRef: 'EXT-TOP-1102',
      payload: {
        transactionId: 'ROUTER-ERR-441',
        originatingIp: '104.244.42.1',
        endpoint: 'https://router.transoceanic.pay/v2/apac',
        errorSummary: 'Gateway 504 Gateway Timeout during currency conversion handshake with Tokyo hub',
        callbackWebhook: 'https://transoceanic.pay/webhook'
      }
    }
  ]);

  // Filtered requests computation
  filteredRequests = computed(() => {
    let list = this.requests();
    const tab = this.selectedStatusTab();
    const query = this.searchQuery().toLowerCase().trim();
    const priority = this.selectedPriority();
    const source = this.selectedSource();

    if (tab !== 'All') {
      list = list.filter(r => r.status === tab);
    }

    if (priority !== 'All') {
      list = list.filter(r => r.priority === priority);
    }

    if (source !== 'All') {
      list = list.filter(r => r.source === source);
    }

    if (query) {
      list = list.filter(r =>
        r.id.toLowerCase().includes(query) ||
        r.title.toLowerCase().includes(query) ||
        r.customer.toLowerCase().includes(query) ||
        r.externalRef.toLowerCase().includes(query)
      );
    }

    return list;
  });

  // Open drawer/modal for inspection & calculation
  inspectRequest(req: RequestItem): void {
    this.activeRequest.set(req);
    this.activeModalTab.set('calculate');
    this.selectedAssigneeId.set('');
    this.dispatchNote.set('');
  }

  closeModal(): void {
    this.activeRequest.set(null);
  }

  // Calculate & check effort
  recalculateScore(): void {
    const current = this.activeRequest();
    if (!current) return;

    // Calculation algorithm based on risk & data points
    const calculated = (this.calcRiskFactor() * 2.5) + (this.calcDataPoints() * 0.05);
    const rounded = Math.min(Math.round(calculated * 10) / 10, 10);

    const updated = {
      ...current,
      complexityScore: rounded,
      status: 'Calculating' as const
    };

    this.activeRequest.set(updated);
    this.requests.update(list => list.map(r => r.id === current.id ? updated : r));
  }

  // Escalate request to higher tier
  triggerEscalation(): void {
    const current = this.activeRequest();
    if (!current) return;

    const updated: RequestItem = {
      ...current,
      status: 'Escalated',
      priority: 'Critical',
      slaMinutesRemaining: Math.min(current.slaMinutesRemaining, 15)
    };

    this.activeRequest.set(updated);
    this.requests.update(list => list.map(r => r.id === current.id ? updated : r));
    this.closeModal();
  }

  // Dispatch & Assign to team member
  confirmDispatch(): void {
    const current = this.activeRequest();
    const assigneeId = this.selectedAssigneeId();
    if (!current || !assigneeId) return;

    const member = this.teamMembers().find(m => m.id === assigneeId);
    if (!member) return;

    const updated: RequestItem = {
      ...current,
      status: 'Assigned',
      assignedTo: member.name,
      assignedAvatar: member.avatar
    };

    // Update specialist load
    this.teamMembers.update(members =>
      members.map(m => m.id === assigneeId ? { ...m, activeLoad: m.activeLoad + 1 } : m)
    );

    this.requests.update(list => list.map(r => r.id === current.id ? updated : r));
    this.closeModal();
  }
}
