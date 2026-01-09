import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test, TestResult } from '../models/test.model';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Obține toate testele
  getAllTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}/tests`);
  }

  // Obține testele pentru o disciplină și clasă specifică
  getTestsByDisciplineAndGrade(discipline: string, grade: string): Observable<Test[]> {
    return this.http.get<Test[]>(
      `${this.apiUrl}/tests?discipline=${discipline}&grade=${grade}`
    );
  }

  // Obține un test după ID
  getTestById(id: string): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl}/tests/${id}`);
  }

  // Creează un test nou
  createTest(test: Test): Observable<Test> {
    return this.http.post<Test>(`${this.apiUrl}/tests`, test);
  }

  // Actualizează un test
  updateTest(id: string, test: Test): Observable<Test> {
    return this.http.put<Test>(`${this.apiUrl}/tests/${id}`, test);
  }

  // Șterge un test
  deleteTest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tests/${id}`);
  }

  // Salvează rezultatul unui test
  saveTestResult(result: TestResult): Observable<TestResult> {
    return this.http.post<TestResult>(`${this.apiUrl}/results`, result);
  }

  // Obține rezultatele unui utilizator
  getUserResults(userId: number): Observable<TestResult[]> {
    return this.http.get<TestResult[]>(`${this.apiUrl}/results?userId=${userId}`);
  }

  // Generează ID unic pentru test
  generateTestId(discipline: string, grade: string): string {
    const disciplineCode = discipline === 'Matematică' ? 'MAT' : 
                          discipline === 'Explorarea mediului' ? 'MEM' : 'CLR';
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `TEST-${disciplineCode}-${grade}-${timestamp}-${random}`;
  }
}
