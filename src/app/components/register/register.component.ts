import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  success = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Redirecționează la dashboard dacă utilizatorul este deja autentificat
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Getter pentru acces rapid la câmpurile formularului
  get f() { return this.registerForm.controls; }

  // Validator pentru confirmarea parolei
  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    // Oprește dacă formularul este invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    
    const newUser = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: this.registerForm.value.role
    };

    this.authService.register(newUser).subscribe({
      next: (user) => {
        if (user) {
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['/login'], { 
              queryParams: { registered: 'true' }
            });
          }, 2000);
        } else {
          this.error = 'Acest email este deja folosit';
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = 'A apărut o eroare. Vă rugăm încercați din nou.';
        this.loading = false;
      }
    });
  }

  getRoleIcon(role: string): string {
    switch (role) {
      case 'admin': return 'bi-shield-check';
      case 'parent': return 'bi-person-check';
      case 'child': return 'bi-emoji-smile';
      default: return 'bi-person';
    }
  }

  getRoleDescription(role: string): string {
    switch (role) {
      case 'admin': 
        return 'Acces complet - poate gestiona toate testele';
      case 'parent': 
        return 'Poate crea și edita propriile teste';
      case 'child': 
        return 'Poate rezolva testele disponibile';
      default: 
        return '';
    }
  }
}
