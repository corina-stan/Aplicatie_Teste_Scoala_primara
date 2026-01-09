import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../services/test.service';
import { AuthService } from '../../services/auth.service';
import { Test, TestResult } from '../../models/test.model';

@Component({
  selector: 'app-test-solve',
  templateUrl: './test-solve.component.html',
  styleUrls: ['./test-solve.component.css']
})
export class TestSolveComponent implements OnInit {
  test: Test | null = null;
  loading = true;
  testStarted = false;
  testCompleted = false;
  currentQuestionIndex = 0;
  answers: number[] = [];
  score = 0;
  startTime: Date | null = null;
  endTime: Date | null = null;
  
  // Expune String pentru utilizare în template
  String = String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const testId = params['id'];
      this.loadTest(testId);
    });
  }

  loadTest(testId: string): void {
    this.testService.getTestById(testId).subscribe({
      next: (test) => {
        this.test = test;
        this.answers = new Array(test.questions.length).fill(-1);
        this.loading = false;
      },
      error: (error) => {
        console.error('Eroare la încărcarea testului:', error);
        alert('Nu s-a putut încărca testul!');
        this.router.navigate(['/dashboard']);
      }
    });
  }

  startTest(): void {
    this.testStarted = true;
    this.startTime = new Date();
  }

  selectAnswer(answerIndex: number): void {
    this.answers[this.currentQuestionIndex] = answerIndex;
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.test!.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }

  canSubmit(): boolean {
    return this.answers.every(answer => answer !== -1);
  }

  submitTest(): void {
    if (!this.canSubmit()) {
      alert('Trebuie să răspunzi la toate întrebările înainte de a trimite testul!');
      return;
    }

    if (!confirm('Sigur dorești să trimiți testul? Nu vei mai putea modifica răspunsurile.')) {
      return;
    }

    this.endTime = new Date();
    this.calculateScore();
    this.saveResult();
    this.testCompleted = true;
  }

  calculateScore(): void {
    this.score = this.answers.reduce((total, answer, index) => {
      return total + (answer === this.test!.questions[index].correctAnswer ? 1 : 0);
    }, 0);
  }

  saveResult(): void {
    const user = this.authService.currentUserValue!;
    const result: TestResult = {
      testId: this.test!.id,
      testTitle: this.test!.title,
      userId: user.id,
      userName: user.name,
      score: this.score,
      totalQuestions: this.test!.questions.length,
      answers: this.answers,
      completedAt: this.endTime!.toISOString()
    };

    this.testService.saveTestResult(result).subscribe({
      next: () => {
        console.log('Rezultat salvat cu succes');
      },
      error: (error) => {
        console.error('Eroare la salvarea rezultatului:', error);
      }
    });
  }

  getScorePercentage(): number {
    return Math.round((this.score / this.test!.questions.length) * 100);
  }

  getScoreClass(): string {
    const percentage = this.getScorePercentage();
    if (percentage >= 90) return 'excellent';
    if (percentage >= 70) return 'good';
    if (percentage >= 50) return 'average';
    return 'poor';
  }

  getScoreMessage(): string {
    const percentage = this.getScorePercentage();
    if (percentage >= 90) return 'Excelent! 🎉';
    if (percentage >= 70) return 'Foarte bine! 👍';
    if (percentage >= 50) return 'Bine! 😊';
    return 'Mai exersează! 💪';
  }

  isAnswerCorrect(questionIndex: number, answerIndex: number): boolean {
    return answerIndex === this.test!.questions[questionIndex].correctAnswer;
  }

  retakeTest(): void {
    this.testStarted = false;
    this.testCompleted = false;
    this.currentQuestionIndex = 0;
    this.answers = new Array(this.test!.questions.length).fill(-1);
    this.score = 0;
    this.startTime = null;
    this.endTime = null;
  }

  backToList(): void {
    this.router.navigate(['/tests', this.test!.discipline, this.test!.grade]);
  }

  backToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  getProgressPercentage(): number {
    const answered = this.answers.filter(a => a !== -1).length;
    return Math.round((answered / this.test!.questions.length) * 100);
  }
}
