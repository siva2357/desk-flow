import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AuditRecord {
  id: string;
  timestamp: string;
  action: 'DISPATCH' | 'ESCALATION' | 'CALCULATION' | 'INGESTION';
  entityId: string;
  actor: string;
  actorRole: string;
  details: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
}

@Component({
  selector: 'app-audit-and-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-and-analytics.html',
  styleUrl: './audit-and-analytics.css',
})
export class AuditAndAnalytics {
  auditLogs = signal<AuditRecord[]>([
    {
      id: 'AUD-88219',
      timestamp: 'Today, 13:12:44',
      action: 'ESCALATION',
      entityId: 'REQ-9104',
      actor: 'Alex Rivera',
      actorRole: 'Traffic Operations Manager',
      details: 'Elevated priority to Critical; fast-tracked SLA to 15 mins due to financial exposure threshold ($184k)',
      severity: 'critical'
    },
    {
      id: 'AUD-88218',
      timestamp: 'Today, 13:08:12',
      action: 'DISPATCH',
      entityId: 'REQ-9101',
      actor: 'Sarah Jenkins',
      actorRole: 'Senior Manager',
      details: 'Assigned request to Marcus Vance (Workload: 2/5 active tickets)',
      severity: 'success'
    },
    {
      id: 'AUD-88217',
      timestamp: 'Today, 12:55:01',
      action: 'CALCULATION',
      entityId: 'REQ-9103',
      actor: 'Automated Scoring Engine',
      actorRole: 'System Daemon',
      details: 'Calculated complexity score 6.2/10 based on 45 inbound data points and moderate contract tier',
      severity: 'info'
    },
    {
      id: 'AUD-88216',
      timestamp: 'Today, 12:42:30',
      action: 'INGESTION',
      entityId: 'REQ-9100',
      actor: 'FinTech Webhook Gateway',
      actorRole: 'Third-Party Integration',
      details: 'Ingested raw payload from Core Banking API; HMAC-SHA256 signature verified successfully',
      severity: 'info'
    },
    {
      id: 'AUD-88215',
      timestamp: 'Today, 12:20:19',
      action: 'DISPATCH',
      entityId: 'TCK-4009',
      actor: 'Alex Rivera',
      actorRole: 'Traffic Operations Manager',
      details: 'Reassigned ticket TCK-4009 to Sophia Chen for immediate enterprise SLA intervention',
      severity: 'warning'
    }
  ]);
}
