import { Component } from '@angular/core';
import { UserNavbar } from '../../layouts/user-navbar/user-navbar';
import { Sidebar } from '../../layouts/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [UserNavbar, Sidebar, RouterOutlet],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee {}
