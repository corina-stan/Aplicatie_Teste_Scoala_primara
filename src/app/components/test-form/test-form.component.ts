import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../services/test.service';
import { AuthService } from '../../services/auth.service';
import { Test, Question } from '../../models/test.model';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {
  testForm!: FormGroup;
  isEditMode = false;
  testId = '';
  loading = false;
  submitted = false;

  disciplines = ['Matematică', 'Explorarea mediului', 'Comunicare în limba română'];
  grades = ['I', 'II', 'III', 'IV'];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Verifică dacă este mod editare
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.testId = params['id'];
        this.loadTest();
      } else {
        // Pre-populează cu parametrii din query
        this.route.queryParams.subscribe(queryParams => {
          if (queryParams['discipline']) {
            this.testForm.patchValue({ discipline: queryParams['discipline'] });
          }
          if (queryParams['grade']) {
            this.testForm.patchValue({ grade: queryParams['grade'] });
          }
        });
        // Adaugă o întrebare goală inițial
        this.addQuestion();
      }
    });
  }

  initForm(): void {
    this.testForm = this.formBuilder.group({
      title: ['', Validators.required],
      discipline: ['', Validators.required],
      grade: ['', Validators.required],
      questions: this.formBuilder.array([])
    });
  }

  get questions(): FormArray {
    return this.testForm.get('questions') as FormArray;
  }

  getQuestionFormGroup(index: number): FormGroup {
    return this.questions.at(index) as FormGroup;
  }

  getOptionsArray(questionIndex: number): FormArray {
    return this.getQuestionFormGroup(questionIndex).get('options') as FormArray;
  }

  createQuestion(question?: Question): FormGroup {
    return this.formBuilder.group({
      question: [question?.question || '', Validators.required],
      options: this.formBuilder.array([
        [question?.options[0] || '', Validators.required],
        [question?.options[1] || '', Validators.required],
        [question?.options[2] || '', Validators.required],
        [question?.options[3] || '', Validators.required]
      ]),
      correctAnswer: [question?.correctAnswer ?? '', [Validators.required, Validators.min(0), Validators.max(3)]]
    });
  }

  addQuestion(): void {
    this.questions.push(this.createQuestion());
  }

  removeQuestion(index: number): void {
    if (this.questions.length > 1) {
      this.questions.removeAt(index);
    } else {
      alert('Testul trebuie să aibă cel puțin o întrebare!');
    }
  }

  loadTest(): void {
    this.testService.getTestById(this.testId).subscribe({
      next: (test) => {
        // Verifică permisiunile
        if (!this.canEditTest(test)) {
          alert('Nu aveți permisiunea de a edita acest test!');
          this.router.navigate(['/dashboard']);
          return;
        }

        // Populează formularul
        this.testForm.patchValue({
          title: test.title,
          discipline: test.discipline,
          grade: test.grade
        });

        // Adaugă întrebările
        test.questions.forEach(q => {
          this.questions.push(this.createQuestion(q));
        });
      },
      error: (error) => {
        console.error('Eroare la încărcarea testului:', error);
        alert('Nu s-a putut încărca testul!');
        this.router.navigate(['/dashboard']);
      }
    });
  }

  canEditTest(test: Test): boolean {
    const user = this.authService.currentUserValue;
    if (!user) return false;
    
    if (user.role === 'admin') return true;
    if (user.role === 'parent' && test.createdBy === user.id) return true;
    
    return false;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.testForm.invalid) {
      alert('Vă rugăm să completați toate câmpurile obligatorii!');
      return;
    }

    if (this.questions.length === 0) {
      alert('Testul trebuie să aibă cel puțin o întrebare!');
      return;
    }

    this.loading = true;
    const user = this.authService.currentUserValue!;

    const testData: Test = {
      id: this.isEditMode ? this.testId : this.testService.generateTestId(
        this.testForm.value.discipline,
        this.testForm.value.grade
      ),
      title: this.testForm.value.title,
      discipline: this.testForm.value.discipline,
      grade: this.testForm.value.grade,
      createdBy: user.id,
      createdByName: user.name,
      createdAt: this.isEditMode ? this.testForm.value.createdAt : new Date().toISOString(),
      questions: this.questions.value.map((q: any, index: number) => ({
        id: index + 1,
        question: q.question,
        options: q.options,
        correctAnswer: parseInt(q.correctAnswer)
      }))
    };

    const operation = this.isEditMode
      ? this.testService.updateTest(this.testId, testData)
      : this.testService.createTest(testData);

    operation.subscribe({
      next: () => {
        alert(this.isEditMode ? 'Testul a fost actualizat cu succes!' : 'Testul a fost creat cu succes!');
        this.router.navigate(['/tests', testData.discipline, testData.grade]);
      },
      error: (error) => {
        console.error('Eroare la salvarea testului:', error);
        alert('A apărut o eroare la salvarea testului!');
        this.loading = false;
      }
    });
  }

  cancel(): void {
    if (confirm('Sigur dorești să anulezi? Modificările nesalvate vor fi pierdute.')) {
      this.router.navigate(['/dashboard']);
    }
  }
}
