import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  adminContact = {
    email: 'admin@teste-scolare.ro',
    phone: '+40 123 456 789'
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUserRoleName(): string {
    if (!this.currentUser) return '';
    
    switch (this.currentUser.role) {
      case 'admin':
        return 'Administrator';
      case 'parent':
        return 'Părinte';
      case 'child':
        return 'Elev';
      default:
        return '';
    }
  }

  getUserRoleIcon(): string {
    if (!this.currentUser) return '';
    
    switch (this.currentUser.role) {
      case 'admin':
        return 'bi-shield-check';
      case 'parent':
        return 'bi-person-check';
      case 'child':
        return 'bi-emoji-smile';
      default:
        return 'bi-person';
    }
  }

  getUserRoleColor(): string {
    if (!this.currentUser) return '';
    
    switch (this.currentUser.role) {
      case 'admin':
        return 'text-danger';
      case 'parent':
        return 'text-success';
      case 'child':
        return 'text-info';
      default:
        return '';
    }
  }
}
