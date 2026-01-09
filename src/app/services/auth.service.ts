import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { User, LoginRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginRequest): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${credentials.email}`).pipe(
      map(users => {
        if (users.length > 0 && users[0].password === credentials.password) {
          const user = users[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }
        return null;
      }),
      catchError(() => of(null))
    );
  }

  register(userData: { name: string; email: string; password: string; role: string }): Observable<User | null> {
    // Verifică dacă email-ul există deja
    return this.http.get<User[]>(`${this.apiUrl}?email=${userData.email}`).pipe(
      switchMap(existingUsers => {
        if (existingUsers.length > 0) {
          // Email-ul există deja
          return of(null);
        }
        
        // Găsește ID-ul maxim
        return this.http.get<User[]>(this.apiUrl).pipe(
          switchMap(allUsers => {
            const maxId = allUsers.length > 0 
              ? Math.max(...allUsers.map(u => u.id)) 
              : 0;
            
            const newUser: User = {
              id: maxId + 1,
              email: userData.email,
              password: userData.password,
              name: userData.name,
              role: userData.role as 'admin' | 'parent' | 'child'
            };
            
            return this.http.post<User>(this.apiUrl, newUser);
          })
        );
      }),
      catchError(() => of(null))
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  hasRole(roles: string[]): boolean {
    const user = this.currentUserValue;
    return user ? roles.includes(user.role) : false;
  }

  isAdmin(): boolean {
    return this.hasRole(['admin']);
  }

  isParent(): boolean {
    return this.hasRole(['parent']);
  }

  isChild(): boolean {
    return this.hasRole(['child']);
  }
}
