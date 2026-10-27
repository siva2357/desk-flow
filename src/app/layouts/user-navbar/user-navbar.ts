import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NotificationDropdown } from '../../library/shared/notification-dropdown/notification-dropdown';
import { ProfileAvatar } from '../../library/shared/profile-avatar/profile-avatar';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [
    RouterModule,
    ProfileAvatar,
    NotificationDropdown
  ],
  templateUrl: './user-navbar.html',
  styleUrl: './user-navbar.css'
})
export class UserNavbar {

  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private router: Router) { }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}