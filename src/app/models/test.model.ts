export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Test {
  id: string;
  title: string;
  discipline: 'Matematică' | 'Explorarea mediului' | 'Comunicare în limba română';
  grade: 'I' | 'II' | 'III' | 'IV';
  createdBy: number;
  createdByName: string;
  createdAt: string;
  questions: Question[];
}

export interface TestResult {
  id?: number;
  testId: string;
  testTitle: string;
  userId: number;
  userName: string;
  score: number;
  totalQuestions: number;
  answers: number[];
  completedAt: string;
}
