import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNotification } from '../../../core/models/notification.model';


@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-dropdown.html',
  styleUrl: './notification-dropdown.css'
})
export class NotificationDropdown implements OnInit {
  notifications: AppNotification[] = [
    {
      id: '1',
      title: 'Urgent Request Escalated',
      message: 'Request #REQ-9042 from Partner API exceeded Tier-1 SLA and has been escalated.',
      type: 'escalation',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      time: '15 mins ago',
      link: '/request'
    },
    {
      id: '2',
      title: 'Inbound Traffic Surge',
      message: 'Webhook gateway received 45 unassigned requests in the last 10 minutes.',
      type: 'traffic',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      time: '45 mins ago',
      link: '/request'
    },
    {
      id: '3',
      title: 'SLA Breach Warning',
      message: 'Ticket #TCK-3382 has 12 minutes remaining before priority breach.',
      type: 'sla',
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      time: '2 hours ago',
      link: '/tickets'
    }
  ];

  visibleLimit = 3;

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  get visibleNotifications(): AppNotification[] {
    return this.notifications.slice(0, this.visibleLimit);
  }

  ngOnInit(): void { }

  markAllAsRead(event: Event): void {
    event.preventDefault();
    this.notifications.forEach(n => n.read = true);
  }

  markAsRead(event: Event, id?: string): void {
    event.preventDefault();
    if (!id) return;
    const notif = this.notifications.find(n => n.id === id);
    if (notif) notif.read = true;
  }

  clearAll(event: Event): void {
    event.preventDefault();
    this.notifications = [];
  }

  viewMore(event: Event): void {
    event.preventDefault();
    this.visibleLimit = this.notifications.length;
  }

  viewLess(event: Event): void {
    event.preventDefault();
    this.visibleLimit = 3;
  }
}
