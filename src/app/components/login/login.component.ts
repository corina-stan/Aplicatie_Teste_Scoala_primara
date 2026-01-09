import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // Redirecționează la dashboard dacă utilizatorul este deja autentificat
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Obține URL-ul de return din parametri
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    
    // Verifică dacă utilizatorul vine de la înregistrare
    if (this.route.snapshot.queryParams['registered'] === 'true') {
      this.error = ''; // Clear any errors
      // Mesajul de success va fi afișat în template
    }
  }

  // Getter pentru acces rapid la câmpurile formularului
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    // Oprește dacă formularul este invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (user) => {
        if (user) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.error = 'Email sau parolă incorectă';
          this.loading = false;
        }
      },
      error: () => {
        this.error = 'A apărut o eroare. Vă rugăm încercați din nou.';
        this.loading = false;
      }
    });
  }

  // Funcție pentru a completa rapid formularul pentru testare
  quickLogin(email: string, password: string): void {
    this.loginForm.patchValue({ email, password });
  }
}
