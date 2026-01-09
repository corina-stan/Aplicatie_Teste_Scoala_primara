import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TestService } from '../../services/test.service';
import { User } from '../../models/user.model';
import { Test } from '../../models/test.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  recentTests: Test[] = [];
  totalTests = 0;
  loading = true;

  disciplines = [
    {
      name: 'Matematică',
      icon: 'bi-calculator',
      color: 'primary',
      description: 'Operații matematice, probleme și exerciții'
    },
    {
      name: 'Comunicare în limba română',
      icon: 'bi-chat-left-text',
      color: 'success',
      description: 'Vocabular, gramatică și comprehensiune'
    },
    {
      name: 'Explorarea mediului',
      icon: 'bi-globe',
      color: 'info',
      description: 'Natură, societate și fenomene'
    }
  ];

  grades = [
    { name: 'I', icon: 'bi-1-circle' },
    { name: 'II', icon: 'bi-2-circle' },
    { name: 'III', icon: 'bi-3-circle' },
    { name: 'IV', icon: 'bi-4-circle' }
  ];

  constructor(
    private authService: AuthService,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.testService.getAllTests().subscribe({
      next: (tests) => {
        this.totalTests = tests.length;
        // Afișează ultimele 5 teste adăugate
        this.recentTests = tests
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        this.loading = false;
      },
      error: (error) => {
        console.error('Eroare la încărcarea testelor:', error);
        this.loading = false;
      }
    });
  }

  navigateToDiscipline(discipline: string, grade: string): void {
    this.router.navigate(['/tests', discipline, grade]);
  }

  navigateToTest(testId: string): void {
    this.router.navigate(['/test', testId]);
  }

  canManageTests(): boolean {
    return this.authService.hasRole(['admin', 'parent']);
  }

  createNewTest(): void {
    this.router.navigate(['/test/new']);
  }

  getUserGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bună dimineața';
    if (hour < 18) return 'Bună ziua';
    return 'Bună seara';
  }
}
