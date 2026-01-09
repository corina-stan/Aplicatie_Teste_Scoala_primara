import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../services/test.service';
import { AuthService } from '../../services/auth.service';
import { Test } from '../../models/test.model';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  tests: Test[] = [];
  filteredTests: Test[] = [];
  discipline = '';
  grade = '';
  loading = true;
  searchQuery = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.discipline = params['discipline'];
      this.grade = params['grade'];
      this.loadTests();
    });
  }

  loadTests(): void {
    this.loading = true;
    this.testService.getTestsByDisciplineAndGrade(this.discipline, this.grade).subscribe({
      next: (tests) => {
        this.tests = tests;
        this.filteredTests = tests;
        this.loading = false;
      },
      error: (error) => {
        console.error('Eroare la încărcarea testelor:', error);
        this.loading = false;
      }
    });
  }

  filterTests(): void {
    if (!this.searchQuery.trim()) {
      this.filteredTests = this.tests;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredTests = this.tests.filter(test =>
      test.title.toLowerCase().includes(query) ||
      test.id.toLowerCase().includes(query) ||
      test.createdByName.toLowerCase().includes(query)
    );
  }

  viewTest(testId: string): void {
    this.router.navigate(['/test', testId]);
  }

  editTest(testId: string): void {
    this.router.navigate(['/test/edit', testId]);
  }

  deleteTest(test: Test): void {
    if (!confirm(`Sigur dorești să ștergi testul "${test.title}"?`)) {
      return;
    }

    this.testService.deleteTest(test.id).subscribe({
      next: () => {
        this.loadTests();
        alert('Testul a fost șters cu succes!');
      },
      error: (error) => {
        console.error('Eroare la ștergerea testului:', error);
        alert('A apărut o eroare la ștergerea testului.');
      }
    });
  }

  canEdit(test: Test): boolean {
    const user = this.authService.currentUserValue;
    if (!user) return false;
    
    // Admin poate edita orice test
    if (user.role === 'admin') return true;
    
    // Părintele poate edita doar testele create de el
    if (user.role === 'parent' && test.createdBy === user.id) return true;
    
    return false;
  }

  canDelete(test: Test): boolean {
    return this.canEdit(test);
  }

  canCreateTest(): boolean {
    return this.authService.hasRole(['admin', 'parent']);
  }

  createNewTest(): void {
    this.router.navigate(['/test/new'], {
      queryParams: {
        discipline: this.discipline,
        grade: this.grade
      }
    });
  }

  getDisciplineIcon(): string {
    switch (this.discipline) {
      case 'Matematică':
        return 'bi-calculator';
      case 'Comunicare în limba română':
        return 'bi-chat-left-text';
      case 'Explorarea mediului':
        return 'bi-globe';
      default:
        return 'bi-book';
    }
  }

  getDisciplineColor(): string {
    switch (this.discipline) {
      case 'Matematică':
        return 'primary';
      case 'Comunicare în limba română':
        return 'success';
      case 'Explorarea mediului':
        return 'info';
      default:
        return 'secondary';
    }
  }
}
